import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Journals from './pages/Journals';
import JournalForm from './pages/JournalForm';
import Memories from './pages/Memories';
import Tastes from './pages/Tastes';
import Places from './pages/Places';
import Photos from './pages/Photos';
import LifePhases from './pages/LifePhases';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/journals" element={<PrivateRoute><Journals /></PrivateRoute>} />
                <Route path="/journals/new" element={<PrivateRoute><JournalForm /></PrivateRoute>} />
                <Route path="/journals/edit/:id" element={<PrivateRoute><JournalForm /></PrivateRoute>} />
                <Route path="/memories" element={<PrivateRoute><Memories /></PrivateRoute>} />
                <Route path="/tastes" element={<PrivateRoute><Tastes /></PrivateRoute>} />
                <Route path="/places" element={<PrivateRoute><Places /></PrivateRoute>} />
                <Route path="/photos" element={<PrivateRoute><Photos /></PrivateRoute>} />
                <Route path="/phases" element={<PrivateRoute><LifePhases /></PrivateRoute>} />
                <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
