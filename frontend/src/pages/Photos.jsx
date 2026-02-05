import React, { useEffect, useState } from 'react';
import { photoService } from '../services/dataService';
import './Photos.css';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMood, setFilterMood] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const [formData, setFormData] = useState({
        file: null,
        location: '',
        mood: 'NEUTRAL',
        tags: '',
        story: '',
        technicalNotes: ''
    });

    useEffect(() => {
        loadPhotos();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filterMood, photos]);

    const loadPhotos = async () => {
        try {
            const response = await photoService.getAll();
            setPhotos(response.data);
            setFilteredPhotos(response.data);
        } catch (error) {
            console.error('Error loading photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...photos];

        if (searchQuery) {
            filtered = filtered.filter(p =>
                (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.story && p.story.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.technicalNotes && p.technicalNotes.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (filterMood) {
            filtered = filtered.filter(p => p.mood === filterMood);
        }

        // Sort by upload date (most recent first)
        filtered.sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded));

        setFilteredPhotos(filtered);
    };

    const resetForm = () => {
        setFormData({
            file: null,
            location: '',
            mood: 'NEUTRAL',
            tags: '',
            story: '',
            technicalNotes: ''
        });
        setShowForm(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert('File size should be less than 10MB');
                return;
            }
            setFormData({ ...formData, file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.file) {
            alert('Please select a photo to upload');
            return;
        }

        try {
            const metadata = {
                location: formData.location,
                mood: formData.mood,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
                story: formData.story,
                technicalNotes: formData.technicalNotes
            };

            await photoService.upload(formData.file, metadata);
            resetForm();
            loadPhotos();
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error uploading photo. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this photo?')) {
            try {
                await photoService.delete(id);
                loadPhotos();
                if (selectedPhoto && selectedPhoto.id === id) {
                    setSelectedPhoto(null);
                }
            } catch (error) {
                console.error('Error deleting photo:', error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading photos...</div>;
    }

    return (
        <div className="photos-container container">
            <div className="page-header">
                <h1>📷 Photography Archive</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Upload Photo'}
                </button>
            </div>

            {showForm && (
                <div className="photo-form-card card">
                    <h2>Upload New Photo</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Photo *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="file-input"
                            />
                            {formData.file && (
                                <p className="file-name">Selected: {formData.file.name}</p>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Where was this taken?"
                                />
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
                        </div>

                        <div className="input-group">
                            <label>Story</label>
                            <textarea
                                value={formData.story}
                                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                                placeholder="What's the story behind this photo?"
                                rows="3"
                            />
                        </div>

                        <div className="input-group">
                            <label>Technical Notes</label>
                            <textarea
                                value={formData.technicalNotes}
                                onChange={(e) => setFormData({ ...formData, technicalNotes: e.target.value })}
                                placeholder="Camera settings, editing notes, etc."
                                rows="2"
                            />
                        </div>

                        <div className="input-group">
                            <label>Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Comma-separated tags (e.g., landscape, portrait, sunset)"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={resetForm} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="filters-section card">
                <input
                    type="text"
                    placeholder="Search by location, story, or notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <div className="filters-row">
                    <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
                        <option value="">All Moods</option>
                        <option value="VERY_HAPPY">😄 Very Happy</option>
                        <option value="HAPPY">🙂 Happy</option>
                        <option value="NEUTRAL">😐 Neutral</option>
                        <option value="SAD">😔 Sad</option>
                        <option value="VERY_SAD">😢 Very Sad</option>
                        <option value="STRESSED">😰 Stressed</option>
                        <option value="CALM">😌 Calm</option>
                    </select>
                </div>
            </div>

            {filteredPhotos.length === 0 ? (
                <div className="empty-state card">
                    <h3>No photos yet</h3>
                    <p>Start building your visual memory archive!</p>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Upload Your First Photo
                    </button>
                </div>
            ) : (
                <div className="photos-grid">
                    {filteredPhotos.map(photo => (
                        <div
                            key={photo.id}
                            className="photo-card"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <div className="photo-image-container">
                                <img
                                    src={photo.imageUrl}
                                    alt={photo.location || 'Photo'}
                                    className="photo-image"
                                />
                                {photo.mood && (
                                    <div className={`photo-mood-overlay mood-${photo.mood}`}>
                                        {photo.mood.replace('_', ' ')}
                                    </div>
                                )}
                            </div>

                            {photo.location && (
                                <div className="photo-location">📍 {photo.location}</div>
                            )}

                            {photo.tags && photo.tags.length > 0 && (
                                <div className="photo-tags-preview">
                                    {photo.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="tag-mini">{tag}</span>
                                    ))}
                                    {photo.tags.length > 3 && <span className="tag-mini">+{photo.tags.length - 3}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {selectedPhoto && (
                <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
                    <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedPhoto(null)}>×</button>

                        <div className="modal-image-container">
                            <img
                                src={selectedPhoto.imageUrl}
                                alt={selectedPhoto.location || 'Photo'}
                                className="modal-image"
                            />
                        </div>

                        <div className="modal-details">
                            <div className="modal-header">
                                {selectedPhoto.location && (
                                    <h3>📍 {selectedPhoto.location}</h3>
                                )}
                                <p className="photo-date">
                                    {new Date(selectedPhoto.dateUploaded).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {selectedPhoto.mood && (
                                <div className="modal-mood">
                                    <span className={`mood-badge mood-${selectedPhoto.mood}`}>
                                        {selectedPhoto.mood.replace('_', ' ')}
                                    </span>
                                </div>
                            )}

                            {selectedPhoto.story && (
                                <div className="modal-section">
                                    <h4>Story</h4>
                                    <p>{selectedPhoto.story}</p>
                                </div>
                            )}

                            {selectedPhoto.technicalNotes && (
                                <div className="modal-section">
                                    <h4>Technical Notes</h4>
                                    <p>{selectedPhoto.technicalNotes}</p>
                                </div>
                            )}

                            {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                                <div className="modal-section">
                                    <h4>Tags</h4>
                                    <div className="photo-tags">
                                        {selectedPhoto.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="modal-actions">
                                <button
                                    onClick={() => handleDelete(selectedPhoto.id)}
                                    className="btn btn-danger"
                                >
                                    Delete Photo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Photos;
