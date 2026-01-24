const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const SchoolFees = sequelize.define(
  "school_fees",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    school_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: "schools",
        key: "code",
      },
    },
    class_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "classes", // or i_classes if that’s your table
        key: "id",
      },
    },
    academic_year: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    receipt_no:{
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    bill_date: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fee_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    balance_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "school_fees",
    timestamps: false, // Disable default Sequelize timestamps
  }
);

SchoolFees.associate = (models) => {
  if (models.Class) {
    SchoolFees.belongsTo(models.Class, {
      foreignKey: "class_id",
      as: "class",
    });
  }

  if (models.School) {
    SchoolFees.belongsTo(models.School, {
      foreignKey: "school_id",
      targetKey: "code",
      as: "school",
    });
  }
};

SchoolFees.createFee = (data) => {
  return {
    school_id: data.school_id,
    class_id: data.class_id,
    academic_year: data.academic_year,
    fee_type: data.fee_type,
    receipt_no: data.receipt_no,
    amount: data.amount,
    due_date: data.due_date || null,
    remarks: data.remarks || null,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = SchoolFees;
