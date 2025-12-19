import Conversation from "../models/Conversation.js";
import Message from "../models/MessageModal.js";
import { getReceiverSocketId } from "../SocketIO/server.js"

// export const sendMessages = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const receiverId = req.params.id; // ✅ URL se
//     const senderId = req.user._id;

//     // ✅ Validation
//     if (!receiverId) {
//       return res.status(400).json({ message: "Receiver ID is required" });
//     }

//     if (senderId.toString() === receiverId.toString()) {
//       return res.status(400).json({
//         message: "Sender and receiver cannot be the same",
//       });
//     }

//     if (!message || !message.trim()) {
//       return res.status(400).json({ message: "Message is required" });
//     }

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//         messages: [],
//       });
//     }

//     const newMessage = await Message.create({
//       sender: senderId,
//       receiver: receiverId,
//       message: message.trim(),
//     });

//     conversation.messages.push(newMessage._id);
//     await conversation.save();
//     http://localhost:4001/
//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: newMessage,
//     });
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if(receiverSocketId){
//       io.to(receiverSocketId).emit("message", newMessage)
//     }
//     console.error("Error in sendMessages:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const sendMessages = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message: message.trim(),
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // ✅ SEND API RESPONSE FIRST (ONCE)
    res.status(201).json({
      success: true,
      data: newMessage,
    });

    // ✅ REALTIME (response ke baad bhi allowed)
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("receiverSocketId:", receiverSocketId);

    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

  } catch (error) {
    console.error("sendMessages error:", error);

    // ⚠️ response already sent ho chuki ho to dobara mat bhejo
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { id: chatuser } = req.params;

    // 🔴 safety check
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatuser] },
    }).populate({
      path: "messages",
      populate: [
        {
          path: "sender",
          select: "_id name email",
        },
        {
          path: "receiver",
          select: "_id name email",
        },
      ],
    });

    console.log("Conversation found:", conversation ? "Yes" : "No");
    if (conversation) {
      // console.log("Messages count in conversation:", conversation.messages?.length || 0);
      if (conversation.messages && conversation.messages.length > 0) {
        console.log("First message:", {
          id: conversation.messages[0]._id,
          sender:
            conversation.messages[0].sender?._id ||
            conversation.messages[0].sender,
          receiver:
            conversation.messages[0].receiver?._id ||
            conversation.messages[0].receiver,
          message: conversation.messages[0].message,
        });
      }
    }

    if (!conversation) {
      return res.status(404).json({ message: "No Messages Found" });
    }

    const sortedMessages = conversation.messages.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.createdAt);
      const dateB = new Date(b.createdAt || b.createdAt);
      return dateA - dateB;
    });

    res.status(200).json({ messages: sortedMessages });
  } catch (error) {
    console.log("Message getting error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
