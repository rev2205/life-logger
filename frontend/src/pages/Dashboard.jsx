import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { journalService, memoryService, tasteService, placeService, photoService } from '../services/dataService';
import './Dashboard.css';

function Dashboard() {
    const [stats, setStats] = useState({
        journals: 0,
        memories: 0,
        tastes: 0,
        places: 0,
        photos: 0
    });
    const [recentJournals, setRecentJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [journals, memories, tastes, places, photos] = await Promise.all([
                journalService.getAll(),
                memoryService.getAll(),
                tasteService.getAll(),
                placeService.getAll(),
                photoService.getAll()
            ]);

            setStats({
                journals: journals.data.length,
                memories: memories.data.length,
                tastes: tastes.data.length,
                places: places.data.length,
                photos: photos.data.length
            });

            setRecentJournals(journals.data.slice(0, 5));
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading your dashboard...</div>;
    }

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <h1>Welcome to Your Life Logger</h1>
                <p>Your personal memory vault and life archive</p>
            </div>

            <div className="stats-grid">
                <Link to="/journals" className="stat-card card">
                    <div className="stat-icon">📔</div>
                    <div className="stat-info">
                        <h3>{stats.journals}</h3>
                        <p>Journal Entries</p>
                    </div>
                </Link>

                <Link to="/memories" className="stat-card card">
                    <div className="stat-icon">💭</div>
                    <div className="stat-info">
                        <h3>{stats.memories}</h3>
                        <p>Quick Memories</p>
                    </div>
                </Link>

                <Link to="/tastes" className="stat-card card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-info">
                        <h3>{stats.tastes}</h3>
                        <p>Tastes Tracked</p>
                    </div>
                </Link>

                <Link to="/places" className="stat-card card">
                    <div className="stat-icon">📍</div>
                    <div className="stat-info">
                        <h3>{stats.places}</h3>
                        <p>Places</p>
                    </div>
                </Link>

                <Link to="/photos" className="stat-card card">
                    <div className="stat-icon">📷</div>
                    <div className="stat-info">
                        <h3>{stats.photos}</h3>
                        <p>Photos</p>
                    </div>
                </Link>
            </div>

            <div className="recent-section">
                <div className="section-header">
                    <h2>Recent Journal Entries</h2>
                    <Link to="/journals/new" className="btn btn-primary">New Entry</Link>
                </div>

                {recentJournals.length === 0 ? (
                    <div className="empty-state card">
                        <h3>No journal entries yet</h3>
                        <p>Start documenting your life journey today</p>
                        <Link to="/journals/new" className="btn btn-primary">Write Your First Entry</Link>
                    </div>
                ) : (
                    <div className="journals-list">
                        {recentJournals.map(journal => (
                            <Link to={`/journals/edit/${journal.id}`} key={journal.id} className="journal-item card">
                                <div className="journal-header">
                                    <span className="journal-date">
                                        {new Date(journal.date).toLocaleDateString()}
                                    </span>
                                    <span className={`mood-badge mood-${journal.mood}`}>
                                        {journal.mood}
                                    </span>
                                </div>
                                <p className="journal-preview">{journal.content.substring(0, 150)}...</p>
                                {journal.tags && journal.tags.length > 0 && (
                                    <div className="journal-tags">
                                        {journal.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
