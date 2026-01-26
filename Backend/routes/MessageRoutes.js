import express from "express";
import {
  sendMessages,
  getAllMessages,
  deleteMessage,
  getMessagesByName,
  getMessagesByNameAndDate
} from "../controllers/MessageController.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessages);
router.get("/get/:id", secureRoute, getAllMessages);
router.delete("/:messageId", secureRoute, deleteMessage);
router.get("/:name", secureRoute, getMessagesByName);
router.get("/:getByname&date", getMessagesByNameAndDate)

export default router;
