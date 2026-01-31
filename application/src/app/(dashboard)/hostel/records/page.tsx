"use client";

import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import { role } from "@src/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type HostelRecord = {
  HostelRecordId: number;
  StudentId: number;
  student?: {
    name: string;
  };
  HostelTermNo: number;
  HostelTermFee: number;
  TermPaidDate: string;
  Year: string;
};

const columns = [
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Term No",
    accessor: "HostelTermNo",
  },
  {
    header: "Fee",
    accessor: "HostelTermFee",
    className: "hidden md:table-cell",
  },
  {
    header: "Paid Date",
    accessor: "TermPaidDate",
    className: "hidden lg:table-cell",
  },
  {
    header: "Year",
    accessor: "Year",
    className: "hidden lg:table-cell",
  },
];

const HostelPage = () => {
    const [data, setData] = useState<HostelRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res:any = await apiFetch("/hostel/records", "GET");
            if (res.result) {
                setData(res.result);
            }
        } catch (error) {
            console.error("Failed to fetch hostel records", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderRow = (item: HostelRecord) => (
        <tr
            key={item.HostelRecordId}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4 flex items-center gap-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.student?.name || "Student #" + item.StudentId}</h3>
                </div>
            </td>
            <td>Term {item.HostelTermNo}</td>
            <td className="hidden md:table-cell">${item.HostelTermFee}</td>
            <td className="hidden lg:table-cell">{item.TermPaidDate}</td>
            <td className="hidden lg:table-cell">{item.Year}</td>
        </tr>
    );

    if (loading) {
        return <div className="p-4 bg-white rounded-md m-4">Loading hostel records...</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Hostel Management</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
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

export default HostelPage;
