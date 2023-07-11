import { NextResponse } from 'next/server'
 
export async function GET() {
    const url = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1//?size=10'
    const res = await fetch(url,
        {
            method: 'GET',
            headers: {
                "accept": "application/json"
            }
        },
    )
    const data = await res.json()
  
    return NextResponse.json(JSON.stringify({ data: data }))
}