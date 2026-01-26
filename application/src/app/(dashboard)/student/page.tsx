'use client';

import Timetable from "@src/components/TimeTable";
import EventCalendar from "@src/components/EventCalendar";
import Performance from "@src/components/Performance";
import { apiFetch } from "@src/lib/api";
import Link from "next/link";
import Cookies from "js-cookie"
import { useEffect,useState } from "react";
import { weekdays } from "@src/lib/utility";
 const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const StudentPage = () => {
  //const user = useUser();
  const [userTimeTable, setUserTimeTable] = useState<any[]>([])
  const [attendanceData, setAttendanceData] = useState<any>(null); // State for attendance
  const userString = Cookies.get("log-user");

    useEffect(() => {
    async function fetchData() {
      try {
           let user = null;
          if (userString) {
            user = JSON.parse(userString);
          }
        const [timetableResult, attendanceResult] = await Promise.allSettled([
          apiFetch(`${apiUrl}/student/timetble`, 'POST', { email: user?.email, user_id: user?.user_id }),
          apiFetch(`${apiUrl}/student/get-attendance`, 'POST', { email: user?.email, user_id: user?.user_id }),
        ]);

        if (timetableResult.status === 'fulfilled') {
          const timetableRes = timetableResult.value as any;
          if (timetableRes) {
             console.log("Timetable loaded:", timetableRes.timetable?.length);
             setUserTimeTable(timetableRes.timetable || []);
          }
        } else {
            console.error("Timetable fetch failed:", timetableResult.reason);
        }

        if (attendanceResult.status === 'fulfilled') {
             const attendanceRes = attendanceResult.value as any;
             console.log("Attendance loaded:", attendanceRes);
             setAttendanceData(attendanceRes.result); // Store attendance result
        } else {
             console.error("Attendance fetch failed:", attendanceResult.reason);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }

    fetchData();
    }, []);
  // Calculate timeslots or empty array
  const timeSlots = userTimeTable.length ? [...new Set(userTimeTable.map((item) => (item.time)))] : [];

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="h-full bg-white p-4 rounded-md">
           <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Schedule ({userTimeTable[0]?.class || 'No Class'})</h1>
              <Link href="/student/lessons" className="bg-lamaSky text-white px-4 py-2 rounded-md text-sm hover:bg-black">
                 View My Lessons
              </Link>
           </div>
           {userTimeTable.length > 0 ? (
              <Timetable data={userTimeTable}  weekdays={weekdays} timeSlots={timeSlots}/>
           ) : (
               <p className="text-gray-500 text-center py-10">No timetable found for your class.</p>
           )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
         <Performance attendance={attendanceData} />
         <EventCalendar />
      </div>
    </div>
  );
};

export default StudentPage;
