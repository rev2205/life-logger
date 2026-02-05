import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { journalService } from '../services/dataService';
import './JournalForm.css';

function JournalForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        content: '',
        mood: 'NEUTRAL',
        tags: '',
        context: ''
    });

    useEffect(() => {
        if (id) {
            loadJournal();
        }
    }, [id]);

    const loadJournal = async () => {
        try {
            const response = await journalService.getById(id);
            const journal = response.data;
            setFormData({
                content: journal.content,
                mood: journal.mood,
                tags: journal.tags ? journal.tags.join(', ') : '',
                context: journal.context || ''
            });
        } catch (error) {
            setError('Error loading journal');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const journalData = {
                content: formData.content,
                mood: formData.mood,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
                context: formData.context,
                date: new Date().toISOString().split('T')[0], // Send current date
                time: new Date().toLocaleTimeString('en-US', { hour12: false }) // Send current time HH:MM:SS
            };

            if (id) {
                await journalService.update(id, journalData);
            } else {
                await journalService.create(journalData);
            }

            navigate('/journals');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving journal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="journal-form-container container">
            <div className="page-header">
                <h1>{id ? 'Edit Journal Entry' : 'New Journal Entry'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="journal-form card">
                <div className="input-group">
                    <label>How are you feeling? *</label>
                    <select name="mood" value={formData.mood} onChange={handleChange} required>
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
                    <label>What's on your mind? *</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        placeholder="Write your thoughts, experiences, and reflections..."
                        rows="12"
                    />
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Context</label>
                        <input
                            type="text"
                            name="context"
                            value={formData.context}
                            onChange={handleChange}
                            placeholder="e.g., college, personal, family, work"
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Separate tags with commas (e.g., reflection, gratitude, goals)"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/journals')} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (id ? 'Update Entry' : 'Save Entry')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default JournalForm;
