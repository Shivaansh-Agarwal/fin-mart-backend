const {Schema, model} = require("mongoose");

const campaignSchema = new Schema({
  name: {
    type: String,
    required: [true, "Campaing should have a name"]
  },
  offer: {
    type: String,
    required: [true, "Campaign should have an offer"]
  },
  description: {
    type: String,
    required: [true, "Campaign description is mandatory"]
  },
  imgURL: {
    type: String,
    required: [true, "Image URL is mandatory"]
  },
  category: [String],
},{ 
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});

const Campaign = model("Campaign", campaignSchema);

module.exports = {Campaign};