"use client";

import Pagination from "@src/components/Pagination";
import Table from "@src/components/Table";
import TableSearch from "@src/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";

type Book = {
  BookId: number;
  BookName: string;
  BookCode: string;
  BookAuthor: string;
  category?: {
    BookCategory: string;
  };
  BookStatus: number;
};

const columns = [
  {
    header: "Book Name",
    accessor: "BookName",
  },
  {
    header: "Code",
    accessor: "BookCode",
  },
  {
    header: "Author",
    accessor: "BookAuthor",
    className: "hidden md:table-cell",
  },
  {
    header: "Category",
    accessor: "category",
    className: "hidden lg:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell",
  },
];

const LibraryPage = () => {
    const [data, setData] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res:any = await apiFetch("/library/books", "GET");
            if (res.result) {
                setData(res.result);
            }
        } catch (error) {
            console.error("Failed to fetch books", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderRow = (item: Book) => (
        <tr
            key={item.BookId}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4 font-semibold">{item.BookName}</td>
            <td>{item.BookCode}</td>
            <td className="hidden md:table-cell">{item.BookAuthor}</td>
            <td className="hidden lg:table-cell">{item.category?.BookCategory || "General"}</td>
            <td className="hidden lg:table-cell">
                <span className={`px-2 py-1 rounded-md text-xs ${
                    item.BookStatus === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {item.BookStatus === 1 ? 'Available' : 'Issued'}
                </span>
            </td>
        </tr>
    );

    if (loading) {
        return <div className="p-4 bg-white rounded-md m-4">Loading library inventory...</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Library Books</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
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

export default LibraryPage;
