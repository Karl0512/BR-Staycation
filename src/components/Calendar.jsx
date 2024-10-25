// SimpleCalendar.js
import React, { useState } from 'react';
import "../style/Calendar.css"

export default function SimpleCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const generateCalendar = () => {
      const month = currentMonth.getMonth();
      const year = currentMonth.getFullYear();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      const calendar = [];
      let week = [];
      
      // Fill the first week
      for (let i = 0; i < firstDay; i++) {
        week.push(<td key={`empty-${i}`} />);
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        week.push(
          <td key={day}>
            {day}
          </td>
        );
  
        if ((day + firstDay) % 7 === 0 || day === daysInMonth) {
          calendar.push(<tr key={calendar.length}>{week}</tr>);
          week = [];
        }
      }
  
      return calendar;
    };
  
    const handlePreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };
  
    const handleNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

  return (
    <div className='calendar'>
      <div className='header-calendar'>
        <button id='btn-prev' onClick={handlePreviousMonth}>Previous</button>
        <h2 className='calendar-month-year'>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
        <button id='btn-next' onClick={handleNextMonth}>Next</button>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendar()}
        </tbody>
      </table>
    </div>
  )
}
