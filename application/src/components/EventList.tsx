'use client';
import { useState, useEffect } from 'react';
import { apiFetch } from '@src/lib/api';
import { useUser } from '@src/app/context/UserContext';
import Image from 'next/image';

type Event = {
  id: number;
  title: string;
  description: string;
  event_time: string;
  class_id?: number;
};

type EventsResponse = {
  events: Event[];
  message?: string;
};

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const user = useUser();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchEvents = async () => {
    console.log("Fetching events for:", user?.email);
    try {
      const res = await apiFetch<EventsResponse>(`${apiUrl}/events`, 'POST', { email: user?.email });
      console.log("Events response:", res);
      if (res && res.events) {
        setEvents(res.events);
      }
    } catch (error) {
       console.error("Failed to fetch events error:", error);
    }
  };

  useEffect(() => {
    if(user?.email){
     fetchEvents();
    }
  }, [user]);

  const handleDelete = async (id: number) => {
      if(!confirm("Are you sure you want to delete this event?")) return;
      try {
          await apiFetch(`${apiUrl}/events/${id}`, 'DELETE');
          fetchEvents(); // Refresh
      } catch (e) {
          alert("Failed to delete");
      }
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">
                 {new Date(event.event_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
             <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
              <div className="text-xs text-gray-400 mt-1">
                 {new Date(event.event_time).toLocaleDateString()}
              </div>
             {(user?.role === 2 || user?.role === 1) && ( // 1=Admin, 2=Teacher
                  <button onClick={() => handleDelete(event.id)} className="text-red-500 text-xs mt-2 underline">Delete</button>
             )}
          </div>
        ))}
         {events.length === 0 && <p className="text-gray-500 text-center py-4">No upcoming events.</p>}
      </div>
    </div>
  );
};

export default EventList;
