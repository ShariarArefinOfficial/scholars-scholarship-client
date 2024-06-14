//import React from 'react';

import { useEffect, useState } from "react";
import axios from 'axios'


const useScholarShip = (search) => {
    const [scholarship, setscholarship] = useState([]);
    const [loading, setLoading] = useState(true);
    //const query = new URLSearchParams(searchParams).toString();
   // console.log(query)
   const getSearch=()=>{
   // console.log('search is start')
   // console.log(search)


    //==Fetch
    fetch(`${import.meta.env.VITE_URL}/scholarships/${search}`)
    .then(res => res.json())
    .then(data => {
        setscholarship(data);
        setLoading(false);
    });

    }

    const getData=()=>{
        console.log('get data')
        fetch(`${import.meta.env.VITE_URL}/scholarship`)
        .then(res => res.json())
        .then(data => {
            setscholarship(data);
            setLoading(false);
        });
    }

    useEffect(() => {
       if(!(search)){
       // console.log(search)
        getData();
       }
    }, [])
    useEffect(()=>{
       // console.log(search)
        
        if(search){
            
          getSearch(search)
                  }
      },[search])
    return [scholarship, loading]
};

export default useScholarShip;