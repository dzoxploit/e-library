const { Datatypes } = require("sequelize");
const conn = require("../connect");
const UserModel = require("./user");

const LoanBookModel = conn.define(
  "loanBooks",
  {
    penggunaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    loanCode: {
      type: Datatypes.STRING(50),
      primaryKey: true,
    },
    status: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "loanBooks",
    timestamps: true,
  }
);
LoanBookModel.belongsTo(PenggunaModel, {
  onUpdate: "cascade",
  onDelete: "cascade",
});

module.exports - LoanBookModel;
