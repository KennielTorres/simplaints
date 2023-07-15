import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
    const currentISODate = new Date()
    const [currentDateOnly] = currentISODate.toISOString().split('T') // should this be on parent and sent on request body if we want it dynamic???
    const startDate = `${currentDateOnly.split('-')[0]}-01-01` // Defaults to January 1st, of current year

    const url = `https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1//?date_received_min=${startDate}&date_received_max=${currentDateOnly}`
    const res = await fetch(url,
        {
            method: 'GET',
            headers: {
                "accept": "application/json"
            }
        },
    )
    const data = await res.json()
  
    return NextResponse.json({ data: data })
}