'use client';

import Timetable from "@src/components/TimeTable";
import EventCalendar from "@src/components/EventCalendar";
import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie"
import { useEffect,useState } from "react";
import { weekdays } from "@src/lib/utility";
 const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const StudentPage = () => {
  //const user = useUser();
  const [userTimeTable, setUserTimeTable] = useState<any[]>([])
  const userString = Cookies.get("log-user");

    useEffect(() => {
    async function fetchData() {
      try {
           let user = null;
          if (userString) {
            user = JSON.parse(userString);
          }
        const [timetable, attendance] = await Promise.all([
    apiFetch(`${apiUrl}/student/timetble`, 'POST', { email: user?.email }),
     apiFetch(`${apiUrl}/student/attendance`, 'POST', { email: user?.email }),
  ]);
        //console.log(timetable)
        const timetableRes = timetable as any;
        if (timetableRes) {
         setUserTimeTable(timetableRes.timetable || []);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }

    fetchData();
    }, []);
  if (userTimeTable.length) {
   //console.log(userTimeTable, 'userTimeTable')
 const timeSlots = [...new Set(userTimeTable.map((item) => (item.time)))];
  //console.log(timeSlots)
//console.log(events)
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule ({userTimeTable[0]?.class})</h1>
          <Timetable data={userTimeTable}  weekdays={weekdays} timeSlots={timeSlots}/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
 <EventCalendar />

      </div>
    </div>
  );
}
};

export default StudentPage;
