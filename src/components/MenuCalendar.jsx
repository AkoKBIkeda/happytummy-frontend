// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function MenuCalendar({ menuItems }) {
//   const [date, setDate] = useState(new Date());

//   // Disable weekend days (Sat=6, Sun=0)
//   const tileDisabled = ({ date }) => {
//     const day = date.getDay();
//     return day === 0 || day === 6; // disable Sundays & Saturdays
//   };

//   // Render menu inside calendar day tile
//   const tileContent = ({ date, view }) => {
//     if (view === 'month') {
//       const day = date.getDate();
//       const menu = menuItems[day] || null;
//       return menu ? (
//         <div className="text-xs mt-1 p-1 bg-yellow-100 rounded">
//           {menu}
//         </div>
//       ) : null;
//     }
//     return null;
//   };

//   const onChange = (newDate) => {
//     setDate(newDate);
//     const day = newDate.getDate();
//     const menu = menuItems[day] || 'No menu available';
//     alert(`Menu for ${newDate.toDateString()}: ${menu}`);
//   };

//   return (
//     <div className="w-full max-w-full">
//       <Calendar
//         onChange={onChange}
//         value={date}
//         // calendarType="ISO 8601"
//         tileDisabled={tileDisabled}
//         tileContent={tileContent}
//       />
//     </div>
//   );
// }

import React, { useState } from 'react';
import MenuDetails from "./MenuDetails";

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function MenuCalendar({ menuItems, onMenuItemClick }) {
    // Track selected day index (0 to 24)
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    // When user clicks a cell
    //   const handleClick = (dayIndex) => {
    //     setSelectedDay(dayIndex);
    //     const menu = menuItems[dayIndex] || 'No menu available';
    //     alert(`Menu for Day ${dayIndex + 1}: ${menu}`);
    //   };
    // 
    
    const handleClick = (idx) => {
        setSelectedDay(idx);
        const menu = menuItems[idx];
        if (menu && onMenuItemClick) {
        onMenuItemClick(menu.mealId);
        }
    };

    const handleClose = () => {
        setSelectedDay(null);
        setSelectedMenu(null);
    };

  // Render the grid: 5 rows × 5 columns (Mon-Fri)
  // Each dayIndex from 0 to 24 (5 weeks * 5 weekdays)
  return (
    <div className="w-full max-w-full p-4">
      {/* Weekday Headers */}
      <div className="grid grid-cols-5 gap-2 mb-2 text-center font-semibold">
        {weekdays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-5 gap-4">
        {[...Array(25)].map((_, idx) => {
          const menu = menuItems[idx] || null;
          const isSelected = selectedDay === idx;

          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`min-h-[70px] rounded p-2 border 
                ${isSelected ? 'bg-yellow-300 border-yellow-600' : 'bg-yellow-100 border-yellow-300'}
                hover:bg-yellow-200 transition-colors
              `}
              disabled={!menu} // disable empty days
            >
              <div className="text-sm font-semibold mb-1">Day {idx + 1}</div>
              <div className="text-xs">{menu ? menu.menuName : 'No menu'}</div>
            </button>
          );
        })}
      </div>
      {/* Popup Modal */}
      {selectedMenu && (
        <MenuDetails menu={selectedMenu} onClose={handleClose} />
      )}
    </div>
  );
}
