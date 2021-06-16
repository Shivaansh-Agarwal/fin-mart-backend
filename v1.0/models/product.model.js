const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product should have a name."],
    },
    description: {
      type: String,
      required: [true, "Product should have a description."]
    },
    images: {
      type: [String],
      required: [true, "Product should have a display image."]
    },
    inStock: {
      type: Boolean,
      required: [true, "Product should have a stock value"]
    },
    categories: [String],
    overview: {
      type: [String],
      required: true
    },
    aboutAuthor: {
      type: [String],
      required: true
    },
    price: {
      originalPrice: {
        type: Number,
        required: [true, "Product should have original price."]
      },
      discountedPrice: {
        type: Number,
        required: [true, "Product should have a discounted price."]
      },
      discount: {
        type: Number,
        default: 0,
      },
      discountPercentage: {
        type: String,
        default: ""
      }
    },
    additionalDetails: {
      author: {
        type: String,
        required: [true, "Book should have an author name"]
      },
      publisher: String,
      language: String,
      pages: String,
      isbn10: String,
      isbn13: String,
      weight: String,
      dimensions: String,
      countryOfOrigin: String,
    },
    links:{
      type: Map,
      of: String
    },
    ratings: {
      avgRatings: Number,
      totalRatings: Number,
    },
    badge: {
      tagName: {
        type: String,
        uppercase: true
      },
      showBadge: {
        type: Boolean,
        default: false
      },
    },
    metaData: Schema.Types.Mixed,
  }, { 
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };