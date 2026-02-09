"use client";
import { apiFetch } from "@src/lib/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userString = Cookies.get("log-user");

const FessEntry = dynamic(
  () => import("@kp/billing").then((mod) => mod.FessEntry),
  { ssr: false }
);

const BillingPage = () => {
  const [student, setStudent] = useState<any[]>([]);
  const [schoolData, setSchoolData] = useState<any>([]);
  const [feeCategories, setFeeCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [feesData, setFeesData] = useState<any[]>([]);
  const [receiptData, setReceiptData] = useState<{ items: any[]; total: number }>({ items: [], total: 0 });


  const { id } = useParams();
 
  const loadData = async () => {
    setLoading(true);
    try {
      const user = userString ? JSON.parse(userString) : null;
      const [getStudentById, schoolById, getfeecategories,getFeesByStudentId] = await Promise.all([
          apiFetch(`${apiUrl}/student/getStudentById/${id}`, "GET"),
          apiFetch(`${apiUrl}/class/getSchoolById/${user?.school_id}`, "GET"),
          apiFetch(`${apiUrl}/finance/getfeecategories`, "GET"),
          apiFetch(`${apiUrl}/finance/getFeesByStudentId/${id}/${user?.school_id}`, "GET"),
        ]);
      //const res = await apiFetch(`${apiUrl}/student/getStudentById/${id}`, "GET");
      setStudent(getStudentById.result);
      setSchoolData(schoolById.result);
      setFeeCategories(getfeecategories.data);
      setFeesData(getFeesByStudentId.data);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, [id]);

 const handleDataChange = (data: { items: any[]; total: number }) => {
      setReceiptData(data);
  };


const handleSubmit = async () => {
  // Handle form submission logic here
     apiFetch(`${apiUrl}/finance/addfee`, "POST", { data: receiptData });
};

  return (
    <div className="rounded-md flex-1 m-4 mt-0">
      <FessEntry school={schoolData} student={student} feeCategories={feeCategories} onDataChange={handleDataChange} feesData={feesData}/>
     <Button label="Submit" className="bg-blue-400 text-white p-2 rounded-md mt-4 l-0 w-full" onClick={handleSubmit} />
    </div>
  );
};

export default BillingPage;
