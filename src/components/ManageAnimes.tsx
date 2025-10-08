'use client';

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Scroll, Plus, Edit2, Trash2, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  data: Anime[];
  pagination: PaginationInfo;
}

type FormData = {
  title: string;
  description: string;
  genre: string;
  year: string;
  bounty: string;
  status: 'active' | 'completed' | 'dead';
};

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

const calculateBounty = (score: number, members: number): number => {
  if (!score || !members) return 100;
  const normalizedScore = score / 10;
  const normalizedMembers = Math.log10(Math.max(members, 1000)) / 7.5;
  let combinedScore = Math.min(1, (normalizedScore * 0.7) + (normalizedMembers * 0.3));
  const baseBounty = 100 + (combinedScore * 900);
  const hundreds = Math.floor(baseBounty / 100) * 100;
  const remainder = baseBounty % 100;
  let finalBounty = remainder > 50 ? hundreds + 99 : hundreds;
  if (finalBounty === 0) finalBounty = 100;
  if (finalBounty > 1000) finalBounty = 1000;
  return Math.floor(finalBounty);
};

const ITEMS_PER_PAGE = 12;

export default function ManageAnimes() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      title: '', description: '', genre: '', year: '', bounty: '0', status: 'active'
    }
  });

  const titleQuery = watch('title');

  const fetchAnimes = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/animes?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data: ApiResponse = await response.json();
      setAnimes(data.data || []);
      setPagination(data.pagination);
      setCurrentPage(data.pagination.page);
    } catch (error) {
      console.error('Failed to fetch animes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!titleQuery || (editingId && watch('title') === animes.find(a => a.id === editingId)?.title)) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search-anime?q=${encodeURIComponent(titleQuery)}`);
        const result = await response.json();
        if (result.data) setSearchResults(result.data);
      } catch (error) {
        console.error("Failed to search anime:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [titleQuery, editingId, animes, watch]);

  const handleSelectAnime = (anime: any) => {
    setValue('title', anime.title);
    setValue('description', anime.synopsis || '');
    setValue('year', anime.year?.toString() || '');
    setValue('genre', anime.genres?.map((g: any) => g.name).join(', ') || '');
    const calculatedBounty = calculateBounty(anime.score, anime.members);
    setValue('bounty', calculatedBounty.toString());
    setSearchResults([]);
  };

  const resetFormAndState = () => {
    reset();
    setEditingId(null);
    setIsCreating(false);
    setSearchResults([]);
  };

  const processSubmit = async (data: FormData) => {
    const payload = {
      title: data.title, description: data.description, genre: data.genre,
      year: data.year ? parseInt(data.year) : undefined,
      bounty: data.bounty ? parseInt(data.bounty) : 0,
      status: data.status
    };
    try {
      const url = isCreating ? '/api/animes' : `/api/animes/${editingId}`;
      const method = isCreating ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchAnimes(currentPage);
        resetFormAndState();
      } else {
        console.error(`Failed to ${isCreating ? 'create' : 'update'} anime`);
      }
    } catch (error) {
      console.error(`Failed to submit anime:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bounty?')) {
      try {
        const response = await fetch(`/api/animes/${id}`, { method: 'DELETE' });
        if (response.ok) await fetchAnimes(currentPage);
      } catch (error) {
        console.error('Failed to delete anime:', error);
      }
    }
  };

  const startEdit = (anime: Anime) => {
    setValue('title', anime.title);
    setValue('description', anime.description || '');
    setValue('genre', anime.genre || '');
    setValue('year', anime.year?.toString() || '');
    setValue('bounty', anime.bounty.toString());
    setValue('status', anime.status);
    setEditingId(anime.id);
    setIsCreating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBountyColor = (bounty: number) => {
    if (bounty >= 1000) return 'bg-yellow-500 text-black';
    if (bounty >= 500) return 'bg-purple-500 text-white';
    if (bounty >= 100) return 'bg-blue-500 text-white';
    return 'bg-gray-500 text-white';
  };

  if (loading && animes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-amber-800 font-medieval">Loading manage panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 pb-24">
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scroll className="w-8 h-8" /><h1 className="text-3xl md:text-4xl font-bold font-medieval">Manage Bounty Book</h1><Scroll className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        {(isCreating || editingId) && (
          <Card className="mb-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader><CardTitle className="text-amber-900 flex items-center gap-2">{isCreating ? <Plus className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}{isCreating ? 'Create New Bounty' : 'Edit Bounty'}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="title" className="text-amber-800">Title *</Label>
                    <Input id="title" {...register('title', { required: true })} className="border-amber-300 bg-white" placeholder="Enter anime title to search..." autoComplete="off" />
                    {isSearching && <div className="absolute w-full mt-1 p-2 bg-white border rounded shadow-lg text-sm text-gray-500">Searching...</div>}
                    {searchResults.length > 0 && (
                      <div className="absolute z-10 w-full max-h-60 overflow-y-auto mt-1 bg-white border rounded shadow-lg">
                        {searchResults.map((anime) => (
                          <div key={anime.mal_id} className="p-2 hover:bg-amber-100 cursor-pointer flex items-center gap-3" onClick={() => handleSelectAnime(anime)}>
                            <img src={anime.images.jpg.small_image_url} alt={anime.title} className="w-10 h-14 object-cover rounded" />
                            <div><p className="font-bold text-sm text-amber-900">{anime.title}</p><p className="text-xs text-gray-500">{anime.year}</p></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bounty" className="text-amber-800">Bounty (Gold)</Label>
                    <Input id="bounty" type="number" {...register('bounty')} className="border-amber-300 bg-white" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-amber-800">Description</Label>
                  <Textarea id="description" {...register('description')} className="border-amber-300 bg-white" placeholder="Enter anime description" rows={3} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="genre" className="text-amber-800">Genre</Label>
                    <Input id="genre" {...register('genre')} className="border-amber-300 bg-white" placeholder="e.g., Isekai, Fantasy" />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-amber-800">Year</Label>
                    <Input id="year" type="number" {...register('year')} className="border-amber-300 bg-white" placeholder="2024" />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-amber-800">Status</Label>
                    <select id="status" {...register('status')} className="w-full px-3 py-2 border border-amber-300 rounded-md bg-white text-amber-900 h-10">
                      <option value="active">Active</option><option value="completed">Completed</option><option value="dead">Dead</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className={cn(isCreating ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700", "text-white")}>
                    <Save className="w-4 h-4 mr-2" />{isCreating ? 'Create Bounty' : 'Update Bounty'}
                  </Button>
                  <Button type="button" onClick={resetFormAndState} variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                    <X className="w-4 h-4 mr-2" />Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        {!isCreating && !editingId && (
          <div className="mb-6">
            <Button onClick={() => { reset(); setIsCreating(true); }} className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />Add New Bounty
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animes.map((anime) => (
            <Card key={anime.id} className={cn('border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 transition-all duration-300 hover:shadow-lg hover:border-amber-400', anime.status === 'completed' && 'opacity-75', anime.status === 'dead' && 'bg-gray-100 border-gray-300 opacity-60')}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className={cn('text-sm font-bold text-amber-900 leading-tight', anime.status === 'completed' && 'line-through text-amber-700', anime.status === 'dead' && 'text-gray-500 line-through')}>{anime.title}</CardTitle>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => startEdit(anime)} className="h-8 w-8 p-0 border-amber-300 text-amber-800 hover:bg-amber-100"><Edit2 className="w-3 h-3" /></Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(anime.id)} className="h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-50"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn('text-xs font-bold', getBountyColor(anime.bounty))}>{anime.bounty} Gold</Badge>
                  {anime.genre && (<Badge variant="outline" className="text-xs border-amber-300 text-amber-800">{anime.genre}</Badge>)}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {anime.description && (<p className={cn('text-xs text-amber-700 line-clamp-2', anime.status === 'completed' && 'text-amber-600', anime.status === 'dead' && 'text-gray-400')}>{anime.description}</p>)}
                <div className="mt-2 flex justify-between items-center">
                  {anime.year && (<span className={cn('text-xs text-amber-600', anime.status === 'dead' && 'text-gray-400')}>{anime.year}</span>)}
                  <span className={cn('text-xs font-semibold uppercase', anime.status === 'active' && 'text-green-600', anime.status === 'completed' && 'text-blue-600', anime.status === 'dead' && 'text-gray-500')}>{anime.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1} className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {generatePagination(currentPage, pagination.totalPages).map((page, index) =>
              typeof page === "number" ? (
                <Button key={index} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={cn(currentPage === page ? "bg-amber-800 text-white" : "bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200")}>
                  {page}
                </Button>
              ) : ( <span key={index} className="text-amber-800 font-medium px-1">...</span> )
            )}
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= pagination.totalPages} className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}