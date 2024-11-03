const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nationalID: { type: String, required: true, unique: true },
  areMarried: { type: Boolean, default: false },
  hasChildren: { type: Boolean, default: false },
  stage: {
    type: String,
    enum: ["new", "interested", "follow-up", "closed"],
  },
  interestedInProjects: [String],
  ticket: String,
  addressCurrentHome: String,
  addressNowHome: String,
  comment: String,
  positionWork: String,
  companyWork: String,
  fieldWork: String,
  salesAgent: { type: mongoose.Schema.Types.ObjectId, ref: "SalesAgent" }, // Reference to SalesAgent
  phoneNumbers: [
    {
      phoneNumber: String,
      countryIdentifier: String,
      _id: false,
    },
  ], // Reference to PhoneNumbers
  interestedInLocations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  ], // Reference to Places
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }], // Reference to Transactions
});

module.exports = mongoose.model("Client", clientSchema);
