"use client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import InputField from "@src/components/InputField";

import Image from "next/image";

import DynamicAccordion from "@src/components/Accordion";
import DropDownField from "@src/components/DropDown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sanitizeFormData } from "@src/lib/utility";
import { json } from "stream/consumers";
import { read } from "fs";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getLessonsPage = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const [accordionData, setAccordionData] = useState<any[]>([]);

  const userString = Cookies.get("log-user");
  const [classByUserId, setClassByUserId] = useState<number>(0);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [subjectSelected, setSubjectSelected] = useState<number | null>(0);
  const [lessonNote, setLessonNote] = useState<any[]>([]);
  const [getUserID, setUserID] = useState<number>(0);
  const [classList, setClassList] = useState<any[]>([]);
  const [roole, setRole] = useState<number>(0);
  const [selectedClass, setSelectedClass] = useState<number | null>(0);
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
        setUserID(parsed.user_id);
        setRole(parsed.role);
      } catch (err) {
        console.error("Invalid cookie format:", err);
      }
    }
  }, [userString]);
  useEffect(() => {
    async function getClassByUserId() {
      if (getUserID > 0) {
        const getClassByUserId = await apiFetch(
          `${apiUrl}/student/class/${getUserID}`,
          "GET"
        );
        if (getClassByUserId && getClassByUserId.result) {
          setClassByUserId(getClassByUserId.result);
        }
      }
    }
    getClassByUserId();
  }, [getUserID]);
  useEffect(() => {
    async function getSubjectList() {
      if (classByUserId > 0) {
        const getSubjectList = await apiFetch(
          `${apiUrl}/student/subject/${classByUserId}`,
          "GET"
        );
        if (getSubjectList && getSubjectList.result) {
          setSubjectList(getSubjectList.result);
        }
      }
    }
    getSubjectList();
  }, [classByUserId]);

  useEffect(() => {
    async function getLessonList() {
      if (classByUserId && subjectSelected > 0) {
        const getLessonList = await apiFetch(
          `${apiUrl}/student/getlessons/${classByUserId}/${subjectSelected}`,
          "GET"
        );
        if (getLessonList && getLessonList.result) {
          const rawString = getLessonList.result[0].accordion_data;
          setAccordionData(JSON.parse(JSON.parse(JSON.parse(rawString))));
          setLessonNote(getLessonList.result[0]);
        }
      }
    }
    getLessonList();
  }, [subjectSelected, classByUserId]);

  const setSelectedSubject = (value: { selected: any }) => {
    setSubjectSelected(value.selected);
  };
  const set_SelectedClass = (value: { selected: any }) => {
    //console.log("Selected class:", value.selected);
    setSelectedClass(value.selected);
    setClassByUserId(value.selected);
  };
  return (
    <div className="flex flex-col bg-[#F7F8FA] ">
      <div className="px-4 py-0 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold"> Lessons</h1>
            <InputField
              name="lesson_title"
              type="text"
              label="Lesson Title"
              defaultValue={lessonNote.lesson_title}
              register={register}
              className="w-full mb-4 mt-4"
              inputProps={{ readOnly: true }}
            />
            <InputField
              name="chapter_title"
              type="text"
              label="Chapter Title"
              defaultValue={lessonNote.chapter_title}
              register={register}
              className="w-full"
              inputProps={{ readOnly: true }}
            />
            {accordionData && (
              <DynamicAccordion
                onChange={(data) => setValue("accordionData", data)}
                initialSections={accordionData}
                readOnly={true}
              />
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-8 bg-white p-4">
         {classList && roole!==3 && (
            <DropDownField
              label="Class"
              name="class_id"
              value={selectedClass}
              options={classList}
              control={control}
              setSelected={set_SelectedClass}
              optionLabel="name"
              optionValue="class_id"
            />
          )}
          {subjectList && (
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
        </div>
      </div>
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0"></div>
    </div>
  );
};
export default getLessonsPage;
