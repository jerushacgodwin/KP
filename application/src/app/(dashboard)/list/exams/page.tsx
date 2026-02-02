import FormModal from "@src/components/FormModal";
import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import { role } from "@src/lib/data";
import { apiFetch } from "@src/lib/api";
import Image from "next/image";
import Link from "next/link";

type Exam = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  subject_id: number;
  class_id: number;
  teacher_id: number;
}; // Matching backend model structure primarily, though UI needs names. 
// For now, I will display IDs or raw data, OR I should ideally update the backend to Include names. 
// Given the prompt "REMOVE DUMMY DATA", valid API data is priority.

const columns = [
  {
    header: "Exam Title",
    accessor: "title",
  },
  {
    header: "Start Time",
    accessor: "start_time", 
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "end_time",
    className: "hidden md:table-cell",
  },
  {
    header: "Subject ID",
    accessor: "subject_id",
    className: "hidden md:table-cell",
  },
  {
    header: "Class ID",
    accessor: "class_id",
     className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ExamListPage = async () => {
    
  let data: Exam[] = [];
  try {
      const res: any = await apiFetch("/exams");
      if (res?.result) {
          data = res.result;
      }
  } catch (e) {
      console.error(e);
  }

  const renderRow = (item: Exam) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td className="hidden md:table-cell">{new Date(item.start_time).toLocaleString()}</td>
      <td className="hidden md:table-cell">{new Date(item.end_time).toLocaleString()}</td>
      <td className="hidden md:table-cell">{item.subject_id}</td>
      <td className="hidden md:table-cell">{item.class_id}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" || role === "teacher" ? (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
            </>
          ) : (
            <></>
          )} 
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Exams
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" && (
              <FormModal table="exam" type="create" />
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

export default ExamListPage;
