import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, genre, year, bounty, status } = body;

    const anime = await db.anime.update({
      where: { id },
      data: {
        title,
        description,
        genre,
        year,
        bounty,
        status
      }
    });

    return NextResponse.json(anime);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update anime' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.anime.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Anime deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete anime' }, { status: 500 });
  }
}