"use client";

import { Calendar, dayjsLocalizer, Views, View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import CustomToolbar from "./calenderHeader"; // Adjust path if needed

const localizer = dayjsLocalizer(dayjs);

const BigCalendar = ({ calendarData }: { calendarData: any[] }) => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const dayPropGetter = (date: Date) => {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      // Sunday=0, Saturday=6
      return {
        className: "weekend-day",
        style: {
          backgroundColor: "#f0f8ff",
        },
      };
    }
    return {};
  };
 const EventComponent = ({ event }: { event: any }) => {
  if (!event){
    return null;
  } 
    <span>
      {event?.title ?? `${event?.start?.toLocaleTimeString?.() ?? ""} - ${event?.end?.toLocaleTimeString?.() ?? ""}`}
    </span>
 };
;
  const fixedEvents = (calendarData || [])
   .map((event) => {
    const start =  new Date(event.event_time);
    const end = new Date(start.getTime() + 45 * 60 * 1000)
     return {
      title: event.title || `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`,
        start,
        end,  };
  });
  const RBC = Calendar as any;
  if(calendarData ){
  return (
    <RBC
      localizer={localizer}
      events={fixedEvents}
      startAccessor="start"
      endAccessor="end"
      views={["month"]}
      view={view}
      date={date}
      onView={setView}
      onNavigate={setDate}
      style={{ height: "45vh" }}
      components={{
        toolbar: CustomToolbar as any,
          
      }}
       dayPropGetter={dayPropGetter}
    />
  );
}
};

export default BigCalendar;
