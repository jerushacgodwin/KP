"use client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import InputField from "@src/components/InputField";
import { body } from "express-validator";
import Image from "next/image";
import TiptapEditor from "@src/components/TiptapEditor";
import DynamicAccordion from "@src/components/Accordion";
import DropDownField from "@src/components/DropDown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sanitizeFormData } from "@src/lib/utility";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const lessonSchema = z.object({
  lesson_title: z.string().min(1, "Lesson title is required"),
  chapter_title: z.string().min(1, "Chapter title is required"),
  subject_id: z
    .number({ invalid_type_error: "Subject is required!" })
    .min(1, { message: "Subject is required!" }),
  class_id: z
    .number({ invalid_type_error: "Class is required!" })
    .min(1, { message: "Class is required!" }),
     teacher_id: z.number().optional(), 
  img: z
    .preprocess(
      (val) => (val instanceof FileList ? val[0] : val),
      z
        .custom<File>((file) => file instanceof File && file.size > 0, {
          message: "Invalid file!",
        })
        .optional()
    )
    .optional(),
  accordionData: z
    .array(
      z.object({
        title: z.string().min(1, "Section title is required"),
        content: z.string().min(1, "Content is required"),
        tags: z.string().optional(),
       // Default to true for new sections
      })
    )
    .min(1, "At least one section is required"),
});

type Inputs = z.infer<typeof lessonSchema>;
const AddLessonsPage = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(lessonSchema),
  });
  const [events, setEvents] = useState<any[]>([]);
  const [accordionData, setAccordionData] = useState([]);

  const userString = Cookies.get("log-user");
  const [classList, setClassList] = useState<any[]>([]);
  const [dropDownSelected, setDropDownSelected] = useState<any>(null);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [subjectSelected, setSubjectSelected] = useState<any[]>([]);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  useEffect(() => {
    async function getclassList() {
      const getclasslist = await apiFetch(`${apiUrl}/class`, "GET");
      if (getclasslist && getclasslist.result) {
        setClassList(getclasslist.result);
      }
    }
    getclassList();
  }, []);
  useEffect(() => {
  if (userString) {
    try {
      const parsed = JSON.parse(userString);
      setTeacherId(parsed.user_id); // Or parsed.teacher_id, depending on your structure
    } catch (err) {
      console.error("Invalid cookie format:", err);
    }
  }
}, [userString]);
   useEffect(() => {
     async function getSubjectList() {
       if (dropDownSelected) {
         const getSubjectList = await apiFetch(
           `${apiUrl}/student/subject/${dropDownSelected}`,
           "GET"
         );
         if (getSubjectList && getSubjectList.result) {
           setSubjectList(getSubjectList.result);
         }
       }
     }
     getSubjectList();
   }, [dropDownSelected]);
  const onSubmit = (data) => {
      const payload = {
    ...data,
    teacher_id: teacherId, // ✅ include the user ID
  };
    const cleaned = sanitizeFormData(payload);
    const addLesson = apiFetch(
      `${apiUrl}/teacher/addlessons`,
      "POST",
      cleaned,
      {},
      true
    );
    console.log("Form valid, submitting:", addLesson);
    // e.g. send to server, clear form, etc.
  };
  const setSelectedClass = (value: { selected: any }) => {
    //console.log("Selected class:", value.selected);
    setDropDownSelected(value.selected);
  };
  const setSelectedSubject = (value: { selected: any }) => {
    setSubjectSelected(value.selected);
  };

  return (
    <form
      className="flex flex-col bg-[#F7F8FA] "
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("❌ Form validation errors:", errors);
      })}
    >
      <div className="px-4 py-0 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Add Lesson</h1>

            <DynamicAccordion
              onChange={(data) => setValue("accordionData", data)}
            />
            {errors.accordionData?.message && (
              <p className="text-red-500 text-sm mt-2">
                {errors.accordionData.message}
              </p>
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-8 bg-white p-4">
          {classList && (
            <DropDownField
              label="Class"
              name="class_id"
              value={dropDownSelected}
              options={classList}
              control={control}
              setSelected={setSelectedClass}
              optionLabel="name"
              optionValue="class_id"
            />
          )}
            {classList && (
            <DropDownField
              label="Subject"
              name="subject_id"
              value={subjectSelected}
              options={subjectList}
              control={control}
              setSelected={setSelectedSubject}
              optionLabel="name"
              optionValue="id"
            />
          )}
           <InputField
            name="lesson_title"
            type="text"
            label="Lesson Title"
            register={register}
            className="w-full"
            error={errors.lesson_title}
          />
          <InputField
            name="chapter_title"
            type="text"
            label="Chapter Title"
            register={register}
            className="w-full"
            error={errors.chapter_title}
          />
          <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
            <label
              className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              htmlFor="img"
            >
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a File</span>
            </label>
            <input
              type="file"
              id="img"
              {...register("img")}
              className="hidden"
            />
            {errors.img?.message && (
              <p className="text-xs text-red-400">
                {errors.img.message.toString()}
              </p>
            )}
          </div>
        </div>
        
      </div>
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
   <button className="bg-blue-400 text-white p-2 rounded-md w-full" type="submit">
       Create
      </button>
      </div>
   
    </form>
  );
};
export default AddLessonsPage;
