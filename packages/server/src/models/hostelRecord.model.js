const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const HostelRecord = sequelize.define(
  "HostelRecord",
  {
    InstituteId: { type: DataTypes.INTEGER },
    HostelRecordId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentId: { type: DataTypes.INTEGER },
    HostelTermNo: { type: DataTypes.INTEGER },
    HostelTermFee: { type: DataTypes.DOUBLE },
    TermPaidDate: { type: DataTypes.DATEONLY },
    PaidBy: { type: DataTypes.STRING(100) },
    Year: { type: DataTypes.STRING(10) },
    HostelTermDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "hostelrecord",
    timestamps: false,
    underscored: false,
  }
);

HostelRecord.associate = (models) => {
  HostelRecord.belongsTo(models.Student, {
    foreignKey: "StudentId",
    as: "student",
  });
};

module.exports = HostelRecord;
