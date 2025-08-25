// components/CalendarHeader.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarHeader = ({ label, onNavigate, onView, views, view }: any) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white rounded-md">
      <button onClick={() => onNavigate("PREV")} className="p-2">
        <ChevronLeft />
      </button>

      <div className="flex flex-col items-center  flex-grow text-center">
        <span className="text-lg font-semibold">{label}</span>
        {/* <div className="flex gap-2">
          {views.map((v: string) => (
            <button
              key={v}
              onClick={() => onView(v)}
              className={`text-sm px-2 py-1 rounded ${
                view === v ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {v}
            </button>
          ))}
        </div> */}
      </div>

      <button onClick={() => onNavigate("NEXT")} className="p-2">
        <ChevronRight />
      </button>
    </div>
  );
};

export default CalendarHeader;
