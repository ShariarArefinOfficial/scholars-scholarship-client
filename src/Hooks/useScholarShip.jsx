//import React from 'react';

import { useEffect, useState } from "react";

const useScholarShip = () => {
    const [scholarship, setscholarship] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/scholarship`)
            .then(res => res.json())
            .then(data => {
                setscholarship(data);
                setLoading(false);
            });
    }, [])
    return [scholarship, loading]
};

export default useScholarShip;