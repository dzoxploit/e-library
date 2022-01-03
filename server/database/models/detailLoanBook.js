const { DataTypes } = require("sequelize");
const conn = require("../connect");

const DetailLoanBookModel = conn.define(
  "detailloanbooks",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    loanCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "detailloanbooks",
    timestamps: true,
  }
);

DetailLoanBookModel.belongsTo(LoanBookModel, {
  onUpdate: "cascade",
  onDelete: "cascade",
});

DetailLoanBookModel.belongsTo(BookCatalogModel, {
  onUpdate: "cascade",
  onDelete: "cascade",
});

module.exports = DetailLoanBookModel;
