import React, { useEffect, useState } from "react";
import Axios from "axios";
import makeEndPoint from "../utils/MakeEndPoint";
import Sidebar from './Sidebar'
import Spinner from "./spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const [data, setData] = useState({
    dates: {
    days: [],
    months: [],
    years: []
    },
    data: [],
    totalSales: 0,
    AverageByTable: 0,
    AverageDinersByTable: 0,
    earnByProducts: [],
  });
  const [sales, setsales] = useState([]);
  const [spin, setspin] = useState(false);
  const [fields, setFields] = useState({
    day: '',
    month: '',
    year: ''
  });
  const navigate = useNavigate();

  const callApi = () => {
    // console.log(`Cookie :${Cookies.get('token')}`);
    Axios.get(makeEndPoint("sales"))
      .then((response) => {
        const Data = response.data;
        setData(Data);
        setsales(Data.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate.goBack();
      });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setspin(true);
    // console.log(`Cookie :${Cookies.get('token')}`);
    const config2 = {
      params: { day: fields.day, month: fields.month, year: fields.year },
    };
    console.log(config2);
    Axios.get(makeEndPoint("sales/filter"), config2)
      .then((response) => {
        const Data = response.data;
        setData(Data);
        setsales(Data.data);
        setspin(false);
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
          <div className=' m-4 p-4 rounded-lg'>
            <div className=' shadow-md p-2 w-auto flex flex-row items-center rounded-md'>
              <p className='text-sm mr-2'>Filters</p>
              <form onSubmit={handleFilter}>
                {/* days */}
                <select
                  onChange={(e) => {
                    setFields({ ...fields, day: e.target.value });
                  }}
                  className="text-black border-2 rounded ml-2 py-1.5 px-6 text-sm"
                > 
                <option className="text-sm" value=''>Day</option>
                {data.dates.days.map((data, key) => {
                  return (
                    <option key={key} className="text-sm" value={data}>{data}</option>
                  );
                })}
                </select>
                {/* months */}
                <select
                  onChange={(e) => {
                    setFields({ ...fields, month: e.target.value });
                  }}
                  className="text-black border-2 rounded ml-2 py-1.5 px-6 text-sm"
                > 
                <option className="text-sm" value=''>Month</option>
                {data.dates.months.map((data, key) => {
                  return (
                    <option key={key} className="text-sm" value={data}>{data +1 }</option>
                  );
                })}
                </select>
                {/* years */}
                <select
                  onChange={(e) => {
                    setFields({ ...fields, year: e.target.value });
                  }}
                  className="text-black border-2 rounded ml-2 py-1.5 px-6 text-sm"
                > 
                <option className="text-sm" value=''>Year</option>
                {data.dates.years.map((data, key) => {
                  return (
                    <option key={key} className="text-sm" value={data}>{data}</option>
                  );
                })}
                </select>
                <button
                  type="submit"
                  className="inline-block ml-2 px-6 py-2 text-sm bg-yellow-500 text-white font-medium leading-tight  rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Search
                </button>
                { spin?
                <svg
                role="status"
                className="inline w-6 h-8 ml-2 text-gray-200 animate-spin dark:text-white fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg> 
                : <></>}
                {/* <button className='bg-sky-600 rounded-lg text-lg px-4 py-2 hover:bg-transparent hover:text-black hover:bg-slate-300 border-sky-600'>Search</button> */}
              </form>
            </div>
            <div className="border-2 my-2 p-2 text-sm rounded-md shadow-sm">
                <p className="p-2">Information</p>
                <div className="flex flex-wrap items-center justify-center space-x-2">
                  <div className="w-1/3 py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white shadow-md">
                            <div>
                                <h5 className="text-xl text-gray-600 text-center">Sales</h5>
                                <div className="mt-2 flex justify-center gap-4">
                                    <h3 className="text-3xl font-bold text-gray-700">{data.totalSales}</h3>
                                </div>
                                <span className="block text-center text-gray-500">sold on this dates</span>
                            </div>
                            <table className="w-full text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-2">Average cost for table</td>
                                        <td className="text-gray-500">{data.AverageByTable}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Average diners for table</td>
                                        <td className="text-gray-500">{data.AverageDinersByTable}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="py-2">Monthly Bills</td>
                                        <td className="text-gray-500">dff</td>
                                    </tr> 
                                    <tr>
                                        <td className="py-2">Average cost for table</td>
                                        <td className="text-gray-500">$sdfs</td>
                                    </tr> */}
                                </tbody>
                            </table> 
                  </div>
                  <div className="w-1/3 h-[254px] py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white shadow-md overflow-scroll">
                            <div>
                                <h5 className="text-xl text-gray-600 text-center">Earn by product</h5>
                                <span className="block text-center text-gray-500 text-sm">Scroll down to see more</span>
                            </div>
                            <table className="w-full text-gray-600">
                                <tbody>
                                {data.earnByProducts.map((data, key) => {
                                    return (
                                      <tr key={key}>
                                        <td className="py-2">{data.product}</td>
                                        <td className="text-gray-500">{data.valor}</td>  
                                      </tr>
                                    );
                                })}
                                
                                </tbody>
                            </table> 
                  </div>
                </div>
                
            </div>
            <div className="border-2 my-2 p-2 text-sm rounded-md">
              Sales - Select filters to search sales
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Table
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Diners
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Bill Total
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Date Closed
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.map((data, key) => {
                          return (
                            <tr key={key} className="border-b">
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.table}
                              </td> 
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.diners}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.date_closed}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <button
                                  onClick={() => {
                                    navigate(`/sales/${data.id}`);
                                  }}
                                  className="inline-block ml-2 px-6 py-2 text-sm text-black font-medium leading-tight  rounded shadow-md hover:bg-yellow-600 hover:text-white hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
                                >View
                              </button>
                  
                              </td>
                            </tr>
                          );
                        })}
                        
                        </tbody>
                    </table>
                  </div>
                </div>
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

export default Sales