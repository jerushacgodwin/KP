"use client";

import FormModal from "@src/components/FormModal";
import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import { role } from "@src/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type LeaveRequest = {
  id: number;
  employee_id: number;
  employee: {
    name: string;
    designation: string;
  };
  type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
};

const columns = [
  {
    header: "Employee",
    accessor: "employee",
  },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Period",
    accessor: "period",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const LeaveListPage = () => {
    const [data, setData] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res:any = await apiFetch("/hr/leaves", "GET");
            if (res.result) {
                setData(res.result);
            }
        } catch (error) {
            console.error("Failed to fetch leaves", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            await apiFetch(`/hr/leaves/${id}`, "PATCH", { status });
            fetchData();
        } catch (error) {
            console.error("Failed to update leave status", error);
        }
    };

    const renderRow = (item: LeaveRequest) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.employee?.name || "Unknown"}</h3>
                    <p className="text-xs text-gray-500">{item.employee?.designation}</p>
                </div>
            </td>
            <td>{item.type}</td>
            <td className="hidden md:table-cell">
                {item.start_date} to {item.end_date}
            </td>
            <td className="hidden lg:table-cell">
                <span className={`px-2 py-1 rounded-md text-xs ${
                    item.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    item.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                    'bg-yellow-100 text-yellow-700'
                }`}>
                    {item.status}
                </span>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {item.status === 'pending' && (
                        <>
                            <button 
                                onClick={() => handleUpdateStatus(item.id, 'approved')}
                                className="px-2 py-1 bg-lamaSky text-white rounded-md text-xs"
                            >
                                Approve
                            </button>
                            <button 
                                onClick={() => handleUpdateStatus(item.id, 'rejected')}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs"
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    if (loading) {
        return <div className="p-4 bg-white rounded-md m-4">Loading leave requests...</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Leave Requests</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default LeaveListPage;
