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
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { apiFetch } from "@src/lib/api";
import Cookies from "js-cookie"

 const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const userString = Cookies.get("log-user");


export default function AttendanceAdvancedTable() {
  const dt = useRef(null);
  const toast = useRef(null);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filters, setFilters] = useState({student_name: '',status: '', dateRange: [null, null]  });
const [loading, setLoading] = useState(false);
const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({ classID: '' });
     useEffect(() => {
    async function getclassList() {
      const getclasslist= await apiFetch(`${apiUrl}/class`, 'GET');
      if (getclasslist && getclasslist.result) {
        setClassList(getclasslist.result);
      }
    }
    getclassList();
  },[])
    
const fetchData = async () => {
    setLoading(true);
    try {
        let user = null;
          if (userString) {
            user = JSON.parse(userString);
          }
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
      //console.log(response, 'response')
      const data =  response.result

      setRecords(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (selectedClass.classID!=='') {
    fetchData();
      }
  }, [filters,selectedClass]);
  const onFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = () => {
    return records.filter((item) => {
      const nameMatch = filters.student_name
        ? item.name.toLowerCase().includes(filters.student_name.toLowerCase())
        : true;

      const statusMatch = filters.status ? item.status === filters.status : true;

      const [start, end] = filters.dateRange;
      const dateMatch = start && end ? item.date >= start && item.date <= end : true;

      return nameMatch && statusMatch && dateMatch;
    });
  };





  const bulkMark = async (status) => {
   const row = selectedRows.map(r =>({...r,
  present: status === 'Present' ? '1' : '0'
}));
     console.log([{ ...selectedRows, present: status  }])
   await apiFetch(`${apiUrl}/student/attendance`, 'POST', ( row ))
  
    fetchData();
    toast.current.show({ severity: 'success', summary: 'Bulk Update', detail: `Marked as ${status}`, life: 2000 });
  };

 

  const actionTemplate = (row) => {
    console.log(row, 'row')
    const toggleStatus = async () => {
      //console.log(row, 'row')
      let newStatus = row.present === 'Present' ? '0' : '1';
      // setRecords((prev) =>
      //   prev.map((r) =>
      //     r.user_id === row.user_id ? { ...r, status: newStatus } : r
      //   )
      // );
    // if(row.present === 'Not Marked') {
    // }
      await apiFetch(`${apiUrl}/student/attendance`, 'POST',[{ ...row, present: newStatus  }])
  
    fetchData();
      console.log(`Toggling status for`,records);
      toast.current.show({
        severity: 'info',
        summary: 'Toggled',
        detail: `Status changed to ${newStatus}`,
        life: 1500,
      });
    };

    return (
      <div className="flex gap-2">
        <Button
          label={row.present === 'Present' ? ' Present' : 'Absent'}
          icon={row.present === 'Present' ? 'pi pi-check' : 'pi pi-times'}
          className={`p-button-sm ${row.present === 'Present' ? 'p-button-success' : 'p-button-warning'}`}
          onClick={toggleStatus}
        />
          </div>
    );
  };

  const leftToolbarTemplate = () => (
    <div className="flex gap-2">
      <Button label="Mark Present" icon="pi pi-check" severity="success" onClick={() => bulkMark('Present')} />
      <Button label="Mark Absent" icon="pi pi-times" severity="warning" onClick={() => bulkMark('Absent')} />
    </div>
  );

  const rightToolbarTemplate = () => (
    <Button label="Export CSV" icon="pi pi-download" onClick={() => dt.current?.exportCSV()} />
  );

  const statusFilterElement = (
    <Dropdown
      value={filters.status}
      options={['Present', 'Absent']}
      onChange={(e) => onFilterChange('status', e.value)}
      placeholder="Filter by Status"
    
      className="w-full"
    />
  );

  const dateRangeFilter = (
    <Calendar
      value={filters.dateRange}
      onChange={(e) => onFilterChange('dateRange', e.value)}
      selectionMode="range"
      placeholder="Filter by Date Range"
      className="w-full"
      readOnlyInput
    />
  );

  return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
         <div className="card flex justify-content-center pb-4">
             {classList &&  <Dropdown value={selectedClass.classID} onChange={(e) => setSelectedClass({classID:e.value})} 
             options={classList} optionLabel="name" 
                placeholder="Select a Class"
                  // label shown in dropdown
  optionValue="class_id"
                 className="w-full md:w-14rem" />}
        </div>
   {records.length>0 && <div className="card">
      <Toast ref={toast} />
      <h3 className="text-xl font-semibold mb-3">Attendance Table </h3>

      <Toolbar className="" start={leftToolbarTemplate} end={rightToolbarTemplate} />

      <DataTable
        ref={dt}
        value={filteredData()}
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        dataKey="user_id"
        scrollable
        scrollHeight="77vh"
        showGridlines
        resizableColumns
        columnResizeMode="fit"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="user_id" header="ID" style={{ width: '80px' }} />
        <Column
          field="name"
          header="Student Name"
          filter
          filterElement={
            <InputText
              value={filters.name}
              onChange={(e) => onFilterChange('student_name', e.target.value)}
              placeholder="Filter by name"
              className="p-inputtext-sm"
            />
          }
        />
        <Column field="attendance_date" header="Date" body={(row) => row.attendance_date} filter filterElement={dateRangeFilter} />
        <Column field="present" header="Status" filter filterElement={statusFilterElement} />
        <Column header="Actions" body={actionTemplate} style={{ width: '180px' }} />
      </DataTable>

   
    </div>
}
    </div>
  );

}
