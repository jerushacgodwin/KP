"use client";

import FormModal from "@src/components/FormModal";
import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import { role } from "@src/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type Class = {
  id: number;
  name: string;
  class_id?: number;
  capacity?: number;
  grade?: number;
  supervisor?: string;
  class_teacher?: string; 
};

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor", // API might need to return this or we map it
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ClassListPage = () => {
    const [data, setData] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res:any = await apiFetch("/class/", "GET");
            // console.log("Classes Fetched:", res);
             if(res.result) {
                 setData(res.result);
             }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  const renderRow = (item: any) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity || 20}</td>
      <td className="hidden md:table-cell">{item.grade || item.name.charAt(0)}</td>
      <td className="hidden md:table-cell">{item.supervisor || item.class_teacher || "N/A"}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  if (loading) {
      return <div className="p-4 bg-white rounded-md m-4">Loading classes...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="class" type="create" />}
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

export default ClassListPage;
