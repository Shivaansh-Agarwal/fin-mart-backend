const mongoose = require("mongoose");
const { Schema } = mongoose;

//https://stackoverflow.com/questions/14588032/mongoose-password-hashing

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [4, "Username should be atleast 4 characters long"],
      maxlength: [16, "Username should not be more than 16 characters long"],
      required: [true, "Username is required to create an account."]
    },
    email: {
      type: String,
      required: [true, "Email is required to create an account"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required to create an account"],
    },
    cart: {
      quantity: Number,
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", userSchema);

async function initializeFirstUser() {
  try {
    const NewUser = new User({
      username: "Shivaansh Agarwal",
      email: "test@abcd.com",
      password: "dnkne2F$2r2@jbj0L",
    });
    const savedUser = await NewUser.save();
    console.log(savedUser);
  } catch (err) {
    console.log("Error occured while creating user : ", err);
  }
}

module.exports = { User, initializeFirstUser };