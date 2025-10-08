'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Skull, Scroll } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PUT } from '@/app/api/animes/[id]/route';

interface Anime {
  id: string;
  title: string;
  description?: string;
  genre?: string;
  year?: number;
  status: 'active' | 'completed' | 'dead';
  bounty: number;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  data: Anime[];
  pagination: Pagination;
}

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export default function BountyBook() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchAnimes = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/animes?page=${page}&limit=8&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const data: ApiResponse = await response.json();
      setAnimes(data.data);
      setPagination(data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch animes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes(currentPage);
  }, [currentPage, sortBy, sortOrder]);

  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-');
    setSortBy(by);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleAnimeClick = async (animeId: string, currentStatus: 'active' | 'completed' | 'dead') => {
    let newStatus: 'active' | 'completed' | 'dead';
    if (currentStatus === 'active'){
      newStatus = 'completed';
    } else if (currentStatus === 'completed'){
      newStatus='dead';
    } else {
      newStatus = 'active';
    }
    setAnimes(currentAnimes => 
      currentAnimes.map(anime =>
        anime.id === animeId ? { ...anime, status: newStatus } : anime
      )
    );
    try{
      const response = await fetch(`/api/animes/${animeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({status: newStatus}),
      });
      if (!response.ok){
        console.error('Failed to update anime status on server');
        throw new Error('Server update failed');
      }
    } catch (error){
      console.error('Failed to update anime status', error);
      setAnimes(currentAnimes =>
        currentAnimes.map(anime =>
          anime.id === animeId ? { ...anime, status: currentStatus}: anime
        )
      );
    }
  };

  const handleAnimeDoubleClick = async (animeId: string) => {
    try {
      const response = await fetch(`/api/animes/${animeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'dead' }),
      });

      if (response.ok) {
        await fetchAnimes(currentPage);
      }
    } catch (error) {
      console.error('Failed to update anime status:', error);
    }
  };

  const getBountyColor = (bounty: number) => {
    if (bounty >= 1000) return 'bg-yellow-500 text-black';
    if (bounty >= 500) return 'bg-purple-500 text-white';
    if (bounty >= 100) return 'bg-blue-500 text-white';
    return 'bg-gray-500 text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-amber-800 font-medieval">Loading bounty book...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scroll className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold font-medieval">
              Bounty Book
            </h1>
            <Scroll className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 pb-24">
        <div className="flex justify-end mb-4">
          <Select onValueChange={handleSortChange} defaultValue="createdAt-desc">
            <SelectTrigger
              className="w-[220px] font-medieval bg-amber-100 border-2 border-amber-300 text-amber-900 hover:bg-amber-200 focus:ring-amber-500 transition-all"
            >
              <SelectValue placeholder="Urutkan Berdasarkan" />
            </SelectTrigger>
            <SelectContent
              className="font-medieval bg-amber-50 border-amber-300 text-amber-900"
            >
              <SelectItem value="createdAt-desc" className="cursor-pointer hover:bg-amber-200">
                Bounty Terbaru
              </SelectItem>
              <SelectItem value="title-asc" className="cursor-pointer hover:bg-amber-200">
                Nama (A-Z)
              </SelectItem>
              <SelectItem value="title-desc" className="cursor-pointer hover:bg-amber-200">
                Nama (Z-A)
              </SelectItem>
              <SelectItem value="bounty-desc" className="cursor-pointer hover:bg-amber-200">
                Bounty Tertinggi
              </SelectItem>
              <SelectItem value="bounty-asc" className="cursor-pointer hover:bg-amber-200">
                Bounty Terendah
              </SelectItem>
              <SelectItem value="year-desc" className="cursor-pointer hover:bg-amber-200">
                Tahun Terbaru
              </SelectItem>
              <SelectItem value="year-asc" className="cursor-pointer hover:bg-amber-200">
                Tahun Terlama
              </SelectItem>
              <SelectItem value="status-asc" className="cursor-pointer hover:bg-amber-200">
                Status (A-Z)
              </SelectItem>
              <SelectItem value="status-desc" className="cursor-pointer hover:bg-amber-200">
                Status (Z-A)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {animes.map((anime) => (
            <Card
              key={anime.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer',
                'border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
                'flex flex-col',
                anime.status === 'completed' && 'opacity-75',
                anime.status === 'dead' && 'bg-gray-100 border-gray-300 opacity-60'
              )}
              onClick={() => handleAnimeClick(anime.id, anime.status)}
              onDoubleClick={() => handleAnimeDoubleClick(anime.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className={cn('text-sm md:text-base font-bold text-amber-900 leading-tight', anime.status === 'completed' && 'line-through text-amber-700', anime.status === 'dead' && 'text-gray-500 line-through')}>
                    {anime.title}
                  </CardTitle>
                  {anime.status === 'dead' && (<Skull className="w-5 h-5 text-gray-500 flex-shrink-0" />)}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn('text-xs font-bold', getBountyColor(anime.bounty))}>
                    {anime.bounty} Gold
                  </Badge>
                  {anime.genre && (<Badge variant="outline" className="text-xs">{anime.genre}</Badge>)}
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col flex-grow">
                <div>
                  {anime.description && (
                    <p className={cn('text-xs text-amber-700 line-clamp-3', anime.status === 'completed' && 'text-amber-600', anime.status === 'dead' && 'text-gray-400')}>
                      {anime.description}
                    </p>
                  )}
                  {anime.year && (
                    <p className={cn('text-xs text-amber-600 mt-2', anime.status === 'dead' && 'text-gray-400')}>
                      Year: {anime.year}
                    </p>
                  )}
                </div>
                <div className="mt-auto pt-3 border-t border-amber-200">
                  <p className={cn('text-xs font-semibold', anime.status === 'active' && 'text-green-600', anime.status === 'completed' && 'text-blue-600', anime.status === 'dead' && 'text-gray-500')}>
                    Status: {anime.status === 'active' ? '🔴 Active Bounty' : anime.status === 'completed' ? '✅ Completed' : '💀 Dead'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAnimes(currentPage - 1)}
              disabled={currentPage <= 1}
              className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {generatePagination(currentPage, pagination.totalPages).map(
              (page, index) =>
                typeof page === "number" ? (
                  <Button
                    key={index}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => fetchAnimes(page)}
                    className={
                      currentPage === page
                        ? "bg-amber-800 text-white"
                        : "bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
                    }
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={index} className="text-amber-800 font-medium px-1">
                    ...
                  </span>
                )
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAnimes(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}