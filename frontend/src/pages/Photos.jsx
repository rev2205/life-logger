import React from 'react';

function Photos() {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1>📷 Photography Archive</h1>
            <div className="card" style={{ marginTop: '32px', textAlign: 'center', padding: '60px 20px' }}>
                <h2>Your Visual Memories</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
                    Upload and reflect on your photographs
                </p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '24px', fontSize: '14px' }}>
                    Upload photos with stories, technical notes, and mood tracking.
                </p>
            </div>
        </div>
    );
}

export default Photos;
