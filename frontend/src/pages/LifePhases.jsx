import React from 'react';

function LifePhases() {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1>🌟 Life Phases</h1>
            <div className="card" style={{ marginTop: '32px', textAlign: 'center', padding: '60px 20px' }}>
                <h2>Organize Your Life Story</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
                    Group memories into meaningful life periods
                </p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '24px', fontSize: '14px' }}>
                    Create phases like "College Years", "Bangalore Phase", etc. to contextualize your memories.
                </p>
            </div>
        </div>
    );
}

export default LifePhases;
