// src/app/api/search-anime/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q'); // 'q' adalah query pencarian

    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    // Panggil Jikan API
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Jikan API');
    }

    const data = await response.json();

    // Kirim balik hasilnya ke front-end kita
    return NextResponse.json(data);

  } catch (error) {
    console.error('API search-anime error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}