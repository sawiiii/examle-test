import React, { useEffect, useState } from "react";
import Axios from "axios";
import makeEndPoint from "../utils/MakeEndPoint";
import Spinner from "./spinner/Spinner";
import Sidebar from "./Sidebar";

const Landing = () => {
  const [data, setData] = useState();

  const callApi = () => {
    // console.log(`Cookie :${Cookies.get('token')}`);
    Axios.get(makeEndPoint(""))
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
      {/*  component  */}
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="sticky z-10 top-0 h-16 border-b border-neutral-200 bg-white lg:py-2.5">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                  <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
              </div>
          </div>
    {/* conteiners  */}
          <div className="px-6 pt-6 2xl:container">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="md:col-span-2 lg:col-span-1" >
                          {/* card 1 */}
                      <div className=" py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white shadow-md">
                          <div>
                              <h5 className="text-xl text-gray-600 text-center">Sales</h5>
                              <div className="mt-2 flex justify-center gap-4">
                                  <h3 className="text-3xl font-bold text-gray-700">${data.currentSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</h3>
                              </div>
                              <span className="block text-center text-gray-500">made on this month</span>
                          </div>
                          <table className="w-full text-gray-600">
                              <tbody>
                                  <tr>
                                      <td className="py-2">Daily Sales</td>
                                      <td className="text-gray-500">$ {data.dailySales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                      
                                  </tr>
                                  <tr>
                                      <td className="py-2">Monthly Bills</td>
                                      <td className="text-gray-500">{data.billsNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                  </tr> 
                                  <tr>
                                      <td className="py-2">Average cost for table</td>
                                      <td className="text-gray-500">$ {data.tableAverage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                  </tr>
                              </tbody>
                          </table> 
                      </div>
                  </div>
                  <div className="md:col-span-2 lg:col-span-1" >
                          {/* card 2 */}
                      <div className=" py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white shadow-md">
                          <div>
                              <h5 className="text-xl text-gray-600 text-center">Payments</h5>
                              <div className="mt-2 flex justify-center gap-4">
                                  <h3 className="text-3xl font-bold text-gray-700">{data.counterCards.bills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</h3>
                              </div>
                              <span className="block text-center text-gray-500">made on this month</span>
                          </div>
                          <table className="mt-6 w-full text-gray-600">
                              <tbody>
                                  <tr>
                                      <td className="py-2">Credit</td>
                                      <td className="text-gray-500">{data.counterCards.credit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                      
                                  </tr>
                                  <tr>
                                      <td className="py-2">Debit</td>
                                      <td className="text-gray-500">{data.counterCards.debit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                  </tr>
                                  <tr>
                                      <td className="py-2">Cash</td>
                                      <td className="text-gray-500">{data.counterCards.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                  </tr>
                              </tbody>
                          </table> 
                      </div>
                  </div>
                  <div>
                    {/* card 3 */}
                      <div className=" py-8 px-6 rounded-xl border border-gray-200 bg-white shadow-md">
                          <h5 className="text-xl text-gray-700">Products</h5>
                          <div className="my-8">
                              <h1 className="text-5xl font-bold text-gray-800">64,5%</h1>
                              <span className="text-gray-500">Compared to last week $13,988</span>
                          </div>
                          
                          <table className="mt-6 -mb-2 w-full text-gray-600">
                              <tbody>
                                  <tr>
                                      <td className="py-2">From new users</td>
                                      <td className="text-gray-500">896</td>
                                      
                                  </tr>
                                  <tr>
                                      <td className="py-2">From old users</td>
                                      <td className="text-gray-500">1200</td>
                                        
                                  </tr>
                              </tbody>
                          </table>   
                      </div>
                  </div>
                  <div>
                    {/* card 4 */}
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white shadow-md">
                    
                          <div>
                              <h5 className="text-xl text-gray-600 text-center">Staff</h5>
                              <div className="mt-2 flex justify-center gap-4">
                                  <h3 className="text-3xl font-bold text-gray-700">{data.staff}</h3>
                              </div>
                              <span className="block text-center text-gray-500">beetwen cashiers and waiters</span>
                          </div>
                          <table className="w-full text-gray-600">
                              <tbody>
                                  <tr>
                                      <td className="py-2">Cashiers</td>
                                      <td className="text-gray-500">{data.cashiers}</td>
                                      
                                  </tr>
                                  <tr>
                                      <td className="py-2">Waiters</td>
                                      <td className="text-gray-500">{data.waiters}</td>
                                  </tr>
                                  {/* <tr>
                                      <td className="py-2">Other</td>
                                      <td className="text-gray-500">12</td>
                                      
                                  </tr> */}
                              </tbody>
                          </table> 
                        </div>
                      </div>
              </div>
          </div>
    </div>
      {/* <div className="w-full h-screen bg-slate-100 p-10 flex flex-col items-center">
          <hi className="text-xl p-4 rounded bg-slate-200 shadow-md">La pikada de la esquina</hi>
        <div className="shadow-md w-4/5 flex flex-col mt-4 p-6 items-start rounded bg-slate-200">
          <p className="text-xl">Buen dia Antonio</p>
          <p>Sales</p>
          <div className="flex flex-row justify-center w-full p-4 space-x-2">
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">$ {data.currentSales}</p>
              <p className="text-sm">On Sell this month</p>
              <button className="text-sm rounded bg-sky-300 p-2 hover:bg-sky-400">View other months</button>
            </div>
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">{data.currentSales}</p>
              <p className="text-sm">Services on this month</p>
              <button className="text-sm rounded bg-sky-300 p-2 hover:bg-sky-400">View other months</button>
            </div>
          </div>
          <p>Staff</p>
          <div className="flex flex-row justify-center w-full p-4 space-x-2">
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">{data.waiters}</p>
              <p className="text-sm">Waiters</p>
              <button className="text-sm rounded bg-orange-300 p-2 hover:bg-orange-400">View Waiters</button>
            </div>
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">{data.cashiers}</p>
              <p className="text-sm">Cashiers</p>
              <button className="text-sm rounded bg-orange-300 p-2 hover:bg-orange-400">View Cashiers</button>
            </div>
          </div>
          <p>Products</p>
          <div className="flex flex-row justify-center w-full p-4 space-x-2">
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">{data.waiters}</p>
              <p className="text-sm">Waiters</p>
              <button className="text-sm rounded bg-green-300 p-2 hover:bg-green-400">View Waiters</button>
            </div>
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">{data.cashiers}</p>
              <p className="text-sm">Cashiers</p>
              <button className="text-sm rounded bg-green-300 p-2 hover:bg-green-400">View Cashiers</button>
            </div>
            <div className="w-auto p-4 bg-slate-300 rounded flex flex-col items-center">
              <p className="text-xl">$ {data.currentSales}</p>
              <p className="text-sm">On Sell this month</p>
              <button className="text-sm rounded bg-green-300 p-2 hover:bg-green-400">View other months</button>
            </div>
          </div>
        </div>
      </div> */}
      </>
    )
  } else {
    return (
      <>
          <Sidebar /> 
          <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
            <div className="sticky z-10 top-0 h-16 border-b border-neutral-200 bg-white lg:py-2.5">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                    <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
                </div>
            </div>
            <div className="px-6 pt-6 2xl:container">

            <Spinner />
            Loading...
            </div>
          </div>
      </>
    )
  }
  
}

export default Landing