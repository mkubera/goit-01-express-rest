const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catSchema = new Schema(
  {
    nickname: {
      type: String,
      minlength: 2,
      maxlength: 40,
      required: [true, "Nickname is required"],
      // index: 1,
      unique: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 50,
    },
    owner: {
      name: String,
      address: [String],
      birthday: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

catSchema.methods.fullName = function () {
  console.log(`${this.nickname} ${this.age}`);
};

const Cat = mongoose.model("cat", catSchema);

module.exports = Cat;
