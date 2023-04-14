var express = require("express");
var router = express.Router();
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", message_controller.messageList);

router.get("/new", message_controller.messageCreateGet);

router.post("/new", message_controller.messageCreatePost);

module.exports = router;
