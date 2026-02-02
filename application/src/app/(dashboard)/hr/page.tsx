import CountChart from "@src/components/CountChart";
import AttendanceChart from "@src/components/AttendanceChart";
import FinanceChart from "@src/components/FinanceChart";
import { apiFetch } from "@src/lib/api";

const HRDashboardPage = async () => {
  let todayAttendanceData = { present: 0, absent: 0 };
  let monthAttendanceData = [];
  let feesData = [];

  try {
    // 1. Fetch Daily Staff Attendance
    // Expected: [{ name: "Total", count: X }, { name: "Present", count: Y }, { name: "Absent", count: Z }]
    const dailyRes: any = await apiFetch("/attendance/staff/daily");
    if (dailyRes?.result) {
      const presentItem = dailyRes.result.find((i: any) => i.name === "Present");
      const absentItem = dailyRes.result.find((i: any) => i.name === "Absent");
      todayAttendanceData = {
        present: presentItem?.count || 0,
        absent: absentItem?.count || 0,
      };
    }

    // 2. Fetch Monthly Staff Attendance
    // Expected: [{ name: "1", present: X, absent: Y }, ...]
    const monthlyRes: any = await apiFetch("/attendance/staff/monthly");
    if (monthlyRes?.result) {
      monthAttendanceData = monthlyRes.result;
    }

    // 3. Fetch Finance Data
    // Expected: [{ name: "Jan", income: X, expense: Y }, ...]
    const financeRes: any = await apiFetch("/finance/year");
    if (financeRes?.data) {
      feesData = financeRes.data;
    }

  } catch (err) {
    console.error("Error fetching HR Dashboard data:", err);
    // Fallback to empty/zeros is automatic via initializers
  }

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
                <p className="text-gray-500 text-sm">No announcements available (API pending).</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardPage;
