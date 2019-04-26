const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: true
  },
  name: String,
  avatar: String,
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      text: {
        type: String,
        required: true
      },
      name: String,
      avatar: String,
      likes: {
        type: Number,
        default: 0
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    }
  ]
});

const validatePost = post => {
  const schema = {
    user: Joi.objectId().required(),
    text: Joi.string().required(),
    name: Joi.string().required(),
    avatar: Joi.string(),
    comments: Joi.array().items(
      Joi.object({
        user: Joi.objectId().required(),
        text: Joi.string().required(),
        name: Joi.string().required(),
        avatar: Joi.string(),
        likes: Joi.number()
      })
    ),
    likes: Joi.array().items(
      Joi.object({
        user: Joi.objectId().required(),
        number: Joi.number()
      })
    )
  };
  return Joi.validate(post, schema);
};

const validateComment = comment => {
  const schema = {
    user: Joi.objectId().required(),
    text: Joi.string().required(),
    name: Joi.string().required(),
    avatar: Joi.string(),
    likes: Joi.number()
  };
  return Joi.validate(comment, schema);
};

const Post = mongoose.model("Post", postSchema);

module.exports.validate = validatePost;
module.exports.validateComment = validateComment;
module.exports.Post = Post;
