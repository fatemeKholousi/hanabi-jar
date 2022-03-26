const mongoose=require("mongoose")
const Joi = require("joi");

const genresSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:5,maxlength:50},
  })
  
  const Genre= mongoose.model("crud-genres",genresSchema)
  // const genres = [
  //   {
  //     name: "slice of life",
  //     id: 1,
  //   },
  //   {
  //     name: "comedy",
  //     id: 2,
  //   },
  //   {
  //     name: "horror",
  //     id: 3,
  //   },
  //   {
  //     name: "thriler",
  //     id: 4,
  //   },
  // ];
  const validateGenres = (genre) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    return schema.validate(genre);
  };

  exports.validateGenres=validateGenres;
  exports.Genre=Genre