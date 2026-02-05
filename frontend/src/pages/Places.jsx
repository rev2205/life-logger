import React from 'react';

function Places() {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1>📍 Places & Experiences</h1>
            <div className="card" style={{ marginTop: '32px', textAlign: 'center', padding: '60px 20px' }}>
                <h2>Map Your Memories</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
                    Track places you've visited and want to visit
                </p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '24px', fontSize: '14px' }}>
                    Interactive map with Leaflet.js - Add places with coordinates and experience notes.
                </p>
            </div>
        </div>
    );
}

export default Places;
