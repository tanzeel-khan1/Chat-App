import express from "express";
import {
  sendMessages,
  getAllMessages,
  deleteMessage,
} from "../controllers/MessageController.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessages);
router.get("/get/:id", secureRoute, getAllMessages);
router.delete("/:messageId", secureRoute, deleteMessage);

export default router;
