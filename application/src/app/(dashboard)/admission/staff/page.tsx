'use client';



import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie"
import { useEffect,useState } from "react";

import { body } from "express-validator";
import TeacherForm from "@src/components/forms/TeacherForm";
 const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const StaffAdmission = () => {
   const userString = Cookies.get("log-user");

    useEffect(() => {
    async function fetchData() {
      try {
           let user = null;
          if (userString) {
            user = JSON.parse(userString);
          }
    //     const [timetable, eventsData,attendance] = await Promise.all([
    //  ]);
        //
      
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }

    fetchData();
    }, []);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="  justify-content-center pb-4">
      {/* LEFT */}
   
        <div className="h-full bg-white p-4 rounded-md">
         
         <TeacherForm type="create" />
        </div>
      </div>
      {/* RIGHT */}
     
    </div>
  );

};

export default StaffAdmission;
