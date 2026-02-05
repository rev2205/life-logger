import React, { useEffect, useState } from 'react';
import { memoryService } from '../services/dataService';

function Memories() {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ shortText: '', mood: 'NEUTRAL', tags: '' });

    useEffect(() => {
        loadMemories();
    }, []);

    const loadMemories = async () => {
        try {
            const response = await memoryService.getAll();
            setMemories(response.data);
        } catch (error) {
            console.error('Error loading memories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await memoryService.create({
                shortText: formData.shortText,
                mood: formData.mood,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
            });
            setFormData({ shortText: '', mood: 'NEUTRAL', tags: '' });
            loadMemories();
        } catch (error) {
            console.error('Error creating memory:', error);
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
        <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
            <h1 style={{ marginBottom: '32px' }}>💭 Quick Memories</h1>

            <div className="card" style={{ marginBottom: '32px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Capture a Moment</h2>
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
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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

            <div style={{ display: 'grid', gap: '16px' }}>
                {memories.length === 0 ? (
                    <div className="empty-state card">
                        <h3>No memories yet</h3>
                        <p>Start capturing your quick moments</p>
                    </div>
                ) : (
                    memories.map(memory => (
                        <div key={memory.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                                    {new Date(memory.timestamp).toLocaleString()}
                                </span>
                                <span className={`mood-badge mood-${memory.mood}`}>{memory.mood}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>{memory.shortText}</p>
                            {memory.tags && memory.tags.length > 0 && (
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    {memory.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                            )}
                            <button onClick={() => handleDelete(memory.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Memories;
