const { z } = require('zod');
const validator = require('validator');

const sanitize = (val) => validator.escape(val || '');

const schema = z.object({
  firstName: z.string().min(1).transform(sanitize),
  lastName: z.string().min(1).transform(sanitize),
  age: z.preprocess(val => Number(val), z.number().min(1)),
  telePhone: z.string().min(1),
  bloodType: z.string().min(1),
  birthday: z.preprocess(val => new Date(val), z.date()),
  sex: z.enum(['male', 'female']),
  fatherName: z.string().min(1).transform(sanitize),
  motherName: z.string().min(1).transform(sanitize),
  fatherPhone: z.string().optional(),
  motherPhone: z.string().optional(),
  fatherEmail: z.string().email().optional(),
  motherEmail: z.string().email(),
  fatherOccuPation: z.string().optional().transform(v => v ? sanitize(v) : v),
  motherOccupation: z.string().optional().transform(v => v ? sanitize(v) : v),
  religion: z.string().min(1),
  cast: z.string().min(1),
  nationality: z.string().min(1).default('Indian'),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianEmail: z.string().email().optional(),
  note: z.string().optional(),
  class: z.preprocess(val => Number(val), z.number().min(1)),
});

module.exports = { schema };
