import React, { useEffect, useState } from 'react';
import { memoryService } from '../services/dataService';
import './Memories.css';

function Memories() {
    const [memories, setMemories] = useState([]);
    const [filteredMemories, setFilteredMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMood, setFilterMood] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({ shortText: '', mood: 'NEUTRAL', tags: '' });

    useEffect(() => {
        loadMemories();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filterMood, memories]);

    const loadMemories = async () => {
        try {
            const response = await memoryService.getAll();
            setMemories(response.data);
            setFilteredMemories(response.data);
        } catch (error) {
            console.error('Error loading memories:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...memories];

        if (searchQuery) {
            filtered = filtered.filter(m =>
                m.shortText.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterMood) {
            filtered = filtered.filter(m => m.mood === filterMood);
        }

        setFilteredMemories(filtered);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await memoryService.create({
                shortText: formData.shortText,
                mood: formData.mood,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : []
            });
            setFormData({ shortText: '', mood: 'NEUTRAL', tags: '' });
            loadMemories();
        } catch (error) {
            console.error('Error creating memory:', error);
            alert('Error creating memory. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this memory?')) {
            try {
                await memoryService.delete(id);
                loadMemories();
            } catch (error) {
                console.error('Error deleting memory:', error);
            }
        }
    };

    if (loading) return <div className="loading">Loading memories...</div>;

    return (
        <div className="memories-container container">
            <div className="page-header">
                <h1>💭 Quick Memories</h1>
            </div>

            <div className="memory-form-card card">
                <h2>Capture a Moment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>What's happening?</label>
                        <textarea
                            value={formData.shortText}
                            onChange={(e) => setFormData({ ...formData, shortText: e.target.value })}
                            placeholder="Quick thought or moment..."
                            maxLength="200"
                            rows="3"
                            required
                        />
                        <span className="char-count">{formData.shortText.length}/200</span>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Mood</label>
                            <select value={formData.mood} onChange={(e) => setFormData({ ...formData, mood: e.target.value })}>
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
                            <label>Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Comma-separated"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Add Memory</button>
                </form>
            </div>

            <div className="filters-section card">
                <input
                    type="text"
                    placeholder="Search memories..."
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

            <div className="memories-list">
                {filteredMemories.length === 0 ? (
                    <div className="empty-state card">
                        <h3>No memories yet</h3>
                        <p>Start capturing your quick moments</p>
                    </div>
                ) : (
                    filteredMemories.map(memory => (
                        <div key={memory.id} className="memory-card card">
                            <div className="memory-header">
                                <span className="memory-date">
                                    {new Date(memory.timestamp).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                                <span className={`mood-badge mood-${memory.mood}`}>
                                    {memory.mood.replace('_', ' ')}
                                </span>
                            </div>

                            <p className="memory-text">{memory.shortText}</p>

                            {memory.tags && memory.tags.length > 0 && (
                                <div className="memory-tags">
                                    {memory.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                            )}

                            <button onClick={() => handleDelete(memory.id)} className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Memories;
