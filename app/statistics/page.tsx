'use client'

import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

export default function statsPage(){
    const [categoryState, setCategory] = useState("None")

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
            return data
        }
        catch (err) {
            console.log(err)
            throw(err)
        }
    };

    const {data, isLoading, error} = useQuery({
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
            <div id="stat-container" className="mx-4 md:mx-10">
                <div className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Statistics</div>
                <label htmlFor="#categorySelector">Choose a category:</label>
                <div id="placeholder" className="flex flex-col flex-wrap">
                    <select id="categorySelector" className="max-w-[50%] md:max-w-[25%] outline rounded ml-2" onChange={(e) => {setCategory(e.target.value); console.log(e.target.value)}} defaultValue={"None"}> 
                        <option value={"None"}>---</option>
                        {Object.values(data?.data?.aggregations?.product?.product?.buckets).map((item:any) =>
                            <option key={item.key} value={item.key}>{item?.key}.</option>
                        )}
                    </select>
                </div>
                {/* Example of conditonal rendering. */}
                <div>
                    {(categoryState == "None") &&
                        <p>test</p>
                    }
                </div>

            </div>
        </>
    )
}

