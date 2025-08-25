const { z } = require("zod");
const validator = require("validator");

const sanitize = (val) => validator.escape(val || "");

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required!").transform(sanitize),
    lastName: z.string().min(1, "Last name is required!").transform(sanitize),

    age: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Age must be at least 1!")
    ),

    telePhone: z.string().optional(),
    address: z.string().min(1, "Address is required!").transform(sanitize),
    bloodType: z.string().min(1, "Blood Type is required!"),

   birthday: z
    .preprocess((val) => {
      if (typeof val === "string") {
         let cleaned = val;
if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
  cleaned = cleaned.slice(1, -1); // remove first and last char
}      

        const parsed = new Date(cleaned);

          return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      if (val instanceof Date) return val;
      return undefined;
    }, z.date().optional()),
    sex: z.enum(["male", "female"], { required_error: "Sex is required!" }),

    designation: z.string().optional().nullable().transform(sanitize),
    qualification: z.string().optional().nullable().transform(sanitize),
    experience: z.string().optional().nullable().transform(sanitize),

    email: z.string().email("Invalid email").optional().nullable(),
    phone_no: z.string().optional().nullable(),

    joining_date: z
    .preprocess((val) => {
      if (typeof val === "string") {
         let cleaned = val;
if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
  cleaned = cleaned.slice(1, -1); // remove first and last char
}      
       const parsed = new Date(cleaned);

          return isNaN(parsed.getTime()) ? undefined : parsed;
         }
      if (val instanceof Date) return val;
      return undefined;
    }, z.date().optional()),
    role_id: z.preprocess(
      (val) => Number(val),
      z.number().optional().nullable()
    ),

    fatherName: z
      .string()
      .min(1, "Father's name is required!")
      .transform(sanitize),
    motherName: z
      .string()
      .min(1, "Mother's name is required!")
      .transform(sanitize),
    fatherPhone: z.string().optional(),
    motherPhone: z.string().optional(),
   
    marital_status: z.enum(["single", "married", "divorced", "widowed"], {
      required_error: "Marital status is required!",
    }),

    husband_WifeName: z.string().optional().transform(sanitize),
    husband_WifePhone: z.string().optional(),
    specialized_in: z.string().optional().transform(sanitize),

    nationality: z.string().min(1).default("Indian").transform(sanitize),
    presentAddress: z
      .string()
      .min(1, "Present address is required!")
      .transform(sanitize),

    religion: z.enum(
      [
        "hinduism",
        "islam",
        "christianity",
        "sikhism",
        "buddhism",
        "jainism",
        "other",
      ],
      { message: "Religion is required!" }
    ),

    cast: z.enum(["general", "obc", "sc", "st", "sbc", "other"], {
      message: "Caste is required!",
    }),
  })

  // Custom logic
  .superRefine((data, ctx) => {
    if (data.marital_status === "married" && !data.husband_WifeName?.trim()) {
      ctx.addIssue({
        path: ["husband_WifeName"],
        code: z.ZodIssueCode.custom,
        message: "Spouse name is required when marital status is Married",
      });
    }
  });

module.exports = { schema };
