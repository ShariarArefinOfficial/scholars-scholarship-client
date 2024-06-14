// 

import { useEffect, useState } from "react";

const useScholarShip = (search, page = 1, limit = 6) => {
    const [scholarship, setScholarship] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchScholarshipData =  (url) => {
        try {
            setLoading(true);
           // console.log("Fetching data from URL:", url);
            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.results);
                setScholarship(data.results);
                setLoading(false);
            })
            
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchSearchScholarshipData =  (url) => {
        try {
            setLoading(true);
           // console.log("Fetching data from URL:", url);
            fetch(url)
            .then(res => res.json())
            .then(data => {
                
                setScholarship(data);
                setLoading(false);
            })
            
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSearch = (searchTerm, page, limit) => {
        const url = `${import.meta.env.VITE_URL}/scholarships/${searchTerm}?_page=${page}&_limit=${limit}`;
       // console.log("Search URL:", url);
        fetchSearchScholarshipData(url);
    };

    const getData = (page, limit) => {
        const url = `${import.meta.env.VITE_URL}/scholarship?_page=${page}&_limit=${limit}`;
       // console.log("Data URL:", url);
        fetchScholarshipData(url);
    };

    useEffect(() => {
       // console.log("Current search:", search, "Page:", page, "Limit:", limit);
        if (search) {
            getSearch(search, page, limit);
        } 
        
        if(!search){
           // console.log('love')
            getData(page, limit);
        }
    }, [search, page, limit]);

    return [scholarship, loading];
};

export default useScholarShip;
