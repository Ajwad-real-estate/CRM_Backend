const placeSchema = new mongoose.Schema({
    location: String,
  });
  
  module.exports = mongoose.model("Place", placeSchema);
