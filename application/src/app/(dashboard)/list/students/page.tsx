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
import Cookies from "js-cookie";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "user_id", // Changed from studentId to match backend
    className: "hidden md:table-cell",
  },
  {
    header: "Class", // Backend returns class name
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone_no", // Changed from phone
    className: "hidden lg:table-cell",
  },
  {
    header: "Email", // Address is not always available, showing email
    accessor: "email",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentListPage = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    try {
        const userCookie = Cookies.get("log-user");
        if(userCookie) {
            const user = JSON.parse(userCookie);
            const res:any = await apiFetch("/student/getAllStudents/", "POST", {
                school_id: user.school_id,
                page: 1,
                size: 10
            });
            // console.log("Students Fetched:", res);
             if(res.result && res.result.data) {
                // Map backend fields to frontend expected fields if necessary
                 const mapped = res.result.data.map((s: any) => ({
                    ...s,
                    photo: s.photo || "/avatar.png", // Fallback photo
                    class: s.class || "N/A"
                 }));
                 setData(mapped);
             }
        }
    } catch (error) {
        console.error("Failed to fetch students", error);
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
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.user_id}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.phone_no}</td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

  if (loading) {
      return <div className="p-4 bg-white rounded-md m-4">Loading students...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
              <FormModal table="student" type="create"/>
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

export default StudentListPage;
