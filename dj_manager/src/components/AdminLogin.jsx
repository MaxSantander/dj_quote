import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Admin123!';

function AdminLogin({ onLogin }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(t('auth.loginError') || 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <i className="fas fa-lock mr-2"></i>
          {t('header.admin')}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition"
          >
            {t('auth.loginButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
