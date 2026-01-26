'use client';

import Timetable from "@src/components/TimeTable";
import EventCalendar from "@src/components/EventCalendar";
import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie"
import { useEffect,useState } from "react";
import { weekdays } from "@src/lib/utility";

 const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TeacherPage = () => {
  const [userTimeTable, setUserTimeTable] = useState<any[]>([])
  // const [events, setEvents] = useState<any[]>([]) // Events handled by component now
  const userString = Cookies.get("log-user");

  useEffect(() => {
    async function fetchData() {
      try {
        let user = null;
        if (userString) {
          user = JSON.parse(userString);
        }
        
        // Fetch Timetable (Teacher)
        const [timetableResult] = await Promise.allSettled([
          apiFetch(`${apiUrl}/teacher/timetble`, 'POST', { email: user?.email, user_id: user?.user_id }),
          // Events are self-fetched by EventCalendar
        ]);

        if (timetableResult.status === 'fulfilled') {
          const timetableRes = timetableResult.value as any;
          if (timetableRes) {
            setUserTimeTable(timetableRes.timetable || []);
          }
        } else {
             console.error("Teacher timetable fetch failed:", timetableResult.reason);
        }

      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }

    fetchData();
  }, []);

  const timeSlots = [...new Set(userTimeTable.map((item) => (item.time)))];

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          {userTimeTable.length > 0 ? (
               <Timetable data={userTimeTable} weekdays={weekdays} timeSlots={timeSlots}/>
          ) : (
               <p className="text-gray-500 text-center py-10">No timetable found.</p>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
          <EventCalendar />
      </div>
    </div>
  );
};

export default TeacherPage;
