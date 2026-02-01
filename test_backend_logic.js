const { Sequelize, DataTypes, Op } = require('sequelize');

// Connect to DB (Host: localhost because we are running outside docker)
const sequelize = new Sequelize('sms_2_0', 'root', 'root', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
  logging: false,
});

// Define Models (simplified for testing)
const Student = sequelize.define('Student', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    class_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
}, { timestamps: false, tableName: 'students' });

const StudentAttendance = sequelize.define('StudentAttendance', { // Removed space
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, field: 'attendance_date' }, // Map to actual column name?
    status: { type: DataTypes.TINYINT }, // 1 or 0? Or string? Service used 'Present'/'Absent'
    // Check actual column names from model: attendance_date, status, present
    attendance_date: { type: DataTypes.DATEONLY },
    present: { type: DataTypes.TINYINT }, // 0 or 1
}, { timestamps: false, tableName: 'student_attendances', underscored: true });

const SchoolFinance = sequelize.define('SchoolFinance', {
     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
     type: { type: DataTypes.ENUM('income', 'expense') },
     amount: { type: DataTypes.DECIMAL(10, 2) },
     date: { type: DataTypes.DATEONLY },
}, { timestamps: true, tableName: 'school_finances' });


async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const school_id = 'SCH-001';
    const today = new Date().toISOString().slice(0, 10);
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10);

    console.log('Fetching Total Students...');
    // const totalStudents = await Student.count(); // Removed where school_id
    // console.log('Total Students:', totalStudents);

    console.log('Fetching Attendance...');
    // NOTE: My service code used status='Present', but model says status is TINYINT and present is TINYINT.
    // I need to adjust the query logic to match the DB schema.
    
    // Check table structure via Sequelize describe
    // const desc = await sequelize.getQueryInterface().describeTable('student_attendances');
    // console.log(desc);

    // Let's try to replicate the service query
    // In service: status: 'Present'. In DB model: status is TINYINT (1=Present??) and present is TINYINT (0=Absent, 1=Present).
    // The service code I wrote was WRONG if it used strings 'Present'/'Absent'.

    const presentCount = await StudentAttendance.count({
        where: {
            attendance_date: today,
            present: 1
        }
    });
    console.log('Present Count Today:', presentCount);

    const absentCount = await StudentAttendance.count({
        where: {
            attendance_date: today,
            present: 0
        }
    });
    console.log('Absent Count Today:', absentCount);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

test();
