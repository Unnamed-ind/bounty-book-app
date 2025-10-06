'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Scroll, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
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

export default function ManageAnimes() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    year: '',
    bounty: '',
    status: 'active' as 'active' | 'completed' | 'dead'
  });

  const fetchAnimes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/animes?limit=100');
      const data = await response.json();
      setAnimes(data.data || []);
    } catch (error) {
      console.error('Failed to fetch animes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      genre: '',
      year: '',
      bounty: '',
      status: 'active'
    });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/animes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          genre: formData.genre,
          year: formData.year ? parseInt(formData.year) : undefined,
          bounty: formData.bounty ? parseInt(formData.bounty) : 0,
          status: formData.status
        }),
      });

      if (response.ok) {
        await fetchAnimes();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to create anime:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/animes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          genre: formData.genre,
          year: formData.year ? parseInt(formData.year) : undefined,
          bounty: formData.bounty ? parseInt(formData.bounty) : 0,
          status: formData.status
        }),
      });

      if (response.ok) {
        await fetchAnimes();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update anime:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this anime bounty?')) {
      try {
        const response = await fetch(`/api/animes/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchAnimes();
        }
      } catch (error) {
        console.error('Failed to delete anime:', error);
      }
    }
  };

  const startEdit = (anime: Anime) => {
    setFormData({
      title: anime.title,
      description: anime.description || '',
      genre: anime.genre || '',
      year: anime.year?.toString() || '',
      bounty: anime.bounty.toString(),
      status: anime.status
    });
    setEditingId(anime.id);
    setIsCreating(false);
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
            <p className="mt-4 text-amber-800 font-medieval">Loading manage panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scroll className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold font-medieval">
              Manage Bounty Book
            </h1>
            <Scroll className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Create/Edit Form */}
        <Card className="mb-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              {isCreating ? <Plus className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
              {isCreating ? 'Create New Bounty' : 'Edit Bounty'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-amber-800">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-amber-300 bg-white"
                  placeholder="Enter anime title"
                />
              </div>
              <div>
                <Label htmlFor="bounty" className="text-amber-800">Bounty (Gold)</Label>
                <Input
                  id="bounty"
                  type="number"
                  value={formData.bounty}
                  onChange={(e) => setFormData({ ...formData, bounty: e.target.value })}
                  className="border-amber-300 bg-white"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-amber-800">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-amber-300 bg-white"
                placeholder="Enter anime description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="genre" className="text-amber-800">Genre</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="border-amber-300 bg-white"
                  placeholder="e.g., Isekai, Fantasy"
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-amber-800">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="border-amber-300 bg-white"
                  placeholder="2024"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-amber-800">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-amber-300 rounded-md bg-white text-amber-900"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="dead">Dead</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              {isCreating ? (
                <>
                  <Button
                    onClick={handleCreate}
                    disabled={!formData.title}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Bounty
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-amber-300 text-amber-800 hover:bg-amber-100"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleUpdate(editingId!)}
                    disabled={!formData.title || !editingId}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Bounty
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-amber-300 text-amber-800 hover:bg-amber-100"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add New Button */}
        {!isCreating && !editingId && (
          <div className="mb-6">
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Bounty
            </Button>
          </div>
        )}

        {/* Anime List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animes.map((anime) => (
            <Card
              key={anime.id}
              className={cn(
                'border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
                anime.status === 'completed' && 'opacity-75',
                anime.status === 'dead' && 'bg-gray-100 border-gray-300 opacity-60'
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle 
                    className={cn(
                      'text-sm font-bold text-amber-900 leading-tight',
                      anime.status === 'completed' && 'line-through text-amber-700',
                      anime.status === 'dead' && 'text-gray-500 line-through'
                    )}
                  >
                    {anime.title}
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(anime)}
                      className="h-8 w-8 p-0 border-amber-300 text-amber-800 hover:bg-amber-100"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(anime.id)}
                      className="h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    className={cn('text-xs font-bold', getBountyColor(anime.bounty))}
                  >
                    {anime.bounty} Gold
                  </Badge>
                  {anime.genre && (
                    <Badge variant="outline" className="text-xs">
                      {anime.genre}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {anime.description && (
                  <p className={cn(
                    'text-xs text-amber-700 line-clamp-2',
                    anime.status === 'completed' && 'text-amber-600',
                    anime.status === 'dead' && 'text-gray-400'
                  )}>
                    {anime.description}
                  </p>
                )}
                <div className="mt-2 flex justify-between items-center">
                  {anime.year && (
                    <span className={cn(
                      'text-xs text-amber-600',
                      anime.status === 'dead' && 'text-gray-400'
                    )}>
                      {anime.year}
                    </span>
                  )}
                  <span className={cn(
                    'text-xs font-semibold',
                    anime.status === 'active' && 'text-green-600',
                    anime.status === 'completed' && 'text-blue-600',
                    anime.status === 'dead' && 'text-gray-500'
                  )}>
                    {anime.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}