import Conversation from "../models/Conversation.js";
import Message from "../models/MessageModal.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

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

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id; // currently logged in user

    // Find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ✅ Removed sender check
    // Agar aap chaho ke sirf admin delete kar sake, yahan check kar sakte ho:
    // if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });

    // Remove the message from Conversation
    await Conversation.updateOne(
      { messages: messageId },
      { $pull: { messages: messageId } }
    );

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    // Realtime: Notify receiver that the message was deleted
    if (message.receiver) {
      const receiverSocketId = getReceiverSocketId(message.receiver.toString());
      if (receiverSocketId && io) {
        io.to(receiverSocketId).emit("messageDeleted", { messageId });
      }
    }

    return res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("deleteMessage error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
