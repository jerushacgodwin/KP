"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({ type = "Students", data }: { type?: string, data?: any }) => {
  const chartData = data && data.length > 0 ? data : [];
  
  // Dynamic label logic
  // If data has "Present" and "Absent", use those. Else defaults.
  const isAttendance = chartData.some((d: any) => d.name === "Present" || d.name === "Absent");
  
  const value1 = isAttendance 
    ? chartData.find((d:any) => d.name === "Present")?.count || 0 
    : chartData.find((d:any) => d.name === "Boys")?.count || 0;
    
  const label1 = isAttendance ? "Present" : "Boys (55%)";
  
  const value2 = isAttendance 
    ? chartData.find((d:any) => d.name === "Absent")?.count || 0 
    : chartData.find((d:any) => d.name === "Girls")?.count || 0;
    
  const label2 = isAttendance ? "Absent" : "Girls (45%)";

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{type}</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={chartData}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{value1}</h1>
          <h2 className="text-xs text-gray-300">{label1}</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{value2}</h1>
          <h2 className="text-xs text-gray-300">{label2}</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
