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

type Category = {
    BookCategoryId: number;
    BookCategory: string;
}

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
    const [showAddBook, setShowAddBook] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    // Form data
    const [categories, setCategories] = useState<Category[]>([]);
    const [newBook, setNewBook] = useState({
        BookName: "",
        BookCode: "",
        BookAuthor: "",
        BookCategoryId: "",
        BookStatus: 1,
        BookDes: ""
    });
    const [newCategory, setNewCategory] = useState({
        BookCategory: "",
        BookCategoryDes: ""
    });

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
    
    const fetchCategories = async () => {
         try {
            const res:any = await apiFetch("/library/categories", "GET");
            if (res.result) {
                setCategories(res.result);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    const handleAddBook = async (e: any) => {
        e.preventDefault();
        try {
            await apiFetch("/library/books", "POST", newBook);
            alert("Book added successfully!");
            setShowAddBook(false);
            fetchData();
            setNewBook({
                BookName: "",
                BookCode: "",
                BookAuthor: "",
                BookCategoryId: "",
                BookStatus: 1,
                BookDes: ""
            });
        } catch (error) {
            console.error("Failed to add book", error);
            alert("Failed to add book");
        }
    };

    const handleAddCategory = async (e: any) => {
        e.preventDefault();
        try {
            await apiFetch("/library/categories", "POST", newCategory);
            alert("Category added successfully!");
            setShowAddCategory(false);
            fetchCategories(); // Refresh categories
             setNewCategory({
                BookCategory: "",
                BookCategoryDes: ""
            });
        } catch (error) {
             console.error("Failed to add category", error);
             alert("Failed to add category");
        }
    }

    const renderRow = (item: Book) => (
        <tr
            key={item.BookId}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4 font-semibold">{item.BookName}</td>
            <td>{item.BookCode}</td>
            <td className="">{item.BookAuthor}</td>
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
                       <button 
                         onClick={() => { setShowAddCategory(!showAddCategory); setShowAddBook(false); }}
                         className="flex items-center justify-center gap-2 bg-lamaPurple text-white px-4 py-2 rounded-md text-xs"
                       >
                            + Add Category
                       </button>
                        <button 
                          onClick={() => { setShowAddBook(!showAddBook); setShowAddCategory(false); }}
                          className="flex items-center justify-center gap-2 bg-lamaYellow text-black px-4 py-2 rounded-md text-xs"
                        >
                            + Add Book
                        </button>
                    </div>
                </div>
            </div>

            {/* ADD BOOK FORM */}
            {showAddBook && (
                <div className="mt-4 p-4 bg-lamaSkyLight rounded-md">
                    <h2 className="font-semibold mb-4">Add New Book</h2>
                    <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            placeholder="Book Name"
                            className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm"
                            value={newBook.BookName}
                            onChange={(e) => setNewBook({...newBook, BookName: e.target.value})}
                            required
                        />
                        <input 
                            placeholder="Book Code (ISBN)"
                            className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm"
                            value={newBook.BookCode}
                            onChange={(e) => setNewBook({...newBook, BookCode: e.target.value})}
                            required
                        />
                        <input 
                            placeholder="Author"
                            className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm"
                            value={newBook.BookAuthor}
                            onChange={(e) => setNewBook({...newBook, BookAuthor: e.target.value})}
                            required
                        />
                         <select 
                            className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm"
                            value={newBook.BookCategoryId}
                            onChange={(e) => setNewBook({...newBook, BookCategoryId: e.target.value})}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.BookCategoryId} value={cat.BookCategoryId}>{cat.BookCategory}</option>
                            ))}
                        </select>
                        <textarea 
                             placeholder="Description"
                             className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm md:col-span-2"
                             value={newBook.BookDes}
                             onChange={(e) => setNewBook({...newBook, BookDes: e.target.value})}
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save Book</button>
                    </form>
                </div>
            )}

            {/* ADD CATEGORY FORM */}
             {showAddCategory && (
                <div className="mt-4 p-4 bg-lamaPurpleLight rounded-md">
                    <h2 className="font-semibold mb-4">Add New Category</h2>
                    <form onSubmit={handleAddCategory} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            placeholder="Category Name"
                            className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm"
                            value={newCategory.BookCategory}
                            onChange={(e) => setNewCategory({...newCategory, BookCategory: e.target.value})}
                            required
                        />
                        <input 
                            placeholder="Description"
                            className="p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm"
                            value={newCategory.BookCategoryDes}
                            onChange={(e) => setNewCategory({...newCategory, BookCategoryDes: e.target.value})}
                        />
                         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md md:col-span-2">Save Category</button>
                    </form>
                </div>
            )}


            {/* LIST */}
            <div className="mt-4">
                 <Table columns={columns} renderRow={renderRow} data={data} />
            </div>
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default LibraryPage;
