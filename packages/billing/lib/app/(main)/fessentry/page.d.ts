import React from "react";
interface FessEntryProps {
    school: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    student: {
        name: string;
        className: string;
        admissionNo: string;
        iClass: {
            name: string;
            class_id: number;
        } | null;
        user_id: string;
        school_id: number;
    };
    feeCategories: {
        name: string;
        id: number;
    }[];
    onDataChange?: (data: {
        items: FeeItem[];
        total: number;
    }) => void;
    feesData: {
        id: number;
        student_id: number;
        category_id: number;
        amount: number;
        paid_amount: number;
        balance_amount: number;
        due_date: string;
        remarks: string;
        createdAt: string;
        updatedAt: string;
        feeCategory: {
            id: number;
            name: string;
        };
    }[];
}
type FeeItem = {
    school_id: number | null;
    class_id: number | null;
    user_id: number | null;
    fees_type: number | null;
    amount: number;
};
declare const FessEntry: React.FC<FessEntryProps>;
export default FessEntry;
