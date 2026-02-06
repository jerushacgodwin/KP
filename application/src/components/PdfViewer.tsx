"use client";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    url: string;
}

const PdfViewer = ({ url }: PdfViewerProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-lg p-4 w-full">
            <div className="w-full max-w-4xl overflow-auto shadow-lg" onContextMenu={(e) => e.preventDefault()}>
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex justify-center p-10">
                            <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
                        </div>
                    }
                    error={
                        <div className="text-red-500 p-10 text-center">
                            Failed to load PDF. Please try again later.
                        </div>
                    }
                >
                    <Page 
                        pageNumber={pageNumber} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false}
                        width={Math.min(window.innerWidth * 0.9, 800)} // Responsive width roughly
                        className="mb-4"
                    />
                </Document>
            </div>

            {numPages > 0 && (
                <div className="flex items-center gap-4 mt-4 bg-white p-2 rounded-full shadow-sm border">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                    >
                        <i className="pi pi-chevron-left"></i>
                    </button>
                    <span className="text-sm font-medium">
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        disabled={pageNumber >= numPages}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                    >
                        <i className="pi pi-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PdfViewer;
