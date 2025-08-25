"use client";

import { formatDate } from "@src/lib/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DOMPurify from 'dompurify';
import BigCalendar from "./BigCalender";
import { apiFetch } from "@src/lib/api";
import { body } from "express-validator";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// TEMPORARY


const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [events, setEvents] = useState<any[]>([])
    const [open, setOpen] = useState(false);
 async function fetchData() {
   try {
     const res:any = await apiFetch(`${apiUrl}/events`, 'POST', body);
     
     setEvents(res.events || []);
   } catch (error) {
     console.error('Failed to fetch events:', error);
   }
 }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white p-4 rounded-md">
{/* <BigCalendar calendarData={eventData} /> */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events / Announcements</h1>
         
        <Image src="/moreDark.png" alt=""     onClick={() => setOpen(true)} width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events?.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event?.title}</h1>
              <span className="text-gray-300 text-xs">{formatDate(event?.event_time)}</span>
            </div>
            {(() => {
              const cleanHtml = DOMPurify.sanitize(event.description);
              return (
                <p
                  className="mt-2 text-gray-400 text-sm"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
