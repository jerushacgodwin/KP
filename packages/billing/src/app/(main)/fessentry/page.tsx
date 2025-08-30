/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTableFilterMeta, DataTableFilterMetaData } from "primereact/datatable";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";



const FessEntry: React.FC = () => {
  const toast = useRef<Toast>(null);

  const { id } = useParams();
 
 


  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
        

        
        </div>
      </div>
    </div>
  );
};

export default FessEntry;
