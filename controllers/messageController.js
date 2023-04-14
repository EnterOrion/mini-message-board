const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

// Display list of all the messages.
exports.messageList = function (req, res, next) {
  Message.find()
    .sort([["date", "descending"]])
    .limit(5)
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render("index", { title: "Messages", messages: list_messages });
    });
};

// Display message create form on GET.
exports.messageCreateGet = (req, res, next) => {
  res.render("form", { title: "Enter your message below" });
};

// Handle message create on POST.
exports.messageCreatePost = [
  // Validate and sanitize the name field.
  body("message", "Message body required").trim().isLength({ min: 1 }).escape(),
  body("user", "User required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a new message object with escaped and trimmed data.
    const message = new Message({
      message: req.body.message,
      user: req.body.user,
      date: req.body.date,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("form", {
        title: "Enter your message below",
        message,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      message.save((err) => {
        if (err) {
          return next(err);
        }
        // Message saved. Redirect to home page.
        res.redirect("/");
      });
    }
  },
];
