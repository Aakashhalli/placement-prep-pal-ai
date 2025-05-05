import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function ResumeBuilder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#121212] text-[#E0E0E0]">
      <div className="md:hidden flex items-center justify-between bg-[#121212] p-4 border-b border-[#888888]">
        <img src="/logo.svg" width={"150px"} alt="logo" />
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-[#FFFFFF]"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 w-64 flex-shrink-0 h-screen z-10 bg-[#121212] text-[#E0E0E0] p-6 flex flex-col gap-4 
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:relative md:translate-x-0`}
      >
        <div className="flex justify-end items-center">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-[#E0E0E0]"
          >
            <X className="md:hidden w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-2 mt-4">
          {[
            "Personal Details",
            "Education",
            "Professional Experience",
            "Skills",
            "Projects",
            "Summary",
            "Finalize",
          ].map((step, index) => (
            <NavLink
              to={`/create/${step.toLowerCase().replace(/ /g, "-")}`}
              key={index}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-[#007BFF] text-[#FFFFFF]"
                    : "text-[#E0E0E0] hover:bg-[#1E1E1E]"
                }`
              }
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5] text-[#121212] font-bold">
                {index + 1}
              </span>
              {step}
            </NavLink>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-[#121212] text-[#F5F5F5]">
        <Outlet />
      </main>
    </div>
  );
}
