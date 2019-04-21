const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  handle: {
    type: String,
    required: true,
    maxlength: 40
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: String,
  githubUsername: String,
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: String,
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model("Profile", profileSchema);

const validateProfile = profile => {
  const schema = {
    user: Joi.objectId().required(),
    handle: Joi.string().required(),
    company: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
    status: Joi.string().required(),
    skills: Joi.array()
      .items(Joi.string().required())
      .required(),
    bio: Joi.string(),
    githubUsername: Joi.string(),
    experience: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        company: Joi.string().required(),
        location: Joi.string(),
        from: Joi.date().required(),
        to: Joi.date(),
        current: Joi.boolean(),
        description: Joi.string()
      })
    ),
    education: [
      {
        school: Joi.string().required(),
        degree: Joi.string().required(),
        fieldOfStudy: Joi.string().required(),
        from: Joi.date().required(),
        to: Joi.date(),
        current: Joi.boolean(),
        description: Joi.string()
      }
    ],
    social: {
      youtube: Joi.string(),
      twitter: Joi.string(),
      facebook: Joi.string(),
      linkedin: Joi.string(),
      instagram: Joi.string()
    },
    date: Joi.date()
  };
  return Joi.validate(profile, schema, { abortEarly: false });
};

const validateExperience = experience => {
  const schema = {
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string()
  };
  return Joi.validate(experience, schema, { abortEarly: false });
};

const validateEducation = experience => {
  const schema = {
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldOfStudy: Joi.string().required(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string()
  };
  return Joi.validate(experience, schema, { abortEarly: false });
};

module.exports.Profile = Profile;
module.exports.validate = validateProfile;
module.exports.validateExperience = validateExperience;
module.exports.validateEducation = validateEducation;
