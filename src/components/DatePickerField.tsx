import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarDays, X } from "lucide-react";
import "react-day-picker/style.css";

interface DatePickerFieldProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export default function DatePickerField({
  value,
  onChange,
}: DatePickerFieldProps) {
  let from = value?.from ? format(value.from, "MM/dd/yyyy") : "";
  let to = value?.to ? format(value.to, "MM/dd/yyyy") : "";

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const monthCaptionStyle = {
    padding: "8px",
  };

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (range: DateRange | undefined) => {
    onChange(range);
    // Keep open for range selection UX
  };

  const clearDateInputs = () => {
    onChange(undefined);
  };

  return (
    <div className="flex gap-2 relative items-center">
      <div className="relative inline-block mt-2">
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()} // prevent triggering outside click
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CalendarDays />
        </button>

        {isOpen && (
          <div
            ref={modalRef}
            className="absolute left-0 mt-2 z-50 bg-white border rounded-md shadow-lg"
          >
            <DayPicker
              mode="range"
              selected={value}
              onSelect={handleSelect}
              styles={{
                month_caption: monthCaptionStyle,
              }}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="p-2 border rounded-md w-full"
          placeholder="Start Date"
          value={from}
          readOnly
        />
        <input
          className="p-2 border rounded-md w-full"
          placeholder="End Date"
          value={to}
          readOnly
        />
      </div>
      <button
        type="button"
        onClick={clearDateInputs}
      >
        <X />
      </button>
    </div>
  );
}
