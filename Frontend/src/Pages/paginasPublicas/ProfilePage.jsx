import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>Perfil de Usuario</h1>
            {user && (
                <ul>
                    <li><strong>ID:</strong> {user.id}</li>
                    <li><strong>Usuario:</strong> {user.username}</li>
                    <li><strong>Email:</strong> {user.email}</li>
                </ul>
            )}
        </div>
    );
};

export default ProfilePage;