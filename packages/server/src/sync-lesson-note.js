const { sequelize } = require('./db/db');
const LessonNote = require('./models/lessonnote.model');

async function syncLessonNote() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    await LessonNote.sync({ alter: true });
    console.log('LessonNote table synced successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing LessonNote table:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

syncLessonNote();
