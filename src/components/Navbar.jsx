import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Logo from "./images/mt copy.png";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  let [open, setOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-[100]">
      <div className="md:flex items-center justify-between bg-gray-800 py-4 md:px-10 px-7">
        <Link to="/">
          <div
            onClick={() => window.scroll(0, 0)}
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-white"
          >
            <img src={Logo} alt="img" className="w-[30px]"  />
            
            Trailers
          </div>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon
            size={30}
            style={{ color: "#fff" }}
            name={open ? "close" : "menu"}
          ></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-50 z-[10] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            open ? "top-[75px] " : "top-[-490px]"
          }`}
        >
          <div className="flex justify-between bg-gray-800 flex-wrap shrink px-4 ">
            <Link to="/movies">
              <button className=" text-white font-[Poppins] md:ml-8 text-xl md:mt-[5px] md:mb-0 my-7 ">
                Movies
              </button>
            </Link>
            <Link to="/series">
              <button className="text-white font-[Poppins] md:ml-8 text-xl md:mt-[5px] md:mb-0 my-7">
                Series
              </button>
            </Link>
            <Link to="/searching">
              <button className="text-white font-[Poppins] md:ml-8 text-xl md:mt-[5px] md:mb-0 my-7">
                Search
              </button>
            </Link>

            {user?.email ? (
              <div>
                <Link to="/account">
                  <button className="text-white font-[Poppins] md:ml-8 text-xl md:my-0 my-7">
                    Account
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-300 px-6 py-2 rounded md:ml-8 text-black"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="text-white font-[Poppins] md:ml-8 text-xl md:my-0 my-7">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-gray-300 px-6 py-2 rounded md:ml-8 text-black">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
