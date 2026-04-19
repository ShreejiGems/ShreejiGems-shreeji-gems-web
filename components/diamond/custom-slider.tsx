import React, { useState, useRef, useEffect } from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  marks?: Record<number, string>;
  className?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  marks,
  className = "",
}) => {
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValue = (percentage: number) => {
    const val = (percentage / 100) * (max - min) + min;
    return Math.round(val / step) * step;
  };

  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(thumb);
  };

  const handleTouchStart = (thumb: "min" | "max") => (e: React.TouchEvent) => {
    e.preventDefault();
    setDragging(thumb);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!railRef.current) return;

      const rect = railRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = getValue(percentage);

      if (dragging === "min") {
        onChange([Math.min(newValue, value[1]), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0])]);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging || !railRef.current) return;

      const touch = e.touches[0];
      const rect = railRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = getValue(percentage);

      if (dragging === "min") {
        onChange([Math.min(newValue, value[1]), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0])]);
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [dragging, value, min, max, step]);

  const handleRailPointerDown = (clientX: number) => {
    if (!railRef.current) return;

    const rect = railRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const newValue = getValue(percentage);

    let thumb: "min" | "max";

    if (value[0] === value[1]) {
      const centerX =
        rect.left + (getPercentage(value[0]) / 100) * rect.width;

      thumb = clientX < centerX ? "min" : "max";
    } else {
      const distToMin = Math.abs(newValue - value[0]);
      const distToMax = Math.abs(newValue - value[1]);
      thumb = distToMin <= distToMax ? "min" : "max";
    }

    setDragging(thumb);

    if (thumb === "min") {
      onChange([Math.min(newValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(newValue, value[0])]);
    }
  };

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className={`relative pt-2 pb-6 ${className}`}>
      {/* Rail */}
      <div
        ref={railRef}
        className="relative h-1 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={(e) => handleRailPointerDown(e.clientX)}
        onTouchStart={(e) =>
          handleRailPointerDown(e.touches[0].clientX)
        }
      >
        {/* Track (filled area) */}
        <div
          className="absolute h-full bg-[#81806E] rounded-full transition-all duration-150"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />

        {/* Min Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#81806E] rounded-full cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-shadow ${dragging === "min" ? "z-20" : "z-10"}`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleMouseDown("min")}
          onTouchStart={handleTouchStart("min")}
        />

        {/* Max Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#81806E] rounded-full cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-shadow ${dragging === "max" ? "z-20" : "z-10"}`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleMouseDown("max")}
          onTouchStart={handleTouchStart("max")}
        />
      </div>

      {/* Marks */}
      {marks && (
        <div className="relative">
          {Object.entries(marks).map(([key, label], index) => {
            const position = getPercentage(Number(key));
            const markIndex = Number(key);
            const totalMarks = Object.keys(marks).length;

            // Show all marks on desktop, but reduce on mobile
            const shouldShowOnMobile =
              totalMarks <= 10 || markIndex % Math.ceil(totalMarks / 8) === 0;

            // Zigzag pattern for mobile: even index above, odd index below
            const isZigzagAbove = index % 2 === 0;

            return (
              <div
                key={key}
                className="absolute -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                <div className="flex flex-col items-center">
                  {/* Label - zigzag pattern on mobile, normal on desktop */}
                  <span
                    className={`text-[10px] md:text-xs text-gray-600 whitespace-nowrap ${shouldShowOnMobile ? "block" : "block"
                      } ${isZigzagAbove ? "md:mt-6 -mt-6" : "md:mt-6 mt-6"}`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
