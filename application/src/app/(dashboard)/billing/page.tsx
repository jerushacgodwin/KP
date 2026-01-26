"use client";
import { apiFetch } from "@src/lib/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userString = Cookies.get("log-user");

const FessList = dynamic(
  () => import("@kp/billing").then((mod) => mod.FessList),
  { ssr: false }
);

const OtherPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0); // row offset
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
const [globalFilterValue, setGlobalFilterValue] = useState("");
  const rowsPerPage = 20;

  // Lazy loading function (fetch only one page)
  const loadLazyData = useCallback(async (pageOffset = 0, filterValue = "", sField?: string, sOrder?: number | null) => {
    setLoading(true);

    const currentPage = Math.floor(pageOffset / rowsPerPage) + 1;
    const user = userString ? JSON.parse(userString) : null;

    try {
      const res = await apiFetch(`${apiUrl}/student/getAllStudents/`, "POST", {
        page: currentPage,
        size: rowsPerPage,
        school_id: user?.school_id,
        search: filterValue,
        sortField: sField,
        sortOrder: sOrder === 1 ? 'ASC' : sOrder === -1 ? 'DESC' : undefined
      });

      // Replace data (NOT append — for pagination)
      setStudents(res.result.data);
      setTotalRecords(res.result.total);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadLazyData(0);
  }, [loadLazyData]);

  // PrimeReact paginator event
  const onLazyLoad = (event: { first: number; rows: number; page: number }) => {
    setFirst(event.first);
    loadLazyData(event.first, globalFilterValue, sortField, sortOrder);
  };

  const onSort = (event: any) => {
      setSortField(event.sortField);
      setSortOrder(event.sortOrder);
      loadLazyData(0, globalFilterValue, event.sortField, event.sortOrder);
  };

 const onGlobalSearch = (value: string) => {
    setGlobalFilterValue(value);
   setFirst(0);
    loadLazyData(0, value, sortField, sortOrder);
  };
  const columns = [
    { field: "user_id", header: "User Id" },
    { field: "name", header: "Name" },
    { field: "class_group", header: "Class Group" }, // Renamed from class for clarity if needed, or keeping matching backend
    { field: "tuition_fee", header: "Tuition Fee" },
    { field: "exam_fee", header: "Exam Fee" },
    { field: "other_fee", header: "Other Fee" },
    { field: "total_due", header: "Total Due" },
    { field: "action", header: "Action" },
  
  ];

  const globalFilterFields = ["user_id", "name", "class_group", "email"];

  return (
    <div className="rounded-md flex-1 m-4 mt-0">
      <FessList
        scrollHeight="78vh"
        pageData={students}
        totalRecords={totalRecords}
        loading={loading}
        onLazyLoad={onLazyLoad}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
        columns={columns}
        globalFilter={globalFilterFields}
        first={first}
        baseURL="/billing"
        onGlobalSearch={onGlobalSearch}
      />
    </div>
  );
};

export default OtherPage;
