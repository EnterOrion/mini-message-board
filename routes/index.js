var express = require("express");
var router = express.Router();
const message_controller = require("../controllers/messageController");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", message_controller.messageList);

router.get("/new", message_controller.messageCreateGet);

router.post("/new", message_controller.messageCreatePost);

module.exports = router;
