const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    createdTime: {
      type: Date,
      default: new Date(),
    },
    category: String,
    labels: [],
    price: Number,
    owner: {
      name: String,
      phoneNumber: String,
      createdTime: {
        type: Date,
        default: new Date(),
      },
      lastActivity: Date,
      email: String,
    },
    comments: [],
    location: {
      address: String,
      geo: {
        lat: Number,
        lng: Number,
      },
    },
    display: Number,
  },
  { timestamp: true }
);

module.exports = mongoose.model("Advertisment", schema);
