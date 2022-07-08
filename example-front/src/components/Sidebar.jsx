import React from 'react'
import { CollectionIcon, CreditCardIcon, UserGroupIcon, ChartBarIcon, ShoppingBagIcon, UserIcon, LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ path }) => {
    const navigate = useNavigate();
  return (
    <>
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 w-full flex flex-col justify-between h-screen border-r border-neutral-200 bg-neutral-200 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <div>
        <div className="-mx-6 px-6 py-4">

        </div>
        <div className="mt-8 text-center flex flex-col items-center">
            <UserIcon className='w-9' />
            <h5 className="hidden mt-4 text-xl font-semibold  text-gray-600 lg:block">Antonio</h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>
        <div className="tracking-wide mt-8">
        <button onClick={() => {navigate("/dashboard");}} 
            className={`${
              path == "/dashboard" ? "bg-neutral-400 text-white " : "text-zinc-600 hover:bg-neutral-300"
            } h-[4rem] text-md rounded-xl w-full  pl-6 `}
          >
            <div className=" flex flex-wrap justify-start px-6 space-x-2 ">
                <ChartBarIcon className="w-5" />
                <span className="-mr-1 font-medium">Dashboard</span>
            </div>
        </button>
        <button onClick={() => {navigate("/sales");}} 
            className={`${
              path == "/sales" ? "bg-neutral-400 text-white " : "text-zinc-600 hover:bg-neutral-300"
            } h-[4rem] text-md rounded-xl w-full pl-6 `}
          >
            <div className=" flex flex-wrap justify-start px-6 space-x-2 ">
                <CollectionIcon className="w-5" />
                <span className="-mr-1 font-medium">Sales</span>
            </div>
        </button>
        <button onClick={() => {navigate("/cards");}} 
            className={`${
              path == "/payments" ? "bg-neutral-400 text-white " : "text-zinc-600 hover:bg-neutral-300"
            } h-[4rem] text-md rounded-xl w-full pl-6 `}
          >
            <div className=" flex flex-wrap justify-start px-6 space-x-2 ">
                <CreditCardIcon className="w-5" />
                <span className="-mr-1 font-medium">Payments</span>
            </div>
        </button>
        <button onClick={() => {navigate("/products");}} 
            className={`${
              path == "/products" ? "bg-neutral-400 text-white " : "text-zinc-600 hover:bg-neutral-300"
            } h-[4rem] text-md rounded-xl w-full pl-6 `}
          >
            <div className=" flex flex-wrap justify-start px-6 space-x-2 ">
                <ShoppingBagIcon className="w-5" />
                <span className="-mr-1 font-medium">Products</span>
            </div>
        </button>
        <button onClick={() => {navigate("/staff");}} 
            className={`${
              path == "/staff" ? "bg-neutral-400 text-white " : "text-zinc-600 hover:bg-neutral-300"
            } h-[4rem] text-md rounded-xl w-full pl-6 `}
          >
            <div className=" flex flex-wrap justify-start px-6 space-x-2 ">
                <UserGroupIcon className="w-5" />
                <span className="-mr-1 font-medium">Staff</span>
            </div>
        </button>
        </div>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
    
    <button onClick={() => {navigate("/");}} 
            className={`${
              path == "/" ? "bg-neutral-400 text-white " : "text-zinc-600 hover:bg-neutral-300"
            } h-[4rem] text-md rounded-xl w-full pl-6 `}
          >
            <div className=" flex flex-wrap justify-start px-6 space-x-2 ">
                <LogoutIcon className="w-5" />
                <span className="-mr-1 font-medium">Log out</span>
            </div>
        </button>
    </div>
</aside>
    </>
  )
}

export default Sidebar