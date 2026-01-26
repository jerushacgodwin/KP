'use client';

import EventList from "@src/components/EventList";

const StudentEventsPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-4">Upcoming Events</h1>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default StudentEventsPage;
