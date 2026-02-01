"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@src/app/context/UserContext";
import { apiFetch } from "@src/lib/api";

const PaySlipsPage = () => {
  const user = useUser();
  const [paySlips, setPaySlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]); // For dropdown
  
  // Form State
  const [formData, setFormData] = useState({
    employee_id: "",
    month: "",
    year: new Date().getFullYear(),
    basic_salary: "",
    allowances: 0,
    deductions: 0,
    status: "Generated",
  });
  const [showForm, setShowForm] = useState(false);

  const fetchPaySlips = async () => {
    try {
      setLoading(true);
      // If admin, fetch all (or support filter). If staff, fetch own.
      // The backend filters by employee_id if provided.
      let query = "";
      if (user?.role !== 1) {
          // Assuming user.id corresponds to employee's user_id or we need to fetch employee ID
          // Usually there's a mapping. For now, let's fetch all and filter in backend if role is enforced there
          // or pass employee_id if available context.
          // Getting context might be tricky without a "My Employee Profile" endpoint.
          // Let's assume fetching all works for Admin.
      }
      
      const response: any = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/hr/payslips${query}`);
      if (response.result) {
        setPaySlips(response.result);
      }
    } catch (error) {
      console.error("Failed to fetch pay slips", error);
    } finally {
      setLoading(false);
    }
  };
  
 const fetchEmployees = async () => {
    try {
        // Fetch all staff/employees for the dropdown
        const response: any = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/staff`);
        // Assuming the staff endpoint returns a list of employees
         if (response) {
             // Adapt based on actual response structure of /staff
              // If it returns { data: [...] } or just [...]
               setEmployees(response.data || response || []);
         }
    } catch(err) {
        console.error("Failed to fetch employees", err);
    }
 };

  useEffect(() => {
    fetchPaySlips();
    if (user?.role === 1) {
        fetchEmployees();
    }
  }, [user]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Calculate net salary
      const basic = parseFloat(formData.basic_salary) || 0;
      const allow = parseFloat(formData.allowances as any) || 0;
      const deduct = parseFloat(formData.deductions as any) || 0;
      const net = basic + allow - deduct;

      const payload = {
          ...formData,
          net_salary: net
      };

      await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/hr/payslips`, "POST", payload);
      alert("Pay Slip Generated!");
      setShowForm(false);
      fetchPaySlips();
    } catch (error) {
      console.error("Error creating pay slip", error);
      alert("Failed to create pay slip");
    }
  };

  if (loading) return <div className="p-4">Loading Pay Slips...</div>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Pay Slips</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {user?.role === 1 && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
            >
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button>
          )}
        </div>
      </div>

      {/* CREATE FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-lamaSkyLight p-4 rounded-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Employee Select */}
           <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Employee</label>
             <select 
               name="employee_id" 
               value={formData.employee_id} 
               onChange={handleInputChange} 
               className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
               required
             >
                <option value="">Select Employee</option>
                {/* We map employees. Assuming employee object has id and name */}
                 {employees.map((emp:any) => (
                     <option key={emp.id} value={emp.id}>{emp.name}</option>
                 ))}
             </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Month</label>
            <select name="month" value={formData.month} onChange={handleInputChange} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" required>
                <option value="">Select Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
          </div>

           <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" required />
          </div>

           <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Basic Salary</label>
            <input type="number" name="basic_salary" value={formData.basic_salary} onChange={handleInputChange} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" required />
          </div>

           <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Allowances</label>
            <input type="number" name="allowances" value={formData.allowances} onChange={handleInputChange} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
          </div>

           <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Deductions</label>
            <input type="number" name="deductions" value={formData.deductions} onChange={handleInputChange} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
          </div>

          <div className="flex items-end">
             <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Generate</button>
          </div>
        </form>
      )}

      {/* LIST TABLE */}
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            <th className="p-4">Employee</th>
            <th className="hidden md:table-cell p-4">Month/Year</th>
            <th className="hidden md:table-cell p-4">Basic</th>
            <th className="hidden md:table-cell p-4">Net Salary</th>
            <th className="hidden md:table-cell p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paySlips.length > 0 ? (
            paySlips.map((slip: any) => (
              <tr key={slip.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
                <td className="flex items-center gap-4 p-4">
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{slip.employee?.name}</h3>
                    <p className="text-xs text-gray-500">{slip.employee?.designation}</p>
                  </div>
                </td>
                <td className="hidden md:table-cell p-4">{slip.month} {slip.year}</td>
                <td className="hidden md:table-cell p-4">${slip.basic_salary}</td>
                 <td className="hidden md:table-cell p-4 font-bold text-green-600">${slip.net_salary}</td>
                <td className="hidden md:table-cell p-4">
                   <span className={`px-2 py-1 rounded-full text-xs text-white ${slip.status === 'Paid' ? 'bg-green-400' : 'bg-yellow-400'}`}>
                       {slip.status}
                   </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {/* Placeholder for View/Download Buttons */}
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                        <Image src="/view.png" alt="" width={16} height={16} />
                    </button>
                    {user?.role === 1 && (
                         <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                            <Image src="/delete.png" alt="" width={16} height={16} />
                        </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
             <tr><td colSpan={6} className="p-4 text-center text-gray-400">No Pay Slips found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaySlipsPage;
