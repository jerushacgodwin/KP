"use client";

import CountChart from "@src/components/CountChart";
import AttendanceChart from "@src/components/AttendanceChart";
import FinanceChart from "@src/components/FinanceChart";

const HRDashboardPage = () => {
  // Dummy Data
  const todayAttendanceData = {
    present: 120,
    absent: 15,
  };

  const monthAttendanceData = [
    { name: "Mon", present: 60, absent: 40 },
    { name: "Tue", present: 70, absent: 60 },
    { name: "Wed", present: 90, absent: 75 },
    { name: "Thu", present: 90, absent: 75 },
    { name: "Fri", present: 65, absent: 55 },
  ];

  const feesData = [
    { name: "Jan", income: 4000, expense: 2400 },
    { name: "Feb", income: 3000, expense: 1398 },
    { name: "Mar", income: 2000, expense: 9800 },
    { name: "Apr", income: 2780, expense: 3908 },
    { name: "May", income: 1890, expense: 4800 },
    { name: "Jun", income: 2390, expense: 3800 },
    { name: "Jul", income: 3490, expense: 4300 },
    { name: "Aug", income: 3490, expense: 4300 },
    { name: "Sep", income: 3490, expense: 4300 },
    { name: "Oct", income: 3490, expense: 4300 },
    { name: "Nov", income: 3490, expense: 4300 },
    { name: "Dec", income: 3490, expense: 4300 },
  ];

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
                    <p className="text-sm text-gray-400 mt-1">Effective immediately, the new leave policy is in effect. Please review the HR handbook.</p>
                </div>
                <div className="bg-lamaPurpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Holiday Schedule</h3>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-15</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">The office will be closed for the upcoming national holiday.</p>
                </div>
                 <div className="bg-lamaYellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Staff Meeting</h3>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-20</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Mandatory all-hands meeting in the main conference room.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardPage;
