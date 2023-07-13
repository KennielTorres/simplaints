import { NextResponse } from 'next/server'
 
export async function GET() {
    const url = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1//?size=2&date_received_min=2022-01-01&date_received_max=2022-12-30'
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