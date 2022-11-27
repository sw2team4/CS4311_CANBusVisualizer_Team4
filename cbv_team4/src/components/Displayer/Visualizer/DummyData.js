import React,{useState,useEffect} from 'react';

function DummyData() {
    const [data,setData]=useState([]);
    const getData=()=>{
      fetch('DummyData.json'
      ,{
        headers : { 
          'id': 'book/json',
          'language': 'book/json',
          'edition': 'book/json',
          'author': 'book/json'
         }
      }
      )
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          setData(myJson)
        });
    }
    useEffect(()=>{
      getData()
    },[])
  return (
    <div className="">
     {
       data && data.length>0 && data.map((item)=><p>{item.about}</p>)
     }
    </div>  )
}

export default DummyData