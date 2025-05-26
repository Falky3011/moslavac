import { NavLink as RouterLink, useLocation } from "react-router-dom";
import React from "react";

export default function NavLink({ href, className = "", onClick, children }) {
  const location = useLocation();
  const isActive = location.pathname === href;
  const activeClass = isActive ? "text-blue-600" : "text-gray-600";

  return (
    <RouterLink
      to={href}
      className={`${className} ${activeClass}`}
      onClick={onClick}
    >
      {/*  */}
      {children}
    </RouterLink>
  );
}
