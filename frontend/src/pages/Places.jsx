import React, { useEffect, useState } from 'react';
import { placeService } from '../services/dataService';
import './Places.css';

function Places() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        type: 'RESTAURANT',
        status: 'VISITED',
        latitude: '',
        longitude: '',
        dateVisited: '',
        experienceNote: '',
        mood: 'NEUTRAL',
        tags: ''
    });

    useEffect(() => {
        loadPlaces();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filterType, filterStatus, places]);

    const loadPlaces = async () => {
        try {
            const response = await placeService.getAll();
            setPlaces(response.data);
            setFilteredPlaces(response.data);
        } catch (error) {
            console.error('Error loading places:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...places];

        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.experienceNote && p.experienceNote.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (filterType) {
            filtered = filtered.filter(p => p.type === filterType);
        }

        if (filterStatus) {
            filtered = filtered.filter(p => p.status === filterStatus);
        }

        // Sort by date visited (most recent first)
        filtered.sort((a, b) => {
            if (!a.dateVisited) return 1;
            if (!b.dateVisited) return -1;
            return new Date(b.dateVisited) - new Date(a.dateVisited);
        });

        setFilteredPlaces(filtered);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'RESTAURANT',
            status: 'VISITED',
            latitude: '',
            longitude: '',
            dateVisited: '',
            experienceNote: '',
            mood: 'NEUTRAL',
            tags: ''
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const placeData = {
                ...formData,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : []
            };

            if (editingId) {
                await placeService.update(editingId, placeData);
            } else {
                await placeService.create(placeData);
            }

            resetForm();
            loadPlaces();
        } catch (error) {
            console.error('Error saving place:', error);
            alert('Error saving place. Please check coordinates and try again.');
        }
    };

    const handleEdit = (place) => {
        setFormData({
            name: place.name,
            type: place.type,
            status: place.status,
            latitude: place.latitude.toString(),
            longitude: place.longitude.toString(),
            dateVisited: place.dateVisited || '',
            experienceNote: place.experienceNote || '',
            mood: place.mood || 'NEUTRAL',
            tags: place.tags ? place.tags.join(', ') : ''
        });
        setEditingId(place.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this place?')) {
            try {
                await placeService.delete(id);
                loadPlaces();
            } catch (error) {
                console.error('Error deleting place:', error);
            }
        }
    };

    const getTypeIcon = (type) => {
        const icons = {
            RESTAURANT: '🍽️',
            CAFE: '☕',
            PARK: '🌳',
            MUSEUM: '🏛️',
            BEACH: '🏖️',
            MOUNTAIN: '⛰️',
            CITY: '🏙️',
            LANDMARK: '🗿',
            OTHER: '📍'
        };
        return icons[type] || '📍';
    };

    const getStatusBadge = (status) => {
        const badges = {
            VISITED: { text: 'Visited', color: '#10b981' },
            WANT_TO_VISIT: { text: 'Want to Visit', color: '#f59e0b' },
            FAVORITE: { text: 'Favorite', color: '#ec4899' }
        };
        return badges[status] || badges.VISITED;
    };

    const openInMaps = (lat, lng, name) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return <div className="loading">Loading places...</div>;
    }

    return (
        <div className="places-container container">
            <div className="page-header">
                <h1>📍 Places & Experiences</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add Place'}
                </button>
            </div>

            {showForm && (
                <div className="place-form-card card">
                    <h2>{editingId ? 'Edit Place' : 'Add New Place'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Place Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Central Park, Eiffel Tower"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Type *</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    required
                                >
                                    <option value="RESTAURANT">🍽️ Restaurant</option>
                                    <option value="CAFE">☕ Cafe</option>
                                    <option value="PARK">🌳 Park</option>
                                    <option value="MUSEUM">🏛️ Museum</option>
                                    <option value="BEACH">🏖️ Beach</option>
                                    <option value="MOUNTAIN">⛰️ Mountain</option>
                                    <option value="CITY">🏙️ City</option>
                                    <option value="LANDMARK">🗿 Landmark</option>
                                    <option value="OTHER">📍 Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Status *</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    required
                                >
                                    <option value="VISITED">✅ Visited</option>
                                    <option value="WANT_TO_VISIT">🎯 Want to Visit</option>
                                    <option value="FAVORITE">❤️ Favorite</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Date Visited</label>
                                <input
                                    type="date"
                                    value={formData.dateVisited}
                                    onChange={(e) => setFormData({ ...formData, dateVisited: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Latitude *</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.latitude}
                                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                    placeholder="e.g., 40.7128"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Longitude *</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.longitude}
                                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                    placeholder="e.g., -74.0060"
                                    required
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
                            <label>Experience Note</label>
                            <textarea
                                value={formData.experienceNote}
                                onChange={(e) => setFormData({ ...formData, experienceNote: e.target.value })}
                                placeholder="What was your experience like? What made it special?"
                                rows="4"
                            />
                        </div>

                        <div className="input-group">
                            <label>Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Comma-separated tags (e.g., romantic, scenic, adventure)"
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
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <div className="filters-row">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="RESTAURANT">🍽️ Restaurants</option>
                        <option value="CAFE">☕ Cafes</option>
                        <option value="PARK">🌳 Parks</option>
                        <option value="MUSEUM">🏛️ Museums</option>
                        <option value="BEACH">🏖️ Beaches</option>
                        <option value="MOUNTAIN">⛰️ Mountains</option>
                        <option value="CITY">🏙️ Cities</option>
                        <option value="LANDMARK">🗿 Landmarks</option>
                        <option value="OTHER">📍 Other</option>
                    </select>

                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="VISITED">✅ Visited</option>
                        <option value="WANT_TO_VISIT">🎯 Want to Visit</option>
                        <option value="FAVORITE">❤️ Favorites</option>
                    </select>
                </div>
            </div>

            {filteredPlaces.length === 0 ? (
                <div className="empty-state card">
                    <h3>No places found</h3>
                    <p>Start mapping your memories and dream destinations!</p>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Add Your First Place
                    </button>
                </div>
            ) : (
                <div className="places-grid">
                    {filteredPlaces.map(place => {
                        const statusBadge = getStatusBadge(place.status);
                        return (
                            <div key={place.id} className="place-card card">
                                <div className="place-header">
                                    <div className="place-type-icon">{getTypeIcon(place.type)}</div>
                                    <span
                                        className="place-status-badge"
                                        style={{ backgroundColor: statusBadge.color }}
                                    >
                                        {statusBadge.text}
                                    </span>
                                </div>

                                <h3 className="place-name">{place.name}</h3>

                                <div className="place-meta">
                                    <span className="place-type-text">{place.type}</span>
                                    {place.mood && (
                                        <span className={`mood-badge mood-${place.mood}`}>
                                            {place.mood.replace('_', ' ')}
                                        </span>
                                    )}
                                </div>

                                {place.experienceNote && (
                                    <p className="place-note">{place.experienceNote}</p>
                                )}

                                {place.dateVisited && (
                                    <p className="place-date">
                                        📅 {new Date(place.dateVisited).toLocaleDateString()}
                                    </p>
                                )}

                                <div className="place-coordinates">
                                    📍 {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                                </div>

                                {place.tags && place.tags.length > 0 && (
                                    <div className="place-tags">
                                        {place.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="place-actions">
                                    <button
                                        onClick={() => openInMaps(place.latitude, place.longitude, place.name)}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        🗺️ View Map
                                    </button>
                                    <button onClick={() => handleEdit(place)} className="btn btn-secondary btn-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(place.id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Places;
