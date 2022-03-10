// const jsonResponse = (res, code, data) => res.json({ code, data });

const jsonResponse = (res, jsonData) =>
  res.status(jsonData.code).json(jsonData);

module.exports = {
  jsonResponse,
};
