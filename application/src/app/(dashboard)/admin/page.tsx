'use client';

import AttendanceChart from "@src/components/AttendanceChart";
import CountChart from "@src/components/CountChart";
import EventCalendar from "@src/components/EventCalendar";
import FinanceChart from "@src/components/FinanceChart";
import UserCard from "@src/components/UserCard";

import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";
const AdminPage = () => {
  const [dailyAttendance, setDailyAttendance] = useState<any>(null);
  const [monthlyAttendance, setMonthlyAttendance] = useState<any>(null);
  const [financeData, setFinanceData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, monthlyRes, financeRes] = await Promise.all([
          apiFetch("http://localhost:4000/attendance/daily"),
          apiFetch("http://localhost:4000/attendance/monthly"),
          apiFetch("http://localhost:4000/finance/year"),
        ]) as [any, any, any];

        if (dailyRes.result) setDailyAttendance(dailyRes.result);
        if (monthlyRes.result) setMonthlyAttendance(monthlyRes.result);
        if (financeRes.data) setFinanceData(financeRes.data); 
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        {/* <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div> */}
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart type="Attendance" data={dailyAttendance} />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart title="Monthly Attendance" data={monthlyAttendance} />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart title="Financial Overview" data={financeData} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
         <EventCalendar />
      </div>
    </div>
  );
};

export default AdminPage;
// import withRole from '@src/components/CheckRole';

// console.log('checkRole is:', withRole);

// const AdminPage = () => <div>Hello Admin</div>;

// const Wrapped = withRole(AdminPage, ['admin']);

// export default Wrapped;