import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { journalService } from '../services/dataService';
import './Journals.css';

function Journals() {
    const [journals, setJournals] = useState([]);
    const [filteredJournals, setFilteredJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMood, setFilterMood] = useState('');
    const [filterContext, setFilterContext] = useState('');

    useEffect(() => {
        loadJournals();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filterMood, filterContext, journals]);

    const loadJournals = async () => {
        try {
            const response = await journalService.getAll();
            setJournals(response.data);
            setFilteredJournals(response.data);
        } catch (error) {
            console.error('Error loading journals:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...journals];

        if (searchQuery) {
            filtered = filtered.filter(j =>
                j.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterMood) {
            filtered = filtered.filter(j => j.mood === filterMood);
        }

        if (filterContext) {
            filtered = filtered.filter(j => j.context === filterContext);
        }

        setFilteredJournals(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this journal entry?')) {
            try {
                await journalService.delete(id);
                loadJournals();
            } catch (error) {
                console.error('Error deleting journal:', error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading journals...</div>;
    }

    return (
        <div className="journals-container container">
            <div className="page-header">
                <h1>📔 Journal Entries</h1>
                <Link to="/journals/new" className="btn btn-primary">New Entry</Link>
            </div>

            <div className="filters-section card">
                <input
                    type="text"
                    placeholder="Search journals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <div className="filters-row">
                    <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
                        <option value="">All Moods</option>
                        <option value="VERY_HAPPY">Very Happy</option>
                        <option value="HAPPY">Happy</option>
                        <option value="NEUTRAL">Neutral</option>
                        <option value="SAD">Sad</option>
                        <option value="VERY_SAD">Very Sad</option>
                        <option value="STRESSED">Stressed</option>
                        <option value="CALM">Calm</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Filter by context..."
                        value={filterContext}
                        onChange={(e) => setFilterContext(e.target.value)}
                    />
                </div>
            </div>

            {filteredJournals.length === 0 ? (
                <div className="empty-state card">
                    <h3>No journal entries found</h3>
                    <p>Start documenting your life journey</p>
                    <Link to="/journals/new" className="btn btn-primary">Write Your First Entry</Link>
                </div>
            ) : (
                <div className="journals-grid">
                    {filteredJournals.map(journal => (
                        <div key={journal.id} className="journal-card card">
                            <div className="journal-card-header">
                                <div>
                                    <span className="journal-date">
                                        {new Date(journal.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className={`mood-badge mood-${journal.mood}`}>
                                        {journal.mood.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="journal-actions">
                                    <Link to={`/journals/edit/${journal.id}`} className="btn btn-secondary btn-sm">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(journal.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="journal-content">
                                <p>{journal.content}</p>
                            </div>

                            {journal.context && (
                                <div className="journal-meta">
                                    <span className="context-badge">📂 {journal.context}</span>
                                </div>
                            )}

                            {journal.tags && journal.tags.length > 0 && (
                                <div className="journal-tags">
                                    {journal.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Journals;
