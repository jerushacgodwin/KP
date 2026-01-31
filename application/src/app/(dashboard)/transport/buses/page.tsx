"use client";

import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type Bus = {
  s_no: number;
  bus_id: string;
  bus_title: string;
  bus_number: string;
  roots?: {
    location: string;
    arrival_time: string;
  }[];
  staff?: {
    name: string;
    contact: string;
    role: string;
  }[];
};

const columns = [
  {
    header: "Bus Title",
    accessor: "bus_title",
  },
  {
    header: "Bus Number",
    accessor: "bus_number",
  },
  {
    header: "Routes/Locations",
    accessor: "roots",
    className: "hidden md:table-cell",
  },
  {
    header: "Staff",
    accessor: "staff",
    className: "hidden lg:table-cell",
  },
];

const TransportPage = () => {
    const [data, setData] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res:any = await apiFetch("/transport/buses", "GET");
            if (res.result) {
                setData(res.result);
            }
        } catch (error) {
            console.error("Failed to fetch buses", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderRow = (item: Bus) => (
        <tr
            key={item.s_no}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4 font-semibold">{item.bus_title}</td>
            <td>{item.bus_number}</td>
            <td className="hidden md:table-cell">
                <div className="flex flex-col gap-1">
                    {item.roots?.slice(0, 2).map((r, i) => (
                        <span key={i} className="text-xs text-gray-500">{r.location} ({r.arrival_time})</span>
                    ))}
                    {item.roots && item.roots.length > 2 && <span className="text-xs text-blue-500">+{item.roots.length - 2} more</span>}
                </div>
            </td>
            <td className="hidden lg:table-cell">
                <div className="flex flex-col gap-1">
                    {item.staff?.map((s, i) => (
                        <span key={i} className="text-xs">{s.name} ({s.role})</span>
                    ))}
                </div>
            </td>
        </tr>
    );

    if (loading) {
        return <div className="p-4 bg-white rounded-md m-4">Loading transport data...</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">School Fleet (Buses)</h1>
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

export default TransportPage;
