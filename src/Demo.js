import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Demo() {
  const [data, setData] = useState(null);
  const [renderData, setRenderData] = useState(null);
  const [query, setQuery] = useState();
  const [show,setShow] = useState(false);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=5").then((res) => {
      setData(res.data.products);
      setRenderData(res.data.products);
    });
  }, []);



function search(e){
   
    const inputSearch = e.target.value.toLowerCase();
    if(inputSearch.length>0){
      setShow(true)
        const afterSearch = renderData.filter(item=>item.title.toLowerCase().includes(inputSearch))
        setData(afterSearch);
    }else{
        setData(renderData)
    }
   
}

function clickSet (e){
  const tag = document.querySelector('#inputTag');
  tag.value = '';
  tag.value = e.target.value;
}

  return (
    <div>
      <h1>from demo component</h1>
      
      {
        // <select >
        //     {
        //         data!=null && (
        //             data.map((item,index)=>{
        //                 return (
        //                     <>
        //                     <option key={index} value={item.title}>{item.title}</option>
        //                     </>
        //                 )
        //             })
        //         )
        //     }
        // </select>
      }
      <input id="inputTag" placeholder="search..." onClick={()=>{setShow(!show)}} onChange={(e)=>search(e)}/>
      {
        data!=null && show && (
          data.map((item,index)=>{
            return (
                <>
                <option key={index} onClick={(e)=>clickSet(e)} value={item.title}>{item.title}</option>
                </>
            )
        })
        )
      }
     

      {/* {data != null &&
        data.map((item, index) => {
          return (
            <>
              <li key={index} className="listItems" value={item.title}>
                {item.title}
              </li>
            </>
          );
        })} */}
    </div>
  );
}
