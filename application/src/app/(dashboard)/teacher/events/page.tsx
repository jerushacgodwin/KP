'use client';

import EventList from "@src/components/EventList";
import EventForm from "@src/components/forms/EventForm";
import FormModal from "@src/components/FormModal";
import { useState } from "react";

const TeacherEventsPage = () => {
    const [reloadKey, setReloadKey] = useState(0);

    const handleSuccess = () => {
        setReloadKey(prev => prev + 1); // Trigger re-fetch in list
        // FormModal usually closes itself or we might need to handle it.
         alert("Event created successfully");
         window.location.reload(); 
    };

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-4">Manage Events</h1>
           {/* Passing a key to force re-render if needed, though EventList fetches on mount */}
          <EventList key={reloadKey} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md">
             <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
             <EventForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default TeacherEventsPage;
