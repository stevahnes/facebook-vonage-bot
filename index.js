require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const nedb = require("nedb");
const Vonage = require("@vonage/server-sdk");
const moment = require("moment");

// tell application to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialise nedb
const msgDB = new nedb({ filename: "messages.db", autoload: true });

// initialise vonage
const vonage = new Vonage(
  {
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET,
    applicationId: process.env.VONAGE_FACEBOOK_ID,
    privateKey: "./private.key",
  },
  { apiHost: "https://messages-sandbox.nexmo.com" }
);

function sendMessage(sender, recipient, text) {
  const to = { type: "messenger", id: recipient };
  const from = { type: "messenger", id: sender };
  const message = { content: { type: "text", text: text } };

  vonage.channel.send(to, from, message, function (error, success) {
    if (error) {
      console.error(error);
    }
    console.log("sendSuccess :>> ", success);
  });
}

// setup inbound and status endpoints
app.post("/inbound", function (request, response) {
  if (request.body.message.content.text.toLowerCase().trim() === "recap") {
    // get all messages in DB and reply to user
    msgDB.find({ "from.id": request.body.from.id }, function (error, records) {
      if (error) {
        console.error(error);
      }
      const messages = records
        .map(
          (record) =>
            `${moment(record.timestamp).format("DDMMMYY HH:mm:ss")}: ${
              record.message.content.text
            }`
        )
        .join("\n\n");
      sendMessage(request.body.to.id, request.body.from.id, messages);
    });
  } else {
    msgDB.insert(request.body, function (error, record) {
      if (error) {
        sendMessage(
          request.body.to.id,
          request.body.from.id,
          "Something went wrong. Please try again later."
        );
        return console.error(error);
      }
      sendMessage(
        record.to.id,
        record.from.id,
        `Message "${record.message.content.text}" received. Thank you!`
      );
    });
  }
  response.send("ok");
});

app.post("/status", function (request, response) {
  console.log("status :>> ", request.body);
  response.send("ok");
});

// port number should match ngrok's
app.listen(3000);
