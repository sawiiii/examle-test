import React from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar'
import Axios from "axios";
import makeEndPoint from "../utils/MakeEndPoint";
import Spinner from "./spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';


const ShowSale = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const callApi = () => {
    // console.log(`Cookie :${Cookies.get('token')}`);
    Axios.get(makeEndPoint(`sales/${id}`))
      .then((response) => {
        const Data = response.data;
        setData(Data);
      })
      .catch((error) => {
        console.log(error);
        // navigate.goBack();
      });
  };

  useEffect(() => {
    callApi();
  }, []);

if (data) {
  return (
    <>
    <Sidebar />
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
            <div className="sticky z-10 top-0 h-16 border-b border-neutral-200 bg-white lg:py-2.5">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                    <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Sales</h5>
                </div>
            </div>
            <button className="p-2 ml-5 mt-5" onClick={() => navigate(-1)}>
              <div className="flex flex-wrap justify-start  space-x-2 p-2 ">
                <div>
                  <ChevronLeftIcon className="w-5 mt-0.5" />
                </div>
                <div>Back</div>
              </div>
            </button>
            <div className='m-4 p-4 rounded-lg border-2 shadow-md h-auto overflow-auto'>
              <h3 className='text-bold'>Sale: {data.id}</h3>
              <p>Date Closed: {data.date_closed}</p>
              <p>Zone: {data.zone}</p>
              <p>Waiter:  {data.waiter}</p>
              <p>Cashier:  {data.cashier}</p>
              <p>Table:   {data.table}</p>
              <p>Total: {data.total}</p>
              <p>Diners:  {data.diners}</p> 
              <p>Products: {data.products.map((dat, key) => {
                <div key={key} className='border-2 p-2  text-black'>
                  <p>Category: {dat.category}</p>
                  <p>Price: {dat.price}</p>
                  <p>Name: {dat.name}</p>
                  <p>Quantity: {dat.Quantity}</p>
                </div>
              })}</p>
              <p>Payments: {data.payments.map((dat, key) => {
                <div key={key} className='border-2 p-2 text-black'>
                  <p>Amount: {dat.amount}</p>
                  <p>Method: {dat.type}</p>
                </div>
              })}</p>

              {/* <p>Payments:  {data.payments}</p> */}
            </div>
        </div>
    </>
  )
} else {
  return (
    <>
    <Sidebar />
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="sticky z-10 top-0 h-16 border-b border-neutral-200 bg-white lg:py-2.5">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                  <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Sales</h5>
              </div>
          </div>
          <div className="p-4">
            <Spinner />
          </div>
    </div>
</>
  )
}

}

export default ShowSale