"use client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import InputField from "@src/components/InputField";
import VideoList from "@src/components/VideoList";
import { ProgressSpinner } from 'primereact/progressspinner';

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
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const userString = Cookies.get("log-user");
  const [classByUserId, setClassByUserId] = useState<number>(0);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [subjectSelected, setSubjectSelected] = useState<number | null>(0);
  const [lessonNote, setLessonNote] = useState<any[]>([]);
  const [getUserID, setUserID] = useState<number>(0);
  const [classList, setClassList] = useState<any[]>([]);
  const [roole, setRole] = useState<number>(0);
  const [selectedClass, setSelectedClass] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getclassList() {
      const getclasslist: any = await apiFetch(`${apiUrl}/class`, "GET");
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
        const getClassByUserId: any = await apiFetch(
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
        const getSubjectList: any = await apiFetch(
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
      if (classByUserId && subjectSelected && subjectSelected > 0) {
        setLoading(true);
        try {
            const getLessonList: any = await apiFetch(
              `${apiUrl}/student/getlessons/${classByUserId}/${subjectSelected}`,
              "GET"
            );
            if (getLessonList && getLessonList.result) {
              setLessonNote(getLessonList.result);
              // Auto-select first lesson if available
              if (getLessonList.result.length > 0) {
                 setSelectedLesson(getLessonList.result[0]);
              } else {
                 setSelectedLesson(null);
              }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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

  const renderLessonContent = () => {
      if (!selectedLesson) return <div className="p-8 text-center text-gray-500">Select a lesson to view details.</div>;
      
      let sections = [];
      try {
        if (typeof selectedLesson.accordion_data === 'string') {
            let parsed = JSON.parse(selectedLesson.accordion_data);
            if (typeof parsed === 'string') parsed = JSON.parse(parsed);
            sections = Array.isArray(parsed) ? parsed : [];
        } else if (Array.isArray(selectedLesson.accordion_data)) {
            sections = selectedLesson.accordion_data;
        }
      } catch (e) {
        console.error("Error parsing content", e);
      }

      return (
          <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedLesson.lesson_title}</h1>
                  <h2 className="text-md text-gray-500 mb-6 border-b pb-4">{selectedLesson.chapter_title}</h2>
                  
                  {sections.length > 0 ? (
                      <DynamicAccordion
                        key={selectedLesson.id} // Force re-render on lesson change
                        onChange={() => {}}
                        initialSections={sections}
                        readOnly={true}
                      />
                  ) : (
                      <p className="text-gray-400 italic">No text content available.</p>
                  )}
              </div>

              {selectedLesson.video_urls && (
                  <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Video Resources</h3>
                      <VideoList videoUrls={selectedLesson.video_urls} readonly={true} />
                  </div>
              )}
          </div>
      );
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] overflow-hidden bg-[#F7F8FA]">
      {/* SIDEBAR */}
      <div className="w-full md:w-1/4 bg-white border-r border-gray-200 flex flex-col h-full z-10">
          <div className="p-4 border-b border-gray-100 flex flex-col gap-4">
               <div>
                  <h2 className="text-lg font-bold text-gray-800">My Lessons</h2>
                  <p className="text-xs text-gray-500">Select to view content</p>
               </div>
               
               {classList && roole !== 3 && (
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

          <div className="flex-1 overflow-y-auto p-2">
             {loading ? (
                <div className="flex justify-center p-4">
                    <ProgressSpinner style={{width: '40px', height: '40px'}} />
                </div>
             ) : (
                 <>
                 {lessonNote.length === 0 ? (
                     <p className="text-sm text-gray-400 text-center mt-4">
                        {subjectSelected ? "No lessons found." : "Select Subject"}
                     </p>
                 ) : (
                     <div className="flex flex-col gap-1">
                        {lessonNote.map((lesson: any, i) => (
                            <div 
                                key={lesson.id || i} 
                                onClick={() => setSelectedLesson(lesson)}
                                className={`p-3 rounded-md cursor-pointer transition-all border ${selectedLesson?.id === lesson.id ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50'}`}
                            >
                                <h3 className={`font-semibold text-sm ${selectedLesson?.id === lesson.id ? 'text-blue-700' : 'text-gray-700'} truncate`}>{lesson.lesson_title}</h3>
                                <p className="text-xs text-gray-500 truncate">{lesson.chapter_title}</p>
                            </div>
                        ))}
                     </div>
                 )}
                 </>
             )}
          </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F7F8FA]">
          <div className="max-w-4xl mx-auto">
             {renderLessonContent()}
          </div>
      </div>
    </div>
  );
};
export default getLessonsPage;
