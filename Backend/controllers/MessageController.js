import Conversation from "../models/Conversation.js";
import Message from "../models/MessageModal.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";
import User from "../models/User.js";

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

    res.status(201).json({
      success: true,
      data: newMessage,
    });

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

    await Conversation.updateOne(
      { messages: messageId },
      { $pull: { messages: messageId } },
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

    return res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("deleteMessage error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getMessagesByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Find user by name
    const user = await User.findOne({ name: name.trim() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const senderId = req.user._id; // currently logged-in user
    const receiverId = user._id;

    // Find conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: [
        { path: "sender", select: "_id name email" },
        { path: "receiver", select: "_id name email" },
      ],
    });

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "No messages found with this user" });
    }

    // Sort messages by createdAt
    const sortedMessages = conversation.messages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    res.status(200).json({ messages: sortedMessages });
  } catch (error) {
    console.error("getMessagesByName error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByNameAndDate = async (req, res) => {
  try {
    const { name } = req.params;
    const { date } = req.query; // Expecting a date string in YYYY-MM-DD format

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!date || !Date.parse(date)) {
      return res.status(400).json({ message: "Valid date is required" });
    }

    // Find user by name
    const user = await User.findOne({ name: name.trim() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const senderId = req.user._id;
    const receiverId = user._id;

    // Find conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: [
        { path: "sender", select: "_id name email" },
        { path: "receiver", select: "_id name email" },
      ],
    });

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "No messages found with this user" });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Filter messages by date
    const filteredMessages = conversation.messages.filter((msg) => {
      const msgDate = new Date(msg.createdAt);
      return msgDate >= startDate && msgDate <= endDate;
    });

    if (!filteredMessages.length) {
      return res
        .status(404)
        .json({ message: "No messages found on this date" });
    }

    // Sort messages by createdAt
    const sortedMessages = filteredMessages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    res.status(200).json({ messages: sortedMessages });
  } catch (error) {
    console.error("getMessagesByNameAndDate error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
