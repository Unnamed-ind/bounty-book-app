import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const orderBy = {
      [sortBy]: sortOrder,
    };

    const skip = (page - 1) * limit;

    const [animes, total] = await Promise.all([
      db.anime.findMany({
        skip,
        take: limit,
        orderBy: orderBy,
      }),
      db.anime.count(),
    ]);

    return NextResponse.json({
      data: animes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch animes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, genre, year, bounty } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const anime = await db.anime.create({
      data: {
        title,
        description,
        genre,
        year,
        bounty: bounty || 0,
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create anime' }, { status: 500 });
  }
}