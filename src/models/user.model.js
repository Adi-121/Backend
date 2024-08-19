import mongoose, { Schema } from "mongoose";
//for jsonweb token
import jwt from "jsonwebtoken";
// this is to encrypt our password
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // for better searching (but if used a lot it makes application slow) helps in aggregation query for whuch we will install 
    },

    email: {
      type: email,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String,  // cloudinary url
      required: true,
    },

    coverImage: {
      type: String,
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],

    password: {
      type: String, // this will not be stored as a plain text it will be modified
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    }

  },
  {
    timestamps: true,
  }
)

// how to encrypt the password => using bcrypt 
// but main question is when => encrytion will be done before saving the data, so we will use "pre" middleware that is used to perform some fn before given query is performed and in our case it is during  

userSchema.pre("save", async function (next) {
  // here we have used on save we will run this middleware, but suppose if someone comes and changes avatar this will run too, thus to save it we will only run it when the password is modified else not
  // but how to know if it is modified...we have a function for it
  if (this.isModified("password") == false) return next();


  this.password = bcrypt.hash(this.password, 10);
  next();
})


// how to know if the password entered by the user is correct??? we compare but how??
//In Mongoose, methods allow you to add functionality to your schema that can be used by any document created from that schema...so
// we create a method specific to this userSchema

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

// the following function generates Access token
userSchema.methods.generateAccessToken = function(){
  // it take payload,secret key, other options (hover to see)
  jwt.sign(
    {
      _id : this._is,
      email : this.email,
      username : this.username,
      fullName : this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

// refresh token generation, access token has more information than a refresh token in a payload
userSchema.methods.generateRefreshToken = function(){
  jwt.sign(
    {
      _id : this._is,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}
export const User = mongoose.model("User", userSchema);