import React from 'react'
import { CollectionIcon, CreditCardIcon, UserGroupIcon, ChartBarIcon, ShoppingBagIcon, UserIcon, LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
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

        <ul className="tracking-wide mt-8">
            <li>
                <button onClick={() => {
                    navigate("/dashboard");
                    }} className="px-10 py-3 my-2 flex items-center space-x-4  w-full  rounded-md text-gray-600 group">
                <ChartBarIcon className='w-5' />
                    <span className="-mr-1 font-medium">Dashboard</span>

                </button>
                    
                
            </li>
            <li>
                <button onClick={() => {
                        navigate("/sales");
                        }} className="px-10 py-3 my-2 flex items-center space-x-4  w-full  rounded-md text-gray-600 group">
                    <CollectionIcon className='w-5' />
                        <span className="-mr-1 font-medium">Sales</span>

                </button>
            </li>
            <li>
            <button onClick={() => {
                        navigate("/cards");
                        }} className="px-10 py-3 my-2 flex items-center space-x-4  w-full  rounded-md text-gray-600 group">
                    <CreditCardIcon className='w-5' />
                        <span className="-mr-1 font-medium">Payments</span>

                </button>
            </li>
            <li>
            <button onClick={() => {
                        navigate("/products");
                        }} className="px-10 py-3 my-2 flex items-center space-x-4  w-full  rounded-md text-gray-600 group">
                    <ShoppingBagIcon className='w-5' />
                        <span className="-mr-1 font-medium">Products</span>

                </button>
            </li>
            <li>
            <button onClick={() => {
                        navigate("/staff");
                        }} className="px-10 py-3 my-2 flex items-center  w-full space-x-4 rounded-md text-gray-600 group">
                    <UserGroupIcon className='w-5' />
                        <span className="-mr-1 font-medium">Staff</span>

                </button>
            </li>
        </ul>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
    <button onClick={() => {
                        navigate("/");
                        }} className="px-10 py-3 my-2 flex items-center space-x-4  rounded-md text-gray-600 group">
                    <LogoutIcon className='w-5' />
                        <span className="-mr-1 font-medium">Log out</span>

                </button>
    </div>
</aside>
    </>
  )
}

export default Sidebar