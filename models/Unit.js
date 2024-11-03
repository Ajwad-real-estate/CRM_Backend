const unitSchema = new mongoose.Schema({
    name: String,
    placeOfUse: String,
    price: Number,
    commissionRate: Number,
    typeOfUnit: {
      type: String,
      enum: ["Resale", "New"],
    },
  });
  
  module.exports = mongoose.model("Unit", unitSchema);
  