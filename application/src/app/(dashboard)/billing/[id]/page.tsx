"use client";
import { apiFetch } from "@src/lib/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userString = Cookies.get("log-user");

const FessEntry = dynamic(
  () => import("@kp/billing").then((mod) => mod.FessEntry),
  { ssr: false }
);

const BillingPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0); // row offset
const [globalFilterValue, setGlobalFilterValue] = useState("");

  const { id } = useParams();
  // Lazy loading function (fetch only one page)
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`${apiUrl}/student/getStudentById/${id}`, "GET");
      setStudents(res.result.data);
      setTotalRecords(res.result.total);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData(0);
  }, [loadData]);





 
  return (
    <div className="rounded-md flex-1 m-4 mt-0">
 
    </div>
  );
};

export default BillingPage;
