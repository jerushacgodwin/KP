const { DataTypes, cast } = require("sequelize");
const { sequelize } = require("../db/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
   school_id: { type: DataTypes.STRING, allowNull: false },
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    qualification: DataTypes.STRING,
    experience: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    religion: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_no: DataTypes.STRING,
    address: { type: DataTypes.TEXT },
    joining_date: DataTypes.DATEONLY,
    marital_status: DataTypes.STRING,
    father_name: DataTypes.STRING,
    father_phone: DataTypes.STRING,
    mother_name: DataTypes.STRING,
    mother_phone: DataTypes.STRING,
    husband_WifeName: DataTypes.STRING,
    husband_WifePhone: DataTypes.STRING,
    specialized_in: DataTypes.STRING,
    nationality: DataTypes.STRING,
    present_address: DataTypes.TEXT,
    resume: DataTypes.STRING,
    id_proof: DataTypes.STRING,
    cast: DataTypes.STRING,
    leave_date: DataTypes.DATEONLY,
    photo: DataTypes.STRING,    
    shift: DataTypes.STRING,
    duty_start: DataTypes.TIME,
    duty_end: DataTypes.TIME,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    deleted_by: DataTypes.INTEGER,
  },
  {
    tableName: "employees",
    timestamps: false,
    paranoid: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: false,
  }
);

// ✅ Associations
Employee.associate = (models) => {
  Employee.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });

  Employee.belongsTo(models.Role, {
    foreignKey: "role_id",
    as: "role",
  });

  // Optional shift relation
  // Employee.belongsTo(models.Shift, { foreignKey: "shift", as: "shiftDetails" });
};

// ✅ Static method for formatting form input
Employee.employeeForm = (parsed, files = {}) => {
  const photoFile = files.img?.[0];
  const idProofFile = files.idproof?.[0];
  const resumeFile = files.resume?.[0];

  return {
    
    role_id: parsed.role_id,
   
    name: `${parsed.firstName} ${parsed.lastName}`,
    designation: parsed.designation || "",
    qualification: parsed.qualification || "",
    experience: parsed.experience || "",
    dob: parsed.birthday ? new Date(parsed.birthday) : null,
    gender: parsed.sex,
    religion: parsed.religion,
    cast: parsed.cast || "",
    email: parsed.email || null,
    phone_no: parsed.phone_no || null,
    address: parsed.address || "",
    joining_date: parsed.joining_date ? new Date(parsed.joining_date) : null,
    father_name: parsed.fatherName || "",
    father_phone: parsed.fatherPhone || "",
    mother_name: parsed.motherName || "",
    mother_phone: parsed.motherPhone || "",
    marital_status: parsed.marital_status || "",
    husband_WifeName: parsed.husband_WifeName || "",
    husband_WifePhone: parsed.husband_WifePhone || "",
    specialized_in: parsed.specialized_in || "",
    nationality: parsed.nationality || "Indian",
    present_address: parsed.presentAddress || "",
    resume: resumeFile ? `/uploads/employees/${resumeFile.filename}` : null,   
    photo: photoFile ? `/uploads/employees/${photoFile.filename}` : null,
    id_proof: idProofFile ? `/uploads/employees/${idProofFile.filename}` : null,   
    status: "1",
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
    updated_by: 1,
  };
};

module.exports = Employee;
