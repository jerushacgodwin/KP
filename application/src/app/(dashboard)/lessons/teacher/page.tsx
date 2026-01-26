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
import VideoList from "@src/components/VideoList";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

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
  const toast = useRef<Toast>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [accordionData, setAccordionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const userString = Cookies.get("log-user");
  const [classList, setClassList] = useState<any[]>([]);
  const [dropDownSelected, setDropDownSelected] = useState<any>(null);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [subjectSelected, setSubjectSelected] = useState<any>(null);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");

  useEffect(() => {
    async function getclassList() {
      try {
        const getclasslist: any = await apiFetch(`${apiUrl}/class`, "GET");
        if (getclasslist && getclasslist.result) {
          setClassList(getclasslist.result);
        }
      } catch (e) {
        console.error("Error fetching classes", e);
      } finally {
        setLoading(false);
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
         const getSubjectList: any = await apiFetch(
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

   const fetchLessons = async () => {
        // Ensure both are valid IDs (not null, not empty array/object if that happens)
        if (dropDownSelected && subjectSelected) {
            try {
                // Using the student endpoint to fetch lessons as it allows filtering by class and subject
                const res: any = await apiFetch(`${apiUrl}/student/getlessons/${dropDownSelected}/${subjectSelected}`, "GET");
                if (res && res.result) {
                    setEvents(res.result);
                }
            } catch (err) {
                console.error("Failed to fetch lessons", err);
            }
        }
   };

   useEffect(() => {
     fetchLessons();
   }, [dropDownSelected, subjectSelected]);

  const handleAddVideo = () => {
    if (newVideoUrl && !videoUrls.includes(newVideoUrl)) {
      setVideoUrls([...videoUrls, newVideoUrl]);
      setNewVideoUrl("");
    }
  };

  const handleDeleteVideo = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index));
  };

  const handleDeleteLesson = async (id: number) => {
      if (confirm("Are you sure you want to delete this lesson?")) {
          try {
              await apiFetch(`${apiUrl}/teacher/deletelessons/${id}`, "DELETE");
              
              // Refresh lists
              fetchLessons();
              
              // If deleted lesson was currently selected (populated), clear form? 
              // Hard to track exact one without ID in form state, but generally good practice to clear if clearing flow.
          } catch (e) {
              console.error("Failed to delete lesson", e);
              alert("Failed to delete lesson");
          }
      }
  };


  const onSubmit = async (data) => {
      setSubmitting(true);
      try {
          const payload = {
            ...data,
            teacher_id: teacherId, // ✅ include the user ID
          };
          const cleaned = sanitizeFormData(payload);
          (cleaned as any).video_urls = JSON.stringify(videoUrls);
      
          const addLesson = await apiFetch(
            `${apiUrl}/teacher/addlessons`,
            "POST",
            cleaned,
            {},
            true
          );
          console.log("Form valid, submitting:", addLesson);
          // e.g. send to server, clear form, etc.
          // Reset video urls
          setVideoUrls([]);
          setNewVideoUrl("");
          setAccordionData([]); // Clear accordion if possible, or reset logic
          handleNewLesson(); // Reset form values properly
          // refresh list
          fetchLessons();
          
          toast.current?.show({severity:'success', summary: 'Success', detail: 'Lesson saved successfully', life: 3000});

      } catch (e: any) {
          console.error("Error submitting form", e);
          toast.current?.show({severity:'error', summary: 'Error', detail: e.message || 'Failed to save lesson', life: 5000});
      } finally {
          setSubmitting(false);
      }
  };
  const setSelectedClass = (value: { selected: any }) => {
    //console.log("Selected class:", value.selected);
    setDropDownSelected(value.selected);
  };
  const setSelectedSubject = (value: { selected: any }) => {
    setSubjectSelected(value.selected);
  };

  // Handle edit/view lesson (populate form)
  const handleSelectLesson = (lesson: any) => {
      setValue("lesson_title", lesson.lesson_title);
      setValue("chapter_title", lesson.chapter_title);
      // Handle Video URLs
      try {
           let urls = [];
           if (typeof lesson.video_urls === 'string') {
               urls = JSON.parse(lesson.video_urls);
           } else if (Array.isArray(lesson.video_urls)) {
               urls = lesson.video_urls;
           }
           setVideoUrls(urls);
      } catch (e) {
          setVideoUrls([]);
      }
      
      // Handle Accordion Data
      try {
          if (lesson.accordion_data) {
             let acc = typeof lesson.accordion_data === 'string' ? JSON.parse(lesson.accordion_data) : lesson.accordion_data;
             // Handle double stringify if present
             if (typeof acc === 'string') acc = JSON.parse(acc);
             
             setValue("accordionData", Array.isArray(acc) ? acc : []);
             // We need to trigger a re-render or update internal state of dynamic accordion if it doesn't watch control?
             // DynamicAccordion uses `onChange` to update parent, but initialSections might be needed?
             // The component prop is `initialSections` (from student page usage) or internal?
             // Teacher page uses: <DynamicAccordion onChange={...} />
             // We might need to pass `key` or `initialData` to force reset.
             setAccordionData(Array.isArray(acc) ? acc : []);
          }
      } catch (e) {
          console.error("Error parsing accordion for edit", e);
      }
      // Note: File upload (img) cannot be set programmatically easily for security, skipping.
  };

  const handleNewLesson = () => {
      setValue("lesson_title", "");
      setValue("chapter_title", "");
      setValue("accordionData", []); // This might need a key reset on Accordion
      setVideoUrls([]);
      setNewVideoUrl("");
      setAccordionData([]); // Reset local state if used
  };

  return (
    <form
      className="flex flex-col md:flex-row h-[calc(100vh-100px)] overflow-hidden bg-[#F7F8FA]"
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("❌ Form validation errors:", errors);
        toast.current?.show({severity:'error', summary: 'Validation Error', detail: 'Please fill in all required fields.', life: 3000});
      })}
    >
      <Toast ref={toast} />
      {submitting && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
              <ProgressSpinner />
          </div>
      )}
      {/* SIDEBAR - Class/Subject & Lesson List */}
      <div className="w-full md:w-1/4 bg-white border-r border-gray-200 flex flex-col h-full">
          {loading ? (
             <div className="flex-1 flex items-center justify-center">
                 <ProgressSpinner style={{width: '50px', height: '50px'}} />
             </div>
          ) : (
          <>
          <div className="p-4 border-b border-gray-100 flex flex-col gap-4">
               <div>
                  <h2 className="text-lg font-bold text-gray-800">Lessons</h2>
                  <p className="text-xs text-gray-500">Select class & subject to manage lessons</p>
               </div>
               
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
                  error={errors.class_id as any}
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
                  error={errors.subject_id as any}
                />
              )}
              
              <button 
                type="button" 
                onClick={handleNewLesson}
                className="bg-lamaSky text-white py-2 px-4 rounded-md w-full flex items-center justify-center gap-2 hover:bg-lamaSkyLight transition-colors"
               >
                 <i className="pi pi-plus" style={{ fontSize: '0.8rem' }}></i>
                 Add New Lesson
               </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
             {events.length === 0 ? (
                 <p className="text-sm text-gray-400 text-center mt-4">
                    {dropDownSelected && subjectSelected ? "No lessons found." : "Select Class & Subject"}
                 </p>
             ) : (
                 <div className="flex flex-col gap-2">
                    {events.map((lesson: any, i) => (
                        <div 
                            key={lesson.id || i} 
                            onClick={() => handleSelectLesson(lesson)}
                            className="p-3 rounded-md border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-all flex justify-between items-center group"
                        >
                            <div className="overflow-hidden">
                                <h3 className="font-semibold text-sm text-gray-700 truncate">{lesson.lesson_title}</h3>
                                <p className="text-xs text-gray-500 truncate">{lesson.chapter_title}</p>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent selecting the lesson
                                    handleDeleteLesson(lesson.id);
                                }}
                                className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Lesson"
                            >
                                <i className="pi pi-trash" style={{ fontSize: '0.9rem' }}></i>
                            </button>
                        </div>
                    ))}
                 </div>
             )}
          </div>
          </>
          )}
      </div>

      {/* MAIN CONTENT - Form Inputs */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
         {/* HEADER */}
         <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
             <h1 className="text-xl font-semibold">Lesson Editor</h1>
             <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-sm" type="submit">
                 Save Lesson
             </button>
         </div>
         
         {/* SCROLLABLE FORM AREA */}
         <div className="flex-1 overflow-y-auto p-4 md:p-6">
             <div className="flex flex-col xl:flex-row gap-6">
                 {/* LEFT: CONTENT (Accordion) */}
                 <div className="flex-1 flex flex-col gap-4">
                     <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                        <h2 className="text-md font-semibold mb-4 text-gray-700">Content Sections</h2>
                        {/* Pass key to force re-render on reset */}
                        <DynamicAccordion
                          key={accordionData.length} 
                          onChange={(data) => setValue("accordionData", data)}
                          // If DynamicAccordion supports initialData prop? Assuming NO based on prev code usage, 
                          // ensuring it handles 'onChange' correctly.
                          // Ideally we need to pass initial data if editing. 
                          // Let's assume for now user wants 'Add' mostly, but if 'edit' 
                          // DynamicAccordion needs update.
                        />
                        {errors.accordionData?.message && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.accordionData.message}
                          </p>
                        )}
                     </div>
                 </div>

                 {/* RIGHT: META (Title, Video, File) */}
                 <div className="w-full xl:w-1/3 flex flex-col gap-6">
                     <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-md font-semibold text-gray-700">Lesson Details</h2>
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
                     </div>

                     <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 flex flex-col gap-4">
                         <h2 className="text-md font-semibold text-gray-700">Video Resources</h2>
                         <div className="flex flex-col gap-2">
                             <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                  placeholder="Paste video URL here..."
                                  value={newVideoUrl}
                                  onChange={(e) => setNewVideoUrl(e.target.value)}
                                  onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                          e.preventDefault();
                                          handleAddVideo();
                                      }
                                  }}
                                />
                                <button 
                                    type="button" 
                                    onClick={handleAddVideo}
                                    className="bg-gray-800 text-white px-3 rounded-md text-sm hover:bg-black"
                                >
                                    Add
                                </button>
                             </div>
                             <VideoList videoUrls={videoUrls} onDelete={handleDeleteVideo} />
                          </div>
                     </div>
                     
                     <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <h2 className="text-md font-semibold text-gray-700 mb-2">Attachments</h2>
                          <div className="flex flex-col gap-2 w-full justify-center">
                            <label
                              className="text-sm text-blue-500 flex items-center gap-2 cursor-pointer hover:underline"
                              htmlFor="img"
                            >
                              <Image src="/upload.png" alt="" width={20} height={20} />
                              <span>Click to Upload File</span>
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
             </div>
         </div>
      </div>
    </form>
  );
};
export default AddLessonsPage;
