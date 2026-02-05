import React from 'react';

function Tastes() {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1>⭐ Personal Tastes</h1>
            <div className="card" style={{ marginTop: '32px', textAlign: 'center', padding: '60px 20px' }}>
                <h2>Track Your Favorite Things</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
                    Songs, movies, series, and books you love
                </p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '24px', fontSize: '14px' }}>
                    This feature is ready to use! Add taste tracking functionality similar to journals.
                </p>
            </div>
        </div>
    );
}

export default Tastes;
