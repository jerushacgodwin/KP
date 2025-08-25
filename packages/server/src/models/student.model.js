const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const Student = sequelize.define(
  "Student",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    class_id: { type: DataTypes.INTEGER, allowNull: false, 
    references: { model: "i_classes", key: "class_id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"},   
    school_id: { type: DataTypes.STRING, allowNull: false,references: {
        model: "schools", // Table name
        key: "code"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE" },
    name: { type: DataTypes.STRING, allowNull: false },
   
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.ENUM("male", "female"), allowNull: false },
    religion: { type: DataTypes.STRING, allowNull: false },
    blood_group: { type: DataTypes.STRING, allowNull: false },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Indian",
    },
    photo: { type: DataTypes.STRING, allowNull: true },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    phone_no: { type: DataTypes.STRING, allowNull: true },
    extra_activity: { type: DataTypes.STRING, allowNull: true },
    note: { type: DataTypes.TEXT, allowNull: true },
    father_name: { type: DataTypes.STRING, allowNull: false },
    father_phone_no: { type: DataTypes.STRING, allowNull: true },
    father_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    mother_name: { type: DataTypes.STRING, allowNull: false },
    mother_phone_no: { type: DataTypes.STRING, allowNull: true },
    mother_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    guardian: { type: DataTypes.STRING, allowNull: true },
    guardian_phone_no: { type: DataTypes.STRING, allowNull: true },
    guardian_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    present_address: { type: DataTypes.TEXT, allowNull: false },
    permanent_address: { type: DataTypes.TEXT, allowNull: false },
    birth_certificate: { type: DataTypes.STRING, allowNull: true },
    cast: { type: DataTypes.STRING, allowNull: true },
    sms_receive_no: { type: DataTypes.STRING, allowNull: true },
    siblings: { type: DataTypes.STRING, allowNull: true },
    signature: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.INTEGER, defaultValue: 1 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
   
  },
  {
    tableName: "students",
    timestamps: false,
    paranoid: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: false,
  }
);
Student.associate = (models) => {
  // Student -> iClass
  if (models.iClass) {
    Student.belongsTo(models.iClass, {
      foreignKey: "class_id",
      targetKey: "class_id",
      as: "iClass",
    });
  }

  // Student -> School (optional)
  if (models.School) {
    Student.belongsTo(models.School, {
      foreignKey: "school_id",
      targetKey: "code",
      as: "school",
    });
  }

  // Student -> FeeStructure (by school)
  if (models.FeeStructure) {
    Student.hasMany(models.FeeStructure, {
      foreignKey: "school_id",
      sourceKey: "school_id",
      as: "feeStructures",
    });
  }

  // Student -> StudentAttendance (optional)
  if (models.StudentAttendance) {
    Student.hasMany(models.StudentAttendance, {
      foreignKey: "registration_id",
      as: "attendances",
    });
  }
};
// Define studentForm as a static method on the Student model
Student.studentForm = (parsed, files = {}) => {
  const imgFile = files.img?.[0];
  const birthCertFile = files.birthcet?.[0];

  return {
    class_id: parsed.class,
    name: `${parsed.firstName} ${parsed.lastName}`,    
    dob: parsed.birthday, 
    role_id: parsed.role_id,
    gender: parsed.sex,
    religion: parsed.religion,
    blood_group: parsed.bloodType,
    nationality: parsed.nationality || "Indian",
    photo: imgFile ? `/uploads/students/${imgFile.filename}` : null,
    email: parsed.fatherEmail || parsed.motherEmail || null,
    phone_no: parsed.telePhone,
    extra_activity: "",
    note: parsed.note || "",
    father_name: parsed.fatherName,
    father_phone_no: parsed.fatherPhone || null,
    mother_name: parsed.motherName,
    mother_phone_no: parsed.motherPhone || null,
    guardian: parsed.guardian || null,
    guardian_phone_no: parsed.guardianPhone || null,
    guardian_email: parsed.guardianEmail || null,
    mother_email: parsed.motherEmail || null,
    father_email: parsed.fatherEmail || null,
    present_address: parsed.presentAddress,
    permanent_address: parsed.permanentAddress,
    birth_certificate: birthCertFile
      ? `/uploads/students/${birthCertFile.filename}`
      : null,
    cast: parsed.cast,
    sms_receive_no: parsed.telePhone,
    siblings: "",
    signature: "",
    status: 1,
    created_by: 1,
    updated_by: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = Student;
