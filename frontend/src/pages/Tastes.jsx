import React, { useEffect, useState } from 'react';
import { tasteService } from '../services/dataService';
import './Tastes.css';

function Tastes() {
    const [tastes, setTastes] = useState([]);
    const [filteredTastes, setFilteredTastes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterRating, setFilterRating] = useState('');

    const [formData, setFormData] = useState({
        type: 'SONG',
        title: '',
        dateConsumed: '',
        personalNote: '',
        rating: 3,
        mood: 'NEUTRAL',
        tags: ''
    });

    useEffect(() => {
        loadTastes();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filterType, filterRating, tastes]);

    const loadTastes = async () => {
        try {
            const response = await tasteService.getAll();
            setTastes(response.data);
            setFilteredTastes(response.data);
        } catch (error) {
            console.error('Error loading tastes:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...tastes];

        if (searchQuery) {
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (t.personalNote && t.personalNote.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (filterType) {
            filtered = filtered.filter(t => t.type === filterType);
        }

        if (filterRating) {
            filtered = filtered.filter(t => t.rating === parseInt(filterRating));
        }

        // Sort by rating (highest first) and then by date
        filtered.sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return new Date(b.dateConsumed) - new Date(a.dateConsumed);
        });

        setFilteredTastes(filtered);
    };

    const resetForm = () => {
        setFormData({
            type: 'SONG',
            title: '',
            dateConsumed: '',
            personalNote: '',
            rating: 3,
            mood: 'NEUTRAL',
            tags: ''
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tasteData = {
                ...formData,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : []
            };

            if (editingId) {
                await tasteService.update(editingId, tasteData);
            } else {
                await tasteService.create(tasteData);
            }

            resetForm();
            loadTastes();
        } catch (error) {
            console.error('Error saving taste:', error);
            alert('Error saving taste. Please try again.');
        }
    };

    const handleEdit = (taste) => {
        setFormData({
            type: taste.type,
            title: taste.title,
            dateConsumed: taste.dateConsumed || '',
            personalNote: taste.personalNote || '',
            rating: taste.rating || 3,
            mood: taste.mood || 'NEUTRAL',
            tags: taste.tags ? taste.tags.join(', ') : ''
        });
        setEditingId(taste.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await tasteService.delete(id);
                loadTastes();
            } catch (error) {
                console.error('Error deleting taste:', error);
            }
        }
    };

    const getTypeIcon = (type) => {
        const icons = {
            SONG: '🎵',
            MOVIE: '🎬',
            SERIES: '📺',
            BOOK: '📚',
            GAME: '🎮',
            FOOD: '🍽️',
            OTHER: '⭐'
        };
        return icons[type] || '⭐';
    };

    const renderStars = (rating) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    if (loading) {
        return <div className="loading">Loading tastes...</div>;
    }

    return (
        <div className="tastes-container container">
            <div className="page-header">
                <h1>⭐ Personal Tastes</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add New'}
                </button>
            </div>

            {showForm && (
                <div className="taste-form-card card">
                    <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Type *</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    required
                                >
                                    <option value="SONG">🎵 Song</option>
                                    <option value="MOVIE">🎬 Movie</option>
                                    <option value="SERIES">📺 Series</option>
                                    <option value="BOOK">📚 Book</option>
                                    <option value="GAME">🎮 Game</option>
                                    <option value="FOOD">🍽️ Food</option>
                                    <option value="OTHER">⭐ Other</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Name of the song, movie, book, etc."
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Rating *</label>
                                <select
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                    required
                                >
                                    <option value="5">⭐⭐⭐⭐⭐ Masterpiece</option>
                                    <option value="4">⭐⭐⭐⭐ Great</option>
                                    <option value="3">⭐⭐⭐ Good</option>
                                    <option value="2">⭐⭐ Okay</option>
                                    <option value="1">⭐ Poor</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Date Experienced</label>
                                <input
                                    type="date"
                                    value={formData.dateConsumed}
                                    onChange={(e) => setFormData({ ...formData, dateConsumed: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Mood</label>
                            <select
                                value={formData.mood}
                                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                            >
                                <option value="VERY_HAPPY">😄 Very Happy</option>
                                <option value="HAPPY">🙂 Happy</option>
                                <option value="NEUTRAL">😐 Neutral</option>
                                <option value="SAD">😔 Sad</option>
                                <option value="VERY_SAD">😢 Very Sad</option>
                                <option value="STRESSED">😰 Stressed</option>
                                <option value="CALM">😌 Calm</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Personal Note</label>
                            <textarea
                                value={formData.personalNote}
                                onChange={(e) => setFormData({ ...formData, personalNote: e.target.value })}
                                placeholder="What did you think? How did it make you feel?"
                                rows="4"
                            />
                        </div>

                        <div className="input-group">
                            <label>Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Comma-separated tags (e.g., favorite, nostalgic, inspiring)"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={resetForm} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingId ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="filters-section card">
                <input
                    type="text"
                    placeholder="Search by title or note..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <div className="filters-row">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="SONG">🎵 Songs</option>
                        <option value="MOVIE">🎬 Movies</option>
                        <option value="SERIES">📺 Series</option>
                        <option value="BOOK">📚 Books</option>
                        <option value="GAME">🎮 Games</option>
                        <option value="FOOD">🍽️ Food</option>
                        <option value="OTHER">⭐ Other</option>
                    </select>

                    <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                        <option value="">All Ratings</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>
                </div>
            </div>

            {filteredTastes.length === 0 ? (
                <div className="empty-state card">
                    <h3>No items found</h3>
                    <p>Start tracking your favorite things!</p>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Add Your First Item
                    </button>
                </div>
            ) : (
                <div className="tastes-grid">
                    {filteredTastes.map(taste => (
                        <div key={taste.id} className="taste-card card">
                            <div className="taste-header">
                                <div className="taste-type-icon">{getTypeIcon(taste.type)}</div>
                                <div className="taste-rating">{renderStars(taste.rating)}</div>
                            </div>

                            <h3 className="taste-title">{taste.title}</h3>

                            <div className="taste-meta">
                                <span className="taste-type-badge">{taste.type}</span>
                                {taste.mood && (
                                    <span className={`mood-badge mood-${taste.mood}`}>
                                        {taste.mood.replace('_', ' ')}
                                    </span>
                                )}
                            </div>

                            {taste.personalNote && (
                                <p className="taste-note">{taste.personalNote}</p>
                            )}

                            {taste.dateConsumed && (
                                <p className="taste-date">
                                    📅 {new Date(taste.dateConsumed).toLocaleDateString()}
                                </p>
                            )}

                            {taste.tags && taste.tags.length > 0 && (
                                <div className="taste-tags">
                                    {taste.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}

                            <div className="taste-actions">
                                <button onClick={() => handleEdit(taste)} className="btn btn-secondary btn-sm">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(taste.id)} className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tastes;
