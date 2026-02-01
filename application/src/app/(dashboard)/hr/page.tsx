"use client";

import CountChart from "@src/components/CountChart";
import AttendanceChart from "@src/components/AttendanceChart";
import FinanceChart from "@src/components/FinanceChart";

import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

const HRDashboardPage = () => {
  const [todayAttendanceData, setTodayAttendanceData] = useState<any>(null);
  const [monthAttendanceData, setMonthAttendanceData] = useState<any>(null);
  const [feesData, setFeesData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, monthlyRes, financeRes] = await Promise.all([
          apiFetch("http://localhost:4000/attendance/staff/daily"),
          apiFetch("http://localhost:4000/attendance/staff/monthly"),
          apiFetch("http://localhost:4000/finance/year"),
        ]) as [any, any, any];

        if (dailyRes.result) setTodayAttendanceData(dailyRes.result);
        if (monthlyRes.result) setMonthAttendanceData(monthlyRes.result);
        if (financeRes.data) setFeesData(financeRes.data);
      } catch (error) {
        console.error("Error fetching HR dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* TODAY'S ATTENDANCE */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart type="Today's Attendance" data={todayAttendanceData} />
          </div>
          {/* THIS MONTH ATTENDANCE */}
          <div className="w-full lg:w-2/3 h-[450px]">
             {/* Using mocked data structure matching API plan */}
            <AttendanceChart title="This Month Attendance" data={monthAttendanceData} />
          </div>
        </div>
        {/* FEES GRAPH */}
        <div className="w-full h-[500px]">
          <FinanceChart title="Fees Graph" data={feesData} />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-semibold">HR Announcements</h2>
            <div className="mt-4 flex flex-col gap-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">New Policy Update</h3>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardPage;
