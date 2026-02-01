"use client";

import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type Bus = {
  bus_id: string;
  bus_title: string;
  bus_number: string;
  request: string;
  roots?: BusRoot[];
};

type BusRoot = {
    s_no: number;
    bus_id: string;
    location: string;
    arrival_time: string;
    serial: number;
};

type TransportStudent = {
    id: number;
    student_id: number;
    student?: { name: string };
    bus_id: string;
    root_id: number;
    root?: { location: string, arrival_time: string };
    status: string;
};



const TransportPage = () => {
    const [activeTab, setActiveTab] = useState("buses"); // buses, stops, students
    const [loading, setLoading] = useState(false);
    
    // Data States
    const [buses, setBuses] = useState<Bus[]>([]);
    const [transportStudents, setTransportStudents] = useState<TransportStudent[]>([]);
    const [students, setStudents] = useState<any[]>([]); // For dropdowns

    // Forms
    const [showForms, setShowForms] = useState(false);
    const [newBus, setNewBus] = useState({ bus_id: "", bus_title: "", bus_number: "", request: "Active" });
    const [newStop, setNewStop] = useState({ bus_id: "", location: "", arrival_time: "", serial: 1 });
    const [newStudent, setNewStudent] = useState({ student_id: "", bus_id: "", root_id: "", status: "Active" });

    // Fetchers
    const fetchStudents = async () => {
         try {
             const res:any = await apiFetch("/list/students?role=student", "GET"); 
             if(res.result) setStudents(res.result);
             else if(res.data) setStudents(res.data); 
         } catch(e) { console.error(e); }
    }

    const fetchBuses = async () => {
        setLoading(true);
        try { const res:any = await apiFetch("/transport/buses", "GET"); if (res.result) setBuses(res.result); } 
        catch (e) { console.error(e); } finally { setLoading(false); }
    };
    
    const fetchTransportStudents = async () => {
        setLoading(true);
        try { const res:any = await apiFetch("/transport/students", "GET"); if (res.result) setTransportStudents(res.result); } 
        catch (e) { console.error(e); } finally { setLoading(false); }
    };


    useEffect(() => {
        fetchBuses(); // Always get buses for dropdowns and stops list
        fetchStudents();
        if(activeTab === "students") fetchTransportStudents();
    }, [activeTab]);

    // Handlers
    const handleAddBus = async (e:any) => {
        e.preventDefault();
        try { await apiFetch("/transport/buses", "POST", newBus); alert("Bus Added!"); setShowForms(false); fetchBuses(); } catch(e) { alert("Error"); }
    };
    const handleAddStop = async (e:any) => {
        e.preventDefault();
        try { await apiFetch("/transport/roots", "POST", newStop); alert("Stop Added!"); setShowForms(false); fetchBuses(); } catch(e) { alert("Error"); }
    };
    const handleAddStudent = async (e:any) => {
        e.preventDefault();
        try { await apiFetch("/transport/students", "POST", newStudent); alert("Student Added!"); setShowForms(false); fetchTransportStudents(); } catch(e) { alert("Error"); }
    };

    // Derived Data
    const allStops = buses.flatMap(b => b.roots?.map(r => ({...r, bus_title: b.bus_title, bus_number: b.bus_number})) || []);

    // Columns
    const busCols = [
        { header: "Bus ID", accessor: "bus_id" },
        { header: "Title", accessor: "bus_title" },
        { header: "Number", accessor: "bus_number" }, 
        { header: "Stops", accessor: "roots", className: "hidden lg:table-cell" },
    ];

    const stopCols = [
        { header: "Bus", accessor: "bus_title" },
        { header: "Location", accessor: "location" },
        { header: "Time", accessor: "arrival_time" },
        { header: "Serial", accessor: "serial", className: "hidden md:table-cell" },
    ];
    
    const studentCols = [
         { header: "Student", accessor: "student" },
         { header: "Bus", accessor: "bus_id" },
         { header: "Stop", accessor: "root" },
         { header: "Status", accessor: "status" },
    ];

    const renderBusRow = (item: Bus) => (
        <tr key={item.bus_id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.bus_id}</td>
            <td>{item.bus_title}</td>
            <td>{item.bus_number}</td>
            <td className="hidden lg:table-cell text-xs text-gray-500">
                {item.roots?.map(r => r.location).join(", ") || "No Stops"}
            </td>
        </tr>
    );

    const renderStopRow = (item: any) => (
        <tr key={item.s_no} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.bus_title} ({item.bus_number})</td>
            <td>{item.location}</td>
            <td>{item.arrival_time}</td>
            <td className="hidden md:table-cell">{item.serial}</td>
        </tr>
    );
  
    const renderStudentRow = (item: TransportStudent) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="p-4">{item.student?.name || item.student_id}</td>
            <td>{item.bus_id}</td>
            <td>{item.root?.location || item.root_id} ({item.root?.arrival_time})</td>
            <td>
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">{item.status}</span>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* HERDER & TABS */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                <h1 className="text-lg font-semibold">Transport Management</h1>
                <div className="flex bg-gray-100 p-1 rounded-md">
                    {["buses", "stops", "students"].map((tab) => (
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
                     {activeTab === 'buses' && (
                         <div className="flex gap-2">
                             <button onClick={() => { setActiveTab("buses"); setShowForms(!showForms); }} className="bg-lamaYellow text-black px-4 py-2 rounded-md text-xs font-semibold">
                                + Add Bus
                             </button>
                         </div>
                     )}
                      {activeTab === 'stops' && (
                         <div className="flex gap-2">
                              <button onClick={() => { setActiveTab("stops"); setShowForms(!showForms); }} className="bg-lamaPurple text-white px-4 py-2 rounded-md text-xs font-semibold">
                                + Add Stop
                             </button>
                         </div>
                     )}
                     {activeTab === 'students' && (
                         <button onClick={() => setShowForms(!showForms)} className="bg-lamaYellow text-black px-4 py-2 rounded-md text-xs font-semibold">
                            + Add Student
                         </button>
                     )}
                 </div>
             </div>

             {/* FORMS */}
             {showForms && (
                 <div className="bg-lamaSkyLight p-4 rounded-md mb-4">
                     {(activeTab === 'buses') && (
                         <form onSubmit={handleAddBus} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <input placeholder="Bus ID" className="p-2 rounded" required onChange={e=>setNewBus({...newBus, bus_id: e.target.value})} />
                             <input placeholder="Bus Title" className="p-2 rounded" required onChange={e=>setNewBus({...newBus, bus_title: e.target.value})} />
                             <input placeholder="Bus Number" className="p-2 rounded" required onChange={e=>setNewBus({...newBus, bus_number: e.target.value})} />
                             <button className="bg-blue-500 text-white p-2 rounded col-span-2">Save Bus</button>
                         </form>
                     )}
                     {(activeTab === 'stops') && (
                          <div className="bg-lamaPurpleLight p-4 rounded-md"> 
                            <h3 className="font-bold mb-2">Add New Stop (Route Point)</h3>
                             <form onSubmit={handleAddStop} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <select className="p-2 rounded" required onChange={e=>setNewStop({...newStop, bus_id: e.target.value})}>
                                     <option value="">Select Bus</option>
                                     {buses.map(b => <option key={b.bus_id} value={b.bus_id}>{b.bus_title} ({b.bus_number})</option>)}
                                 </select>
                                 <input placeholder="Stop Location" className="p-2 rounded" required onChange={e=>setNewStop({...newStop, location: e.target.value})} />
                                 <input placeholder="Arrival Time (e.g., 8:00 AM)" className="p-2 rounded" required onChange={e=>setNewStop({...newStop, arrival_time: e.target.value})} />
                                 <input type="number" placeholder="Serial No" className="p-2 rounded" onChange={e=>setNewStop({...newStop, serial: parseInt(e.target.value)})} />
                                 <button className="bg-blue-500 text-white p-2 rounded col-span-2">Save Stop</button>
                             </form>
                         </div>
                     )}
                     {activeTab === 'students' && (
                         <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <select className="p-2 rounded" required onChange={e=>setNewStudent({...newStudent, student_id: e.target.value})}>
                                 <option value="">Select Student</option>
                                 {students.map((s:any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                             </select>
                             <select className="p-2 rounded" required onChange={e=>{
                                 setNewStudent({...newStudent, bus_id: e.target.value});
                                 // Clear root choice if bus changes?
                             }}>
                                 <option value="">Select Bus</option>
                                 {buses.map(b => <option key={b.bus_id} value={b.bus_id}>{b.bus_title}</option>)}
                             </select>
                              <select className="p-2 rounded" required onChange={e=>setNewStudent({...newStudent, root_id: parseInt(e.target.value)})}>
                                 <option value="">Select Drop Stop</option>
                                 {/* Only show roots for selected bus if possible. Simple filter: */}
                                 {buses.find(b => b.bus_id === newStudent.bus_id)?.roots?.map(r => (
                                     <option key={r.s_no} value={r.s_no}>{r.location} - {r.arrival_time}</option>
                                 ))}
                             </select>
                             <button className="bg-blue-500 text-white p-2 rounded col-span-2">Assign to Transport</button>
                         </form>
                     )}
                 </div>
             )}

            {/* TABLES */}
            {loading ? <div>Loading...</div> : (
                <>
                    {activeTab === 'buses' && <Table columns={busCols} renderRow={renderBusRow} data={buses} />}
                    {activeTab === 'stops' && <Table columns={stopCols} renderRow={renderStopRow} data={allStops} />}
                    {activeTab === 'students' && <Table columns={studentCols} renderRow={renderStudentRow} data={transportStudents} />}
                    <Pagination />
                </>
            )}
        </div>
    );
};

export default TransportPage;
