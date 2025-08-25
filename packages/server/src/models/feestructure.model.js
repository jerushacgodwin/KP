const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const FeeStructure = sequelize.define(
  "fee_structure",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    class_group: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    
    },
     school_id: { type: DataTypes.STRING, allowNull: false,
       references: {
         model: "schools",
         key: "code",
       },
     },
    fee_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    academic_year_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      
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
    tableName: "fee_structure",
    timestamps: false, // disable default Sequelize timestamps
  }
);

FeeStructure.associate = (models) => {
  if (models.iClass) {
    FeeStructure.belongsTo(models.iClass, {
      foreignKey: "class_group",
      targetKey: "group",
      as: "classGroup",
    });
  }

  if (models.School) {
    FeeStructure.belongsTo(models.School, {
      foreignKey: "school_id",
      targetKey: "code",
      as: "school",
    });
  }
};


// FeeStructure.associate = (models) => {

// FeeStructure.belongsTo(models.School, {
//     foreignKey: "school_id",
//     as: "school",
//   });
// FeeStructure.belongsTo(models.Student, {
//     foreignKey: "school_id",
//     as: "students",
//   });

//   FeeStructure.belongsTo(models.Class, {
//     foreignKey: "class_group",  // column in fee_structure
//     targetKey: "group",         // column in i_classes
//     as: "classGroup",
//   });
// };

// Example helper to insert
FeeStructure.createFee = (data) => {
  return {
    class_group_id: data.class_group_id,
    fee_type: data.fee_type,
    amount: data.amount,
    academic_year_id: data.academic_year_id,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = FeeStructure;
