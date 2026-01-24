import React, { useState, useRef, useEffect, type ReactNode } from "react";
import user from '../icons/userB.svg'
import logout from '../icons/logout.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { negative } from "../Redux/LoginUser";

interface DropdownSelectProps {
  trigger: ReactNode; // can be anything
  username: string;
  email: string;              
  searchable?: boolean;
}

export default function DropdownSelect({
  trigger, username, email
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;
  const userName = username[0].toUpperCase() + username.slice(1).toLowerCase();

  const handleLogout = async (e:React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await axios.get(`${apiUrl}/api/v1/auth/logout`,{withCredentials: true})
        if(res.statusText == 'OK') {
            dispatch(negative())
            navigate("/")
        }
    } catch (error: any) {
        console.log(error);
        
    }
  }


  return (
    <div className="relative inline-block" ref={dropdownRef}>
      
      {/* THE TRIGGER */}
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-1 w-56 shadow-lg rounded-lg z-999">
          <div className="container p-4 bg-[#f8f8f8] rounded-lg ">
            <div className="user-icon flex items-center gap-3 p-2 mb-5">
                <img src={user} width="35px" />
                <div className="flex flex-col ">
                    <div className="text-[21px]">{userName}</div>
                    <div className="email opacity-75">{email}</div>
                </div>
            </div>
            <hr className="opacity-15 " />
            <div onClick={handleLogout} className="logout m-2 flex gap-2 items-center justify-between w-full cursor-pointer ">
                <div className="text-[#dd142b]  ">Logout</div>
                <div className="pr-2"><img src={logout} width="24px" /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
