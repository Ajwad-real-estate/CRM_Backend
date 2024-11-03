const transactionSchema = new mongoose.Schema({
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },  
    price: Number,
    commissionRate: Number,
    salesAmount: Number,
    commissionAmount: Number,
    paidStatusForClient: { type: Boolean, default: false },
    salesAgentId: { type: mongoose.Schema.Types.ObjectId, ref: "SalesAgent" }
  });
  
  module.exports = mongoose.model("Transaction", transactionSchema);
  