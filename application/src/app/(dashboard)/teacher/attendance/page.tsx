'use client';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userString = Cookies.get("log-user");

export default function AttendanceAdvancedTable() {
  const dt = useRef(null);
  const toast = useRef(null);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({ student_name: '', status: '', dateRange: [null, null] });
  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({ classID: '' });

  useEffect(() => {
    async function getclassList() {
      const getclasslist = await apiFetch(`${apiUrl}/class`, 'GET');
      if (getclasslist && getclasslist.result) {
        setClassList(getclasslist.result);
      }
    }
    getclassList();
  }, [])

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedClass?.classID) {
        params.append('classID', selectedClass.classID);
      }
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      const [start, end] = filters.dateRange;
      if (start) params.append('startDate', start.toISOString());
      if (end) params.append('endDate', end.toISOString());

      const response = await apiFetch(`${apiUrl}/student/attendance?${params.toString()}`, 'GET')
      const data = response.result
      setRecords(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClass.classID !== '') {
      fetchData();
    }
  }, [filters, selectedClass]);

  const onFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = () => {
    return records.filter((item) => {
      const nameMatch = filters.student_name
        ? item.name.toLowerCase().includes(filters.student_name.toLowerCase())
        : true;

      const statusMatch = filters.status ? item.status === filters.status : true;
      return nameMatch && statusMatch;
    });
  };

  const bulkMark = async (status) => {
    if (!selectedRows || selectedRows.length === 0) {
      toast.current.show({ severity: 'warn', summary: 'No Selection', detail: 'Please select students first', life: 2000 });
      return;
    }
    const rowsToUpdate = selectedRows.map(r => ({
      ...r,
      present: status === 'Present' ? '1' : '0'
    }));

    await apiFetch(`${apiUrl}/student/attendance`, 'POST', rowsToUpdate)
    fetchData();
    setSelectedRows([]); // Clear selection after action
    toast.current.show({ severity: 'success', summary: 'Bulk Update', detail: `Marked ${selectedRows.length} students as ${status}`, life: 2000 });
  };

  // --- Templates ---

  const nameTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-3">
        <Avatar
          image={`https://api.dicebear.com/7.x/initials/svg?seed=${rowData.name}`}
          shape="circle"
          size="large"
          className="bg-indigo-50 text-indigo-500 shadow-sm"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{rowData.name}</span>
          <span className="text-xs text-gray-400">ID: {rowData.user_id}</span>
        </div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    const isPresent = rowData.present === 'Present';
    return (
      <Tag
        value={isPresent ? 'Present' : 'Absent'}
        severity={isPresent ? 'success' : 'danger'}
        rounded
        className="px-3"
      ></Tag>
    );
  };

  const actionTemplate = (row) => {
    const toggleStatus = async () => {
      let newStatus = row.present === 'Present' ? '0' : '1';
      await apiFetch(`${apiUrl}/student/attendance`, 'POST', [{ ...row, present: newStatus }])
      fetchData();
      toast.current.show({
        severity: 'info',
        summary: 'Updated',
        detail: `Status changed to ${newStatus === '1' ? 'Present' : 'Absent'}`,
        life: 1500,
      });
    };

    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-check"
          rounded
          text={row.present !== 'Present'}
          outlined={row.present !== 'Present'}
          className={`w-9 h-9 ${row.present === 'Present' ? 'bg-green-500 text-white hover:bg-green-600 border-none shadow-md' : 'text-green-500 border-green-500 hover:bg-green-50'}`}
          tooltip="Mark Present"
          onClick={() => {
             if (row.present !== 'Present') toggleStatus();
          }}
        />
        <Button
          icon="pi pi-times"
          rounded
          text={row.present === 'Present'}
          outlined={row.present === 'Present'}
           className={`w-9 h-9 ${row.present !== 'Present' ? 'bg-red-500 text-white hover:bg-red-600 border-none shadow-md' : 'text-red-500 border-red-500 hover:bg-red-50'}`}
          tooltip="Mark Absent"
          onClick={() => {
             if (row.present === 'Present') toggleStatus();
          }}
        />
      </div>
    );
  };

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap items-center gap-4">
       {/* Class Dropdown */}
        {classList && (
            <span className="p-input-icon-left">
                <i className="pi pi-th-large text-gray-400 z-10" />
                <Dropdown
                    value={selectedClass.classID}
                    onChange={(e) => setSelectedClass({ classID: e.value })}
                    options={classList}
                    optionLabel="name"
                    placeholder="Select Class"
                    optionValue="class_id"
                    className="w-full md:w-56 rounded-full border-gray-200 pl-2 shadow-sm"
                    pt={{
                        root: { className: 'rounded-full border-gray-200 bg-gray-50' },
                        input: { className: 'pl-8 text-sm' }
                    }}
                />
            </span>
        )}

         {/* Date Range */}
        <span className="p-input-icon-left">
           <i className="pi pi-calendar text-gray-400 z-10" style={{ left: '0.75rem' }} />
            <Calendar
                value={filters.dateRange}
                onChange={(e) => onFilterChange('dateRange', e.value)}
                selectionMode="range"
                placeholder="Date Range"
                className="w-full md:w-64"
                inputClassName="rounded-full border-gray-200 bg-gray-50 text-sm pl-10 shadow-sm"
                readOnlyInput
            />
        </span>
    </div>
  );

  const rightToolbarTemplate = () => (
    <div className="flex items-center gap-2">
       <span className="p-input-icon-left">
            <i className="pi pi-search text-gray-400" />
            <InputText
                value={filters.student_name}
                onChange={(e) => onFilterChange('student_name', e.target.value)}
                placeholder="Search Student..."
                className="rounded-full border-gray-200 bg-gray-50 px-4 py-2 text-sm pl-10 w-48 shadow-sm focus:w-64 transition-all"
            />
        </span>
        <Button 
            label="Export" 
            icon="pi pi-download" 
            className="p-button-outlined p-button-secondary rounded-full text-sm border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => dt.current?.exportCSV()} 
        />
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <Toast ref={toast} />
      
      {/* Header Card */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
              <p className="text-gray-500 text-sm mt-1">Manage student attendance records efficiently</p>
          </div>
          <div className="flex gap-2 bg-white p-2 rounded-full shadow-sm">
             <Button 
                label="Mark Selected Present" 
                icon="pi pi-check" 
                className="p-button-success p-button-sm rounded-full px-4" 
                onClick={() => bulkMark('Present')} 
             />
             <Button 
                label="Mark Selected Absent" 
                icon="pi pi-times" 
                className="p-button-danger p-button-sm rounded-full px-4" 
                onClick={() => bulkMark('Absent')} 
             />
          </div>
      </div>


      {/* Main Table Card */}
      <div className="card bg-white shadow-sm rounded-3xl overflow-hidden p-6 border border-gray-100">
        
        <Toolbar className="bg-transparent border-none p-0 mb-6" start={leftToolbarTemplate} end={rightToolbarTemplate} />

        {selectedClass.classID ? (
           <DataTable
            ref={dt}
            value={filteredData()}
            selection={selectedRows}
            onSelectionChange={(e) => setSelectedRows(e.value)}
            dataKey="user_id"
            // scrollable // Removed scroll
            // scrollHeight="77vh" // Removed scroll
            // showGridlines // Removed gridlines
            className="p-datatable-sm"
            stripedRows
            rowHover
            resizableColumns
            columnResizeMode="fit"
            emptyMessage={
                <div className="text-center p-12 text-gray-400">
                    <i className="pi pi-users text-4xl mb-4 opacity-50"></i>
                    <p>No students found for this selection.</p>
                </div>
            }
             pt={{
                header: { className: 'bg-transparent border-b-0 mb-4' },
                thead: { className: 'bg-gray-50 text-gray-400 text-xs font-semibold uppercase tracking-wider' },
                tbody: { className: 'text-sm text-gray-700' },
                row: { className: 'hover:bg-indigo-50 transition-colors border-b border-gray-50' }
            }}
          >
            <Column 
                selectionMode="multiple" 
                headerStyle={{ width: '3rem' }} 
                headerClassName="pl-4" 
                bodyClassName="pl-4"
            />
            
            <Column
              field="name"
              header="Student Name"
              body={nameTemplate}
              sortable
              headerClassName="bg-transparent text-gray-400 font-medium py-4 border-b border-gray-100 pl-4"
              bodyClassName="py-4 pl-4"
            />
            
            <Column 
                field="attendance_date" 
                header="Date" 
                body={(row) => <span className="text-gray-500 font-medium">{row.attendance_date}</span>}
                sortable
                headerClassName="bg-transparent text-gray-400 font-medium py-4 border-b border-gray-100"
                bodyClassName="py-4"
            />
            
            <Column 
                field="present" 
                header="Status" 
                body={statusTemplate}
                sortable
                headerClassName="bg-transparent text-gray-400 font-medium py-4 border-b border-gray-100"
                bodyClassName="py-4"
            />
            
            <Column 
                header="Actions" 
                body={actionTemplate} 
                className="text-right"
                headerClassName="bg-transparent text-gray-400 font-medium py-4 border-b border-gray-100 text-right pr-6"
                bodyClassName="py-4 text-right pr-6"
                style={{ width: '180px' }} 
            />

          </DataTable>
        ) : (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                 <i className="pi pi-th-large text-5xl text-gray-300 mb-4"></i>
                 <h3 className="text-xl font-semibold text-gray-600">Select a Class</h3>
                 <p className="text-gray-400 mt-2">Please select a class from the dropdown above to view attendance records.</p>
            </div>
        )}
       
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .p-checkbox .p-checkbox-box {
          border: 2px solid #3b82f6 !important; /* blue-500 */
          border-radius: 6px !important;
        }
        .p-checkbox .p-checkbox-box.p-highlight {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        .p-checkbox:hover .p-checkbox-box {
           border-color: #2563eb !important; /* blue-600 */
        }
      `}} />
    </div>
  );
}
