"use client";

import FormModal from "@src/components/FormModal";
import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import { role } from "@src/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type Teacher = {
  id: number;
  user_id: string; // Changed to match backend
  name: string;
  email?: string;
  photo: string;
  phone_no: string; // Changed to match backend
  specialized_in: string; // Changed to match backend
  designation: string;
  address: string;
  subjects?: string[]; // Frontend expectation
  classes?: string[]; // Frontend expectation
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "user_id",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "specialized_in", // Using backend field
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "designation", // Mapping designation here as placeholder
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone_no",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StaffListPage = () => {
    const [data, setData] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res:any = await apiFetch("/teacher/getAllStaff", "POST", {
                page: 1,
                size: 10
            });
             if(res.result && res.result.data) {
                 const mapped = res.result.data.map((t: any) => ({
                    ...t,
                    photo: t.photo || "/avatar.png",
                    subjects: t.specialized_in ? [t.specialized_in] : [],
                    classes: [] // No classes data yet
                 }));
                 setData(mapped);
             }
        } catch (error) {
            console.error("Failed to fetch teachers", error);
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
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo || "/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.user_id}</td>
      <td className="hidden md:table-cell">{item.specialized_in}</td>
      <td className="hidden md:table-cell">{item.designation}</td>
      <td className="hidden md:table-cell">{item.phone_no}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/staff/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="teacher" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );
  
  if (loading) {
      return <div className="p-4 bg-white rounded-md m-4">Loading staff...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Staff</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="teacher" type="create"/>
            )}
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

export default StaffListPage;
