import React, { useEffect, useState } from "react";
import Axios from "axios";
import makeEndPoint from "../utils/MakeEndPoint";
import Spinner from "./spinner/Spinner";
import Sidebar from "./Sidebar";

const Landing = () => {
  const [spinner, setspinner] = useState(false);
  const [data, setData] = useState({
    currentSales: 0,
    waiters: 0,
    cashiers: 0,
    billsNumber: 0,
    tableAverage: 0,
    counterCards: {
      bills: 0,
      credit: 0, 
      debit: 0, 
      cash: 0,
    },
    dailySales: 0,
    staff: 0,
    products: [],
    totalProducts:  0,
  });

  const callApi = () => {
    // console.log(`Cookie :${Cookies.get('token')}`);
    Axios.get(makeEndPoint(""))
      .then((response) => {
        const Data = response.data;
        setData(Data);
        setspinner(false);
      })
      .catch((error) => {
        console.log(error);
        // navigate.goBack();
      });
  };

  useEffect(() => {
    setspinner(true);
    callApi();
  }, []);

  if (data) {
    return (
      <>
      {/*  component  */}
      <Sidebar path={'/dashboard'} />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="sticky z-10 top-0 h-16 border-b border-neutral-200 bg-white lg:py-2.5">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                  <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
              </div>
          </div>
    {/* conteiners  */}
          <div className="px-6 pt-6 2xl:container">
              <p className="mb-1 border-2 p-2 rounded-md">Está seteada una fecha por defecto, para que funcione, ya que no existen valores para la fecha actual {"-->"} 2019-03-20 15:31:42</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="md:col-span-2 lg:col-span-1" >
                          {/* card 1 */}
                      <div className=" py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white shadow-md">
                          <div>
                              <h5 className="text-xl text-gray-600 text-center">Sales</h5>
                              <div className="mt-2 flex justify-center gap-4">
                                  <h3 className="text-3xl font-bold text-gray-700">${ spinner ? <Spinner /> : data.currentSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }</h3>
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
                                  <h3 className="text-3xl font-bold text-gray-700">{ spinner ? <Spinner /> : data.counterCards.bills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }</h3>
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
                      <div className="h-[305px] py-8 px-6 rounded-xl border border-gray-200 bg-white shadow-md overflow-scroll">
                          <h5 className="text-xl text-gray-700">Products</h5>
                          <div className="my-8">
                              <h1 className="text-5xl font-bold text-gray-800">{ spinner ? <Spinner /> : data.totalProducts }</h1>
                              <span className="text-gray-500">products</span>
                          </div>
                          <table className="mt-6 -mb-2 w-full text-gray-600">
                              <thead className="border-b text-sm">
                                    <tr>
                                      <th scope="col" className="text-sm font-medium text-gray-500 px-2 py-2 text-left">
                                        Product
                                      </th>
                                      <th scope="col" className="text-sm font-medium text-gray-500 px-2 py-2 text-left">
                                        Price
                                      </th>
                                    </tr>
                              </thead>
                              <tbody>
                                {data.products.map((data,key) => {
                                  return(
                                  <tr key={key}>
                                      <td className="py-2 text-sm">{data.product}</td>
                                      <td className="text-gray-500  text-sm text-right">{data.valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                  </tr>
                                );})}
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
                                  <h3 className="text-3xl font-bold text-gray-700">{ spinner ? <Spinner /> : data.staff}</h3>
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
      </>
    )
  } else {
    return (
      <>
          <Sidebar path={'/dashboard'} /> 
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