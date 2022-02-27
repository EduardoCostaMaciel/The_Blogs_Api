const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');

// require('dotenv').config();
// const SECRET = process.env.SECRET || "secret";

const SECRET = './jwt.evaluation.key';
const RESULT_SECRET = readFileSync(SECRET, 'utf-8').replace('\n', '');

const createToken = (payload) => jwt.sign(payload, RESULT_SECRET);

const verifyToken = (token) => jwt.verify(token, RESULT_SECRET);

module.exports = { createToken, verifyToken };
