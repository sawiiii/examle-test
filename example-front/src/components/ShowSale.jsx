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
    Axios.get(makeEndPoint(`sales/${id}`))
      .then((response) => {
        const Data = response.data;
        setData(Data);
      })
      .catch((error) => {
        console.log(error);
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
                    <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Sale Information</h5>
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
              <p>Total: $ {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
              <p>Zone: {data.zone}</p>
              <p>Table:   {data.table}</p>
              <p>Diners:  {data.diners}</p> 
              <p>Waiter:  {data.waiter}</p>
              <p>Cashier:  {data.cashier}</p>
              <p>Products:</p>
              <div className='rounded-md border-2 max-h-[200px] overflow-scroll'>
                <table className="w-full text-gray-600 text-sm ">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Product
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                        Price
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                        Category
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                        Quantity
                      </th>
                    </tr>
                                  <tbody>
                  {data.products.map((dat, key) => {
                  return (
                    <tr key={key}>
                      <td className="pl-4            ">{dat.name}</td>
                      <td className="text-gray-500 text-center">{dat.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td> 
                      <td className="text-gray-500 text-center">{dat.category}</td> 
                      <td className="text-gray-500 text-center">{dat.quantity}</td>  
                    </tr>
                    // <div key={key} className='border-2 p-2 text-black rounded-md min-w-[150px]'>
                    //   <p>Category: {dat.category}</p>
                    //   <p>Price: {dat.price}</p>
                    //   <p>Name: {dat.name}</p>
                    //   <p>Quantity: {dat.quantity}</p>
                    // </div>
                  
                );})}
                </tbody>
                </table>
              </div>

              <p>Payments:  </p>
              <div className='flex flex-wrap p-2 rounded-md border-2 space-x-2'> {data.payments.map((dat, key) => {
                return(
                  <div key={key} className='border-2 p-2 text-black text-sm rounded-md min-w-[150px]'>
                    <p>Amount: $ {dat.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                    <p>Method: {dat.type}</p>
                  </div>
                );
              })}</div>
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