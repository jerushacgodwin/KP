"use client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import VideoList from "@src/components/VideoList";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import dynamic from 'next/dynamic';
const PdfViewer = dynamic(() => import('@src/components/PdfViewer'), { ssr: false });

import DynamicAccordion from "@src/components/Accordion";
import DropDownField from "@src/components/DropDown";
import { useForm } from "react-hook-form";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const StudentLessonsPage = () => {
  const {
    control,
    setValue,
    watch,
  } = useForm();

  // User & Class State
  const userString = Cookies.get("log-user");
  const [userID, setUserID] = useState<number>(0);
  const [role, setRole] = useState<number>(0);
  const [classByUserId, setClassByUserId] = useState<number>(0);
  const [classList, setClassList] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(0);

  // Content State
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [subjectSelected, setSubjectSelected] = useState<number | null>(null);
  
  const [chapterList, setChapterList] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null);

  const [lessonList, setLessonList] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);

  // --- Initial Data Loading ---
  useEffect(() => {
    async function getClasses() {
      const res: any = await apiFetch(`${apiUrl}/class`, "GET");
      if (res && res.result) setClassList(res.result);
    }
    getClasses();
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
    async function getUserClass() {
      if (userID > 0) {
        const res: any = await apiFetch(`${apiUrl}/student/class/${userID}`, "GET");
        if (res && res.result) setClassByUserId(res.result);
      }
    }
    getUserClass();
  }, [userID]);

  useEffect(() => {
    async function getSubjects() {
      // Use selectedClass if teacher/admin, else login user's class
      const targetClass = role === 3 ? classByUserId : selectedClass; // 3 = Student
      
      if (targetClass && targetClass > 0) {
        const res: any = await apiFetch(`${apiUrl}/student/subject/${targetClass}`, "GET");
        if (res && res.result) setSubjectList(res.result);
      }
    }
    getSubjects();
  }, [classByUserId, selectedClass, role]);

  // --- Flow Logic ---

  // 1. Fetch Chapters when Subject Selected
  useEffect(() => {
    async function getChapters() {
      setChapterList([]);
      setSelectedChapter(null);
      setLessonList([]);
      setSelectedLesson(null);

      const targetClass = role === 3 ? classByUserId : selectedClass;

      if (targetClass && subjectSelected) {
        setLoading(true);
        try {
          // Use the NEW Chapter API
           // NOTE: Ensure the backend route is /chapters/student/... NOT /student/chapters if that's how we mounted it.
           // In app.ts: app.use('/chapters', chapterRoutes);
           // Route: router.get('/student/chapters/:class_id/:subject_id', ...)
           // So URL: /chapters/student/chapters/:classId/:subjectId
           const res: any = await apiFetch(`${apiUrl}/chapters/student/chapters/${targetClass}/${subjectSelected}`, "GET");
           if (res && res.result) {
             setChapterList(res.result);
           }
        } catch (error) {
           console.error("Failed to fetch chapters", error);
        } finally {
           setLoading(false);
        }
      }
    }
    getChapters();
  }, [subjectSelected, selectedClass, classByUserId, role]);

  // 2. Fetch Lessons when Chapter Selected
  useEffect(() => {
    async function getLessons() {
      setLessonList([]);
      setSelectedLesson(null);

      const targetClass = role === 3 ? classByUserId : selectedClass;

      if (targetClass && subjectSelected && selectedChapter) {
        setLoading(true);
        try {
            // Fetch ALL lessons for the subject (existing API) and filter locally?
            // OR ideally, backend supports filtering by chapter.
            // Existing API: /student/getlessons/${targetClass}/${subjectSelected}
            // It returns all lessons. We can filter by `chapter_title` matching `selectedChapter.title`.
            const res: any = await apiFetch(`${apiUrl}/student/getlessons/${targetClass}/${subjectSelected}`, "GET");
            if (res && res.result) {
                // Filter by chapter title
                const filtered = res.result.filter((l: any) => l.chapter_title === selectedChapter.title);
                setLessonList(filtered);
            }
        } catch (error) {
            console.error("Failed to fetch lessons", error);
        } finally {
            setLoading(false);
        }
      }
    }
    getLessons();
  }, [selectedChapter, subjectSelected, selectedClass, classByUserId, role]);


  // --- Handlers ---
  const handleSubjectChange = (val: any) => {
    setSubjectSelected(val.selected);
  };
  
  const handleClassChange = (val: any) => {
    setSelectedClass(val.selected);
    setClassByUserId(val.selected); // Sync for logic
  };

  // --- Render Helpers ---

  const renderContent = () => {
    if (!subjectSelected) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <i className="pi pi-book text-4xl mb-4 text-gray-300"></i>
          <p>Please select a subject to view chapters.</p>
        </div>
      );
    }

    if (!selectedChapter) {
      // Step 2: List Chapters
      return (
        <div className="flex flex-col gap-6">
           <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Chapters</h2>
           {loading ? <ProgressSpinner className="w-10 h-10" /> : (
             chapterList.length === 0 ? (
               <p className="text-gray-500">No chapters found for this subject.</p>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {chapterList.map((chapter) => (
                   <Card 
                     key={chapter.id} 
                     className="cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                     onClick={() => setSelectedChapter(chapter)}
                   >
                     <div className="flex flex-col gap-2">
                       <h3 className="text-lg font-bold text-blue-700">{chapter.title}</h3>
                       <p className="text-sm text-gray-600 line-clamp-3">
                         {chapter.description || "No description available."}
                       </p>
                       <div className="mt-2 text-xs text-right text-gray-400">
                         Click to view lessons <i className="pi pi-arrow-right ml-1"></i>
                       </div>
                     </div>
                   </Card>
                 ))}
               </div>
             )
           )}
        </div>
      );
    }

    // Step 3 & 4: Chapter Details + Lesson List + Lesson Content
    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumb / Back Navigation */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                    setSelectedChapter(null); 
                    setSelectedLesson(null);
                }}>Chapters</span>
                <i className="pi pi-angle-right"></i>
                <span className="font-semibold text-gray-800">{selectedChapter.title}</span>
            </div>

            {/* Chapter Header */}
            <div className="bg-white p-6 rounded-md shadow-sm border border-l-4 border-l-blue-500">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedChapter.title}</h1>
                <p className="text-gray-600">{selectedChapter.description || "No description for this chapter."}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Lesson List Sidebar */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <i className="pi pi-list"></i> Lessons
                    </h3>
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                        {loading && !lessonList.length ? (
                            <div className="p-4 text-center"><ProgressSpinner style={{width:'30px', height: '30px'}}/></div>
                        ) : (lessonList.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">No lessons found.</div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {lessonList.map((lesson) => (
                                    <div 
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(lesson)}
                                        className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors flex justify-between items-center ${selectedLesson?.id === lesson.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                                    >
                                        <div className="truncate pr-2">
                                            <h4 className={`text-sm font-medium ${selectedLesson?.id === lesson.id ? 'text-blue-800' : 'text-gray-700'}`}>{lesson.lesson_title}</h4>
                                        </div>
                                        {selectedLesson?.id === lesson.id && <i className="pi pi-chevron-right text-xs text-blue-500"></i>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lesson Content Area */}
                <div className="w-full lg:w-2/3">
                    {selectedLesson ? (
                        <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
                             {/* Lesson Content Component (reused) */}
                             <LessonContent lesson={selectedLesson} />
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md h-64 flex flex-col items-center justify-center text-gray-400">
                            <i className="pi pi-file text-3xl mb-2"></i>
                            <p>Select a lesson from the list to view content.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] overflow-hidden bg-[#F7F8FA]">
        {/* Top Bar for Selection */}
        <div className="bg-white p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center shadow-sm z-10">
            {role !== 3 && classList && (
                 <div className="w-48">
                    <DropDownField
                        label="Class"
                        name="class_id" // Unused in form data really, just for UI
                        value={selectedClass}
                        options={classList}
                        control={control}
                        setSelected={handleClassChange}
                        optionLabel="name"
                        optionValue="class_id"
                        placeholder="Select Class"
                    />
                 </div>
            )}
            
            <div className="w-64">
                <DropDownField
                    label="Subject"
                    name="subject_id"
                    value={subjectSelected}
                    options={subjectList}
                    control={control}
                    setSelected={handleSubjectChange}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select Subject"
                    disabled={!classByUserId && !selectedClass}
                 />
            </div>
            {/* Show current selection breadcrumb text if needed */}
        </div>

        {/* Main Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {renderContent()}
            </div>
        </div>
    </div>
  );
};

// Sub-component for Lesson Content (Clean separation)
const LessonContent = ({ lesson }: { lesson: any }) => {
    let sections = [];
    try {
      if (typeof lesson.accordion_data === 'string') {
          let parsed = JSON.parse(lesson.accordion_data);
          if (typeof parsed === 'string') parsed = JSON.parse(parsed);
          sections = Array.isArray(parsed) ? parsed : [];
      } else if (Array.isArray(lesson.accordion_data)) {
          sections = lesson.accordion_data;
      }
    } catch (e) { console.error(e) }

    const serverUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';
    const filePath = lesson.file_path || lesson.pdf_path;
    const fileUrl = filePath ? `${serverUrl}/uploads/staff/${filePath}` : null;
    const isPdf = filePath?.toLowerCase().endsWith('.pdf');

    return (
        <div className="flex flex-col gap-6">
             <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">{lesson.lesson_title}</h2>
                
                {/* File */}
                {fileUrl && (
                    <div className="mb-6">
                         {isPdf ? <PdfViewer url={fileUrl} /> : (
                            <a href={fileUrl} download className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                                <i className="pi pi-download"></i> Download Attached File
                            </a>
                         )}
                    </div>
                )}
                
                {/* Notes */}
                {sections.length > 0 && (
                     <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
                        <DynamicAccordion key={lesson.id} initialSections={sections} readOnly={true} onChange={()=>{}} />
                     </div>
                )}
             </div>

             {/* Videos */}
             {lesson.video_urls && (
                  <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Videos</h3>
                      <VideoList videoUrls={lesson.video_urls} readonly={true} />
                  </div>
             )}
        </div>
    );
};

export default StudentLessonsPage;
