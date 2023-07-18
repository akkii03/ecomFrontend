import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { allproductAPi } from './Apis/allApis';
import axios from 'axios';
import Loading from "./Loading";
import Product from "./Product";

export default function SearchProduct() {
    const {query} = useParams();
    const[loading,setLoading] = useState(true);
    const [searchData,setSearchData] = useState(null);

    useEffect(()=>{
        axios.get(`${allproductAPi}?name=${query}`)
        .then(res=>{console.log(res.data.product)
        setSearchData(res.data.product);
        setLoading(false)
        })
        .catch(err=>console.log(err.message));
    },[query])
  return (
   <>
    {
      loading?(<Loading/>):(
        <>{
          searchData.map((item,index)=>{
            return (<Product key={index} product={item}/>)
          })
        }
        </>)
    }
   </>
  )
}
