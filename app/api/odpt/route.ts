import { NextRequest, NextResponse } from 'next/server'

const ODPT_BASE_URL = 'https://api.odpt.org/api/v4'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')

    if (!endpoint) {
      return NextResponse.json({ error: 'endpoint is required' }, { status: 400 })
    }

    const apiKey = process.env.NEXT_PUBLIC_ODPT_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ODPT API key not configured' }, { status: 500 })
    }

    const query = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (key !== 'endpoint') {
        query.append(key, value)
      }
    })
    query.append('acl:consumerKey', apiKey)

    const url = `${ODPT_BASE_URL}/${endpoint}?${query.toString()}`

    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      const message = await response.text()
      return NextResponse.json({ error: `ODPT API error: ${response.status}`, message }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('[odpt] proxy error', error)
    return NextResponse.json({ error: 'Failed to fetch from ODPT API' }, { status: 500 })
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

