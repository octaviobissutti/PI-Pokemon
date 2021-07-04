const { Type } = require("../db");
const axios = require("axios");

async function getAllTypes(req, res) {
  let types = await Type.findAll();
  return res.status(200).json(types);
}

module.exports = {
  getAllTypes,
};
