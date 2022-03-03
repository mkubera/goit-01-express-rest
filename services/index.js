const Cat = require("./schemas/cat");

const getAllCats = () => {
  return Cat.find().limit(3);
};

const createCat = ({
  nickname,
  age = 1,
  owner = { name: null, address: [], birthday: null },
}) => {
  console.log(`createCat -- `, nickname);
  return Cat.create({ nickname, age, owner });
};

module.exports = {
  getAllCats,
  createCat,
};
