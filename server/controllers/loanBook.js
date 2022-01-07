const { Op: operator } = require("sequelize");
const LoanBookModel = require("../database/models/loanBook");
const DetailLoanBookModel = require("../database/models/detailLoanBook");
const response = require("../helpers/response");
const pagination = require("../helpers/pagination");

var invNum = require("invoice-number");

exports.insert = async (req, res) => {
  try {
    const { q, page, limit } = req.query;
    const paramExists = Object.keys(req.query).length > 0;
    let loans;

    if (!paramExists) {
      loans = await LoanBookModel.findAll({
        order: [["createdAt", "DESC"]],
        logging: false,
      });
    }

    const data = await LoanBookModel.create({
      ...req.body,
      bookCode: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      userId: req.user.userId,
    });

    response({
      res,
      message: "Successfully added a new book to the library",
      data,
    });
  } catch (error0) {
    response({
      success: false,
      res,
      message: error0.message,
      statusCode: 400,
    });
  }
};
