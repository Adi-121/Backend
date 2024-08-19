import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 

const videoSchema = new Schema(
  {
    videoFile : {
      type : String, // cloudinary url
      required : true,
    },

    thumbnail : {
      type : String, // coudinary url
      required : true,
    },

    title : {
      type : String,
      required : true,
    },

    description : {
      type : String,
      required : true,
    },

    duration : {
      type : Number, // this also will be brought from cloudinary as once video is uploaded clodinary gives you file information that contains info like video url, duration, size, format, dimension, etc
      required : true,
    },

    views : {
      type : Number,
      default : 0,
    },

    isPublished : {
      type : Boolean,
      default : true,
    },

    owner : {
      type : Schema.Types.ObjectId,
      ref : "User",
      required:true,
    },
  },
  {
    timestamps : true,
  }
)

// below line will help us to write aggregation queries
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);