"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ---------- TYPES ----------
type Note = {
  startDate: string;
  endDate: string;
  text: string;
};

// ---------- UTIL ----------
const daysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

const startDay = (month: number, year: number) =>
  new Date(year, month, 1).getDay();

// ---------- COMPONENTS ----------

function Hero({ month, year, image }: any) {
  return (
    <motion.div
      key={month}
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-64 bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${image})`,
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative w-full px-6 pb-6 flex justify-end text-white">
        <div className="text-right">
          <h2 className="text-4xl font-bold">
            {new Date(year, month).toLocaleString("default", {
              month: "long",
            })}
          </h2>
          <p className="opacity-80">{year}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DayCell({ day, date, isStart, isEnd, inRange, today, onClick, hasNote }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      className={`relative p-2 cursor-pointer text-center transition
        ${inRange ? "bg-blue-100" : "hover:bg-gray-200"}
        ${isStart ? "bg-blue-500 text-white rounded-l-full" : ""}
        ${isEnd ? "bg-blue-500 text-white rounded-r-full" : ""}
      `}
    >
      {/* Today Highlight */}
      {today && (
        <div className="absolute inset-0 border border-blue-400 rounded-lg pointer-events-none" />
      )}

      {day}

      {/* Note Dot */}
      {hasNote && (
        <span className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
      )}
    </motion.div>
  );
}

// ---------- MAIN ----------

export default function WallCalendar() {
  const todayDate = new Date();

  const [month, setMonth] = useState(todayDate.getMonth());
  const [year, setYear] = useState(todayDate.getFullYear());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [tempNote, setTempNote] = useState("");
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("calendar_notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar_notes", JSON.stringify(notes));
  }, [notes]);

  const totalDays = daysInMonth(month, year);
  const firstDay = startDay(month, year);

  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  ];

  const currentImage = images[month % images.length];

  const isSameDay = (d1: Date | null, d2: Date) =>
    d1 && d1.toDateString() === d2.toDateString();

  const isInRange = (day: number) => {
    if (!startDate) return false;
    const date = new Date(year, month, day);
    const end = endDate || hoverDate;
    if (!end) return false;
    return date >= startDate && date <= end;
  };

  const hasNote = (date: Date) => {
    return notes.find((n) => {
      const s = new Date(n.startDate);
      const e = new Date(n.endDate);
      return date >= s && date <= e;
    });
  };

  const handleDateClick = (day: number) => {
    const clicked = new Date(year, month, day);

    const note = hasNote(clicked);
    if (note) {
      setActiveNote(note.text);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else {
      if (clicked < startDate) {
        setEndDate(startDate);
        setStartDate(clicked);
      } else {
        setEndDate(clicked);
      }
    }
  };

  const saveNote = () => {
    if (startDate && endDate && tempNote) {
      setNotes([
        ...notes,
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          text: tempNote,
        },
      ]);
      setTempNote("");
    }
  };

  const changeMonth = (dir: number) => {
    let m = month + dir;
    let y = year;

    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }

    setMonth(m);
    setYear(y);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        <Hero month={month} year={year} image={currentImage} />

        {/* Note Popup */}
        {activeNote && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

                <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl p-6"
                >
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Note
                </h3>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-4" />

                {/* Content */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {activeNote}
                </p>

                {/* Button */}
                <button
                    onClick={() => setActiveNote(null)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                    Close
                </button>

                </motion.div>
            </div>
            )}
                    

        <div className="grid md:grid-cols-3">

          {/* NOTES */}
          <div className="p-4 border-r bg-yellow-50">
            <h3 className="font-semibold mb-2">Notes</h3>
            <textarea
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
            <button
              onClick={saveNote}
              className="mt-3 w-full bg-black text-white rounded-lg p-2"
            >
              Save Note
            </button>
          </div>

          {/* CALENDAR */}
          <div className="col-span-2 p-4">

            <div className="flex justify-between mb-4">
              <button onClick={() => changeMonth(-1)}>◀</button>
              <h3 className="font-semibold">
                {new Date(year, month).toLocaleString("default", {
                  month: "long",
                })} {year}
              </h3>
              <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-sm text-center">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d} className="opacity-60">{d}</div>
              ))}

              {[...Array(firstDay)].map((_, i) => (
                <div key={i} />
              ))}

              {[...Array(totalDays)].map((_, i) => {
                const day = i + 1;
                const date = new Date(year, month, day);

                return (
                  <DayCell
                    key={day}
                    day={day}
                    date={date}
                    today={date.toDateString() === todayDate.toDateString()}
                    inRange={isInRange(day)}
                    isStart={isSameDay(startDate, date)}
                    isEnd={isSameDay(endDate, date)}
                    hasNote={!!hasNote(date)}
                    onClick={() => handleDateClick(day)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}