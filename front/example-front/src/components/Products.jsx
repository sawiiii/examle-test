import React, { useEffect, useState } from "react";
import Axios from "axios";
import makeEndPoint from "../utils/MakeEndPoint";
import Sidebar from './Sidebar'
import Spinner from "./spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState({
    products: [],
    data: []
  });
  const [products, setProducts] = useState([]);
  const [fields, setFields] = useState({
    category: '',
  });
  const navigate = useNavigate();

  const callApi = () => {
    // console.log(`Cookie :${Cookies.get('token')}`);
    Axios.get(makeEndPoint("products"))
      .then((response) => {
        const Data = response.data;
        setData(Data);
        // setProducts(Data.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate.goBack();
      });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // console.log(`Cookie :${Cookies.get('token')}`);
    const config2 = {
      params: { category: fields.category },
    };
    console.log(config2);
    Axios.get(makeEndPoint("products/filter"), config2)
      .then((response) => {
        const Data = response.data;
        setProducts(Data);
        console.log(products);
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
                  <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Products</h5>
              </div>
          </div>
          <div className=' m-4 p-4 rounded-lg'>
            <div className=' shadow-md p-2 w-auto flex flex-row items-center rounded-md'>
              <p className='text-sm mr-2'>Filters</p>
              <form onSubmit={handleFilter}>
                {/* category */}
                <select
                  onChange={(e) => {
                    setFields({ ...fields, category: e.target.value });
                  }}
                  className="text-black border-2 rounded ml-2 py-1.5 px-6 text-sm"
                > 
                <option className="text-sm" value=''>Categories</option>
                {data.products.map((data, key) => {
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
                {/* <button className='bg-sky-600 rounded-lg text-lg px-4 py-2 hover:bg-transparent hover:text-black hover:bg-slate-300 border-sky-600'>Search</button> */}
              </form>
            </div>
            <div className="border-2 my-2 p-2 text-sm rounded-md shadow-sm">
                Stats
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
                            Name
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Category
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Price
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((data, key) => {
                          return (
                            <tr key={key} className="border-b">
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.name}
                              </td> 
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.category}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
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


export default Products