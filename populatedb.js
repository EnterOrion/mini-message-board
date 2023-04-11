#! /usr/bin/env node

console.log(
  'This script populates test messages with specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const Message = require("./models/message");

const messages = [];
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function messageCreate(message, user) {
  messageDetail = {
    message: message,
    user: user,
    date: new Date(),
  };
  const newMessage = new Message(messageDetail);
  await newMessage.save();
  messages.push(newMessage);
  console.log(`Added message: ${newMessage}`);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate("Hi there!", "Amando"),
    messageCreate("Hello World!", "Charles"),
  ]);
}
