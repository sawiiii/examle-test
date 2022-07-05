import React, { useEffect, useState } from "react";
import Axios from "axios";
import makeEndPoint from "../utils/MakeEndPoint";
import Spinner from "./spinner/Spinner";

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
      <div className="w-full h-screen bg-slate-100 p-10 flex flex-col items-center">
        <div className="shadow-xl w-4/5 p-4 flex flex-col items-center rounded-lg bg-slate-200">
          <hi className="text-xl">Hola {data}</hi>
        </div>
      </div>
      </>
    )
  } else {
    return (
      <>
          <div className="border-2 p-4">
          <Spinner />
            Loading...</div>
      </>
    )
  }
  
}

export default Landing