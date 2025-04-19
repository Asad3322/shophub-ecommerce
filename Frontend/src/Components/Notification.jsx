import React, { useState } from "react";
import "./Notification.css";
import { FaBell } from "react-icons/fa";

const Notification = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "New Arrival: Elegant Summer Dress now in stock!",
      time: "2 mins ago",
    },
    {
      id: 2,
      message: "Price dropped on Sport Running Shoes!",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "Limited Stock: Classic Leather Jacket almost sold out.",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="notification-wrapper">
      <div className="notification-icon" onClick={() => setOpen(!open)}>
        <FaBell />
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>

      {open && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p className="no-notifications">No new notifications</p>
          ) : (
            notifications.map((note) => (
              <div key={note.id} className="notification-item">
                <p>{note.message}</p>
                <span className="time">{note.time}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
