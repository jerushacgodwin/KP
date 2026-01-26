"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apiFetch } from "@src/lib/api";
import VideoList from "@src/components/VideoList";

const StudentLessonsPage = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userString = Cookies.get("log-user");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        let user = null;
        if (userString) {
          user = JSON.parse(userString);
        }

        if (!user || (!user.id && !user.class_id)) {
            // If we can't find class_id directly in cookie, we might need to fetch it using user.id
            // Assuming user object has id.
            console.error("User or class ID not found in cookie");
            setLoading(false);
            return;
        }

        let classId = user.class_id;
        
        // If class_id is missing but we have user id, try to fetch student details
        if (!classId && user.id) {
             const classRes = await apiFetch(`${apiUrl}/student/getStudentById/${user.id}`, 'GET');
             // Adjust based on actual response structure of getStudentById
             if(classRes && classRes.result) {
                 classId = classRes.result.class_id;
             }
        }

        if (classId) {
             const res: any = await apiFetch(`${apiUrl}/student/getlessons/${classId}`, "GET");
             if (res && res.result) {
               setLessons(res.result);
             }
        }
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userString, apiUrl]);

  if (loading) {
    return <div className="p-4">Loading lessons...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <h1 className="text-xl font-semibold mb-4">My Lessons</h1>
      <div className="flex flex-col gap-4">
        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons found.</p>
        ) : (
          lessons.map((lesson: any) => (
            <div key={lesson.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">{lesson.lesson_title}</h2>
                    <p className="text-sm text-gray-600">{lesson.chapter_title}</p>
                    {/* Display subject name if available, or fetch it separately. 
                        getAllLessons returns subject_id. Ideally we want subject name.
                        For now, just showing titles. */}
                </div>
                <span className="text-xs text-gray-400">
                    {new Date(lesson.created_at).toLocaleDateString()}
                </span>
              </div>
              
              {/* Display Accordion Data if you want, but explicitly requested Video URL */}
              
              {lesson.video_urls && (
                  <VideoList videoUrls={lesson.video_urls} readonly={true} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentLessonsPage;
