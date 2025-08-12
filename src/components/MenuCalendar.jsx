// 
import React, { useState } from 'react';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function MenuCalendar({ menuItems, startDay = 0, daysInMonth = 31, onMenuItemClick }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const totalCells = 25; // 5 weeks * 5 days (Mon-Fri)
  const startIndex = [0, 1, 6].includes(startDay) ? 0 : startDay - 1;

  function getMenuForCell(cellIndex) {
    const menuIndex = cellIndex - startIndex;
    if (menuIndex < 0 || menuIndex >= menuItems.length) return null;
    return menuItems[menuIndex];
  }

  function getDateForCell(cellIndex) {
    const menuIndex = cellIndex - startIndex;
    if (menuIndex < 0 || menuIndex >= menuItems.length) return null;

    const dateStr = menuItems[menuIndex].date;
    return Number(dateStr.slice(-2)); // last 2 digits without 0
  }

  const handleClick = (cellIndex) => {
    setSelectedDay(cellIndex);
    const dateNumber = getDateForCell(cellIndex);
    if (!dateNumber) return; // no date in this cell
    const menu = getMenuForCell(cellIndex);
    if (menu && onMenuItemClick) onMenuItemClick(menu.mealId);
  };

  const isSelectedCell = (cellIndex) => selectedDay === cellIndex;

  return (
    <div className="w-full max-w-full p-4 overflow-x-auto">
        {/* Desktop table view - hidden on small screens */}
      <div className="hidden sm:block">
        <table className="table-fixed w-full border-collapse border border-gray-300">
            <thead>
            <tr>
                {weekdays.map(day => (
                <th key={day} className="border border-gray-300 p-2 text-center font-semibold bg-[#90a9eb] text-black">{day}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {[...Array(5)].map((_, weekIndex) => (
                <tr key={weekIndex}>
                {[...Array(5)].map((_, dayIndex) => {
                    const cellIndex = weekIndex * 5 + dayIndex;
                    const dateNumber = getDateForCell(cellIndex);
                    const menu = getMenuForCell(cellIndex);
                    const isSelected = isSelectedCell(cellIndex);

                    return (
                    <td
                        key={dayIndex}
                        className={`border border-gray-300 p-6 align-top cursor-pointer bg-white
                            ${isSelected ? "bg-[#e1e9fd] border-gray-400" : "border-gray-400"}
                            ${menu ? "hover:bg-[#e1e9fd] cursor-pointer" : ""}`}
                            onClick={() => menu && handleClick(cellIndex)}
                    >
                        <div className="text-sm font-semibold mb-3 text-gray-400">{dateNumber ?? ""}</div>
                        <div className="text-lg ">{menu ? menu.menuName : ""}</div>
                    </td>
                    );
                })}
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      {/* Mobile stacked list view - shown only on small screens */}
      <div className="sm:hidden flex flex-col gap-4">
        {menuItems.map((menu, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded cursor-pointer bg-white hover:bg-[#e1e9fd]"
            onClick={() => menu && onMenuItemClick && onMenuItemClick(menu.mealId)}
          >
            <div className="text-sm font-semibold text-gray-400 mb-2">
              {Number(menu.date.slice(-2))}
            </div>
            <div className="text-lg font-semibold">{menu.menuName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
