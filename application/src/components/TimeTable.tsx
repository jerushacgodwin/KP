type TimetableCell = {
  day: string;
  time: string;
  subject?: string;
  teacher?: string;
};

 const Timetable = ({
  timeSlots,
  weekdays,
  data,
}: {
  timeSlots: string[];
  weekdays: string[];
  data: TimetableCell[];
}) => {
  return (
    <table className="w-full border text-center mt-4">
      <thead>
        <tr>
          <th className="bg-blue-200 px-4 py-2">Time</th>
          {weekdays.map((day) => (
            <th key={day} className="bg-pink-300 px-4 py-2">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((slot) => (
          <tr key={slot}>
            <td className="bg-blue-100 px-4 py-2">{slot}</td>
            {weekdays.map((day) => {
              const cell = data.find(
                (d) => d.day === day && d.time === slot
              );
              return (
                <td key={`${day}-${slot}`} className="border px-4 py-4">
                  {cell ? (
                    <>
                      <div className="font-semibold">{cell.subject}</div>
                      <div className="text-sm text-gray-500">
                        {cell.teacher}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Timetable;