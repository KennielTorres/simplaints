'use client'

import { useQuery } from "@tanstack/react-query"
import { Complaints } from "@/types/complaints";

export default function statsPage(){

    const fetchAllData = async () => {
        try {
            const res = await fetch('/api/handleData',
                {
                    method: 'GET',
                    headers: {
                        "accept": "application/json"
                    }
                },
            )
            const data = await res.json()
            // console.log(data) // DEBUG
            return data
        }
        catch (err) {
            console.log(err)
            throw(err)
        }
    };

    const {data, isLoading, error} = useQuery<Complaints, Error>({
        queryKey: ['allData'],
        queryFn: fetchAllData,
    });

    // @TODO: Replace with loading component
    if (isLoading) {
        return(
            <p>Loading...</p>
        )
    }

    // @TODO: Replace with error component
    if (error) {
        return(
            <p>An error occurred!</p>
        )
    }

    return(
        <>
            <div>Statistics</div>
            <p>Response =  
                {JSON.stringify(data)}
            </p>
        </>
    )
}

