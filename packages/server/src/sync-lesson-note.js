const { sequelize } = require('./db/db');
const LessonNote = require('./models/lessonnote.model');

async function syncLessonNote() {
  try {
    await sequelize.authenticate();
        await LessonNote.sync({ alter: true });
        process.exit(0);
  } catch (error) {
    console.error('Error syncing LessonNote table:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

syncLessonNote();
