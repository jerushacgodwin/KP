"use client";
import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = ({ attendance }: { attendance: { present: number, absent: number } | null }) => {
  // Default to 0 if no data
  const present = attendance?.present || 0;
  const absent = attendance?.absent || 0;
  const total = present + absent;
  
  // Calculate percentage for the chart (if total is 0, avoid NaN)
  const presentVal = total > 0 ? (present / total) * 10 : 0;
  const absentVal = total > 0 ? (absent / total) * 10 : 0;
    
  const data = [
    { name: "Group A", value: 10, fill: "#C3EBFA" }, // Background circle (full)
    { name: "Group B", value: presentVal, fill: "#FAE27C" }, // Present slice
  ];

  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Attendance (Month)</h1>
        <Image src="/moreDark.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">{present}</h1>
        <p className="text-xs text-gray-300">Days Present</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center text-gray-500">
         Total Present: <span className="text-green-600 font-bold">{present}</span> 
         <span className="mx-2">|</span>
         Total Absent: <span className="text-red-500 font-bold">{absent}</span>
      </h2>
    </div>
  );
};

export default Performance;
