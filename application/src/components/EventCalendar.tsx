"use client";

import { formatDate } from "@src/lib/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DOMPurify from 'dompurify';
import BigCalendar from "./BigCalender";
import { apiFetch } from "@src/lib/api";
import { useUser } from "@src/app/context/UserContext";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// TEMPORARY


import Cookies from "js-cookie";

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [events, setEvents] = useState<any[]>([])
  const [open, setOpen] = useState(false);
  const contextUser = useUser();

 async function fetchData() {
   let user = contextUser;
   
   // Fallback: Check cookie if context is null
   if (!user) {
       const userCookie = Cookies.get("log-user");
       if (userCookie) {
           try {
               user = JSON.parse(userCookie);
           } catch (e) {
               console.error("Failed to parse cookie event user", e);
           }
       }
   }

   // 
   if (!user?.email) {
     console.warn("EventCalendar: No user email, skipping fetch");
     return;
   }
   try {
     const res:any = await apiFetch(`${apiUrl}/events`, 'POST', { email: user.email, role: user.role, user_id: user.user_id });
     
     setEvents(res.events || []);
   } catch (error) {
     console.error('Failed to fetch events:', error);
   }
 }
  useEffect(() => {
    fetchData();
  }, [contextUser]);
  return (
    <div className="bg-white p-4 rounded-md">
{/* <BigCalendar calendarData={eventData} /> */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events / Announcements</h1>
         
        <Image src="/moreDark.png" alt=""     onClick={() => setOpen(true)} width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events?.map((event, index) => {
           // Cycle through 3 colors
           const colors = ["bg-lamaSkyLight", "bg-lamaPurpleLight", "bg-lamaYellowLight"];
           const bgColor = colors[index % colors.length];
           
           return (
            <div
              className={`${bgColor} rounded-md p-4`}
              key={event.id}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-600">{event?.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                   {formatDate(event?.event_time)}
                </span>
              </div>
              {(() => {
                const cleanHtml = DOMPurify.sanitize(event.description);
                return (
                  <p
                    className="mt-2 text-sm text-gray-400"
                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  />
                );
              })()}
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
