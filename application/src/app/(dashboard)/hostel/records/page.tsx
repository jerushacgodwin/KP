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

type HostelFee = {
    HostelFeeId: number;
    ClassId: string;
    HostelFees: number;
    Year: string;
};

type Attendance = {
    id: number;
    student_id: number;
    student?: { name: string };
    attendance_date: string;
    status: string;
};

type Leave = {
    id: number;
    student_id: number;
    student?: { name: string };
    from_date: string;
    to_date: string;
    reason: string;
    status: string;
};

const HostelPage = () => {
    const [activeTab, setActiveTab] = useState("records"); // records, attendance, fees, leaves
    const [loading, setLoading] = useState(false);
    
    // Data States
    const [records, setRecords] = useState<HostelRecord[]>([]);
    const [fees, setFees] = useState<HostelFee[]>([]);
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [leaves, setLeaves] = useState<Leave[]>([]);
    const [students, setStudents] = useState<any[]>([]); // For dropdowns

    // Forms
    const [showForms, setShowForms] = useState(false);
    const [newRecord, setNewRecord] = useState({ StudentId: "", HostelTermNo: 1, HostelTermFee: 0, TermPaidDate: "", Year: "2025" });
    const [newAttendance, setNewAttendance] = useState({ student_id: "", attendance_date: new Date().toISOString().split('T')[0], status: "Present" });
    const [newLeave, setNewLeave] = useState({ student_id: "", from_date: "", to_date: "", reason: "", status: "Pending" });

    // Fetchers
    const fetchStudents = async () => {
         try {
             // Assuming a route exists to search students, or fetching filtered list. 
             // Using a general fetch for now, backend filtering might be needed for scale.
             const res:any = await apiFetch("/list/students?role=student", "GET"); 
             // Note: Depending on existing student API, this might need adjustment.
             if(res.result) setStudents(res.result);
             else if(res.data) setStudents(res.data); // Handle different response structures
         } catch(e) { console.error(e); }
    }

    const fetchRecords = async () => {
        setLoading(true);
        try { const res:any = await apiFetch("/hostel/records", "GET"); if (res.result) setRecords(res.result); } 
        catch (e) { console.error(e); } finally { setLoading(false); }
    };
    const fetchFees = async () => {
        setLoading(true);
        try { const res:any = await apiFetch("/hostel/fees", "GET"); if (res.result) setFees(res.result); } 
        catch (e) { console.error(e); } finally { setLoading(false); }
    };
    const fetchAttendance = async () => {
        setLoading(true);
        try { const res:any = await apiFetch("/hostel/attendance", "GET"); if (res.result) setAttendance(res.result); } 
        catch (e) { console.error(e); } finally { setLoading(false); }
    };
    const fetchLeaves = async () => {
        setLoading(true);
        try { const res:any = await apiFetch("/hostel/leaves", "GET"); if (res.result) setLeaves(res.result); } 
        catch (e) { console.error(e); } finally { setLoading(false); }
    };

    useEffect(() => {
        if(activeTab === "records") fetchRecords();
        if(activeTab === "fees") fetchFees();
        if(activeTab === "attendance") fetchAttendance();
        if(activeTab === "leaves") fetchLeaves();
        fetchStudents();
    }, [activeTab]);

    // Handlers
    const handleAddRecord = async (e:any) => {
        e.preventDefault();
        try { await apiFetch("/hostel/records", "POST", newRecord); alert("Added!"); setShowForms(false); fetchRecords(); } catch(e) { alert("Error"); }
    };
    const handleAddAttendance = async (e:any) => {
        e.preventDefault();
        try { await apiFetch("/hostel/attendance", "POST", newAttendance); alert("Marked!"); setShowForms(false); fetchAttendance(); } catch(e) { alert("Error"); }
    };
    const handleAddLeave = async (e:any) => {
        e.preventDefault();
        try { await apiFetch("/hostel/leaves", "POST", newLeave); alert("Requested!"); setShowForms(false); fetchLeaves(); } catch(e) { alert("Error"); }
    };

    // Columns
    const recordCols = [
        { header: "Student", accessor: "student" },
        { header: "Term No", accessor: "HostelTermNo" },
        { header: "Fee", accessor: "HostelTermFee" }, 
        { header: "Paid Date", accessor: "TermPaidDate", className: "hidden lg:table-cell" },
    ];
    const feeCols = [
        { header: "Class ID", accessor: "ClassId" },
        { header: "Amount", accessor: "HostelFees" },
        { header: "Year", accessor: "Year" },
    ];
    const attCols = [
         { header: "Student", accessor: "student" },
         { header: "Date", accessor: "attendance_date" },
         { header: "Status", accessor: "status" },
    ];
    const leaveCols = [
         { header: "Student", accessor: "student" },
         { header: "From", accessor: "from_date" },
         { header: "To", accessor: "to_date" },
         { header: "Status", accessor: "status" },
    ];

    const renderRecordRow = (item: HostelRecord) => (
        <tr key={item.HostelRecordId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.student?.name || "Student #" + item.StudentId}</td>
            <td>Term {item.HostelTermNo}</td>
            <td>${item.HostelTermFee}</td>
            <td className="hidden lg:table-cell">{item.TermPaidDate}</td>
        </tr>
    );
     const renderFeeRow = (item: HostelFee) => (
        <tr key={item.HostelFeeId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.ClassId}</td>
            <td>${item.HostelFees}</td>
            <td>{item.Year}</td>
        </tr>
    );
     const renderAttRow = (item: Attendance) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.student?.name || item.student_id}</td>
            <td>{item.attendance_date}</td>
            <td>
                <span className={`px-2 py-1 rounded text-xs text-white ${item.status === 'Present' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.status}
                </span>
            </td>
        </tr>
    );
    const renderLeaveRow = (item: Leave) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.student?.name || item.student_id}</td>
            <td>{item.from_date}</td>
            <td>{item.to_date}</td>
             <td>
                <span className={`px-2 py-1 rounded text-xs text-white ${item.status === 'Approved' ? 'bg-green-500' : item.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {item.status}
                </span>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* HERDER & TABS */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                <h1 className="text-lg font-semibold">Hostel Management</h1>
                <div className="flex bg-gray-100 p-1 rounded-md">
                    {["records", "fees", "attendance", "leaves"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setShowForms(false); }}
                            className={`px-4 py-2 text-sm capitalize rounded-md ${activeTab === tab ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTROLS */}
             <div className="flex items-center justify-between mb-4">
                 <TableSearch />
                 <div className="flex items-center gap-4">
                     {(role === "admin" || role === "teacher") && (
                         <button onClick={() => setShowForms(!showForms)} className="bg-lamaYellow text-black px-4 py-2 rounded-md text-xs font-semibold">
                            + Add {activeTab === 'records' ? 'Student' : activeTab === 'leaves' ? 'Leave' : activeTab === 'attendance' ? 'Attendance' : ''}
                         </button>
                     )}
                     <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/filter.png" alt="" width={14} height={14} />
                    </button>
                 </div>
             </div>

             {/* FORMS */}
             {showForms && (
                 <div className="bg-lamaSkyLight p-4 rounded-md mb-4">
                     {activeTab === 'records' && (
                         <form onSubmit={handleAddRecord} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <select className="p-2 rounded" required onChange={e=>setNewRecord({...newRecord, StudentId: e.target.value})}>
                                 <option value="">Select Student</option>
                                 {students.map((s:any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                             </select>
                             <input type="number" placeholder="Term No" className="p-2 rounded" onChange={e=>setNewRecord({...newRecord, HostelTermNo: parseInt(e.target.value)})} />
                             <input type="number" placeholder="Fee Amount" className="p-2 rounded" onChange={e=>setNewRecord({...newRecord, HostelTermFee: parseFloat(e.target.value)})} />
                             <input type="date" className="p-2 rounded" required onChange={e=>setNewRecord({...newRecord, TermPaidDate: e.target.value})} />
                             <button className="bg-blue-500 text-white p-2 rounded col-span-2">Add to Hostel</button>
                         </form>
                     )}
                     {activeTab === 'attendance' && (
                         <form onSubmit={handleAddAttendance} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <select className="p-2 rounded" required onChange={e=>setNewAttendance({...newAttendance, student_id: e.target.value})}>
                                 <option value="">Select Student</option>
                                 {students.map((s:any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                             </select>
                             <input type="date" className="p-2 rounded" value={newAttendance.attendance_date} onChange={e=>setNewAttendance({...newAttendance, attendance_date: e.target.value})} />
                             <select className="p-2 rounded" onChange={e=>setNewAttendance({...newAttendance, status: e.target.value})}>
                                 <option value="Present">Present</option>
                                 <option value="Absent">Absent</option>
                                 <option value="Late">Late</option>
                             </select>
                             <button className="bg-blue-500 text-white p-2 rounded col-span-2">Mark Attendance</button>
                         </form>
                     )}
                      {activeTab === 'leaves' && (
                         <form onSubmit={handleAddLeave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <select className="p-2 rounded" required onChange={e=>setNewLeave({...newLeave, student_id: e.target.value})}>
                                 <option value="">Select Student</option>
                                 {students.map((s:any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                             </select>
                             <div className="flex gap-2">
                                <input type="date" placeholder="From" className="p-2 rounded w-full" required onChange={e=>setNewLeave({...newLeave, from_date: e.target.value})} />
                                <input type="date" placeholder="To" className="p-2 rounded w-full" required onChange={e=>setNewLeave({...newLeave, to_date: e.target.value})} />
                             </div>
                             <input type="text" placeholder="Reason" className="p-2 rounded col-span-2" onChange={e=>setNewLeave({...newLeave, reason: e.target.value})} />
                             <button className="bg-blue-500 text-white p-2 rounded col-span-2">Request Leave</button>
                         </form>
                     )}
                 </div>
             )}

            {/* TABLES */}
            {loading ? <div>Loading...</div> : (
                <>
                    {activeTab === 'records' && <Table columns={recordCols} renderRow={renderRecordRow} data={records} />}
                    {activeTab === 'fees' && <Table columns={feeCols} renderRow={renderFeeRow} data={fees} />}
                    {activeTab === 'attendance' && <Table columns={attCols} renderRow={renderAttRow} data={attendance} />}
                    {activeTab === 'leaves' && <Table columns={leaveCols} renderRow={renderLeaveRow} data={leaves} />}
                    <Pagination />
                </>
            )}
        </div>
    );
};

export default HostelPage;
