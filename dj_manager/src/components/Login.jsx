import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { authenticateUser } from '../utils/users';

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = authenticateUser(formData.email, formData.password);

    setLoading(false);

    if (!result.success) {
      if (result.needsVerification) {
        setErrors({ general: result.message, needsVerification: true });
      } else {
        setErrors({ general: result.message || t('auth.loginError') });
      }
      return;
    }

    onLoginSuccess(result.user);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <i className="fas fa-lock mr-2"></i>
          {t('auth.login')}
        </h2>

        {errors.general && (
          <div className={`mb-4 p-3 border rounded text-sm ${
            errors.needsVerification 
              ? 'bg-yellow-900 bg-opacity-30 border-yellow-500 text-yellow-300'
              : 'bg-red-900 bg-opacity-30 border-red-500 text-red-300'
          }`}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">{t('auth.email')} *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">{t('auth.password')} *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin mr-2"></i>Iniciando sesión...</span>
            ) : (
              <span>{t('auth.loginButton')}</span>
            )}
          </button>

          <div className="text-center text-sm text-gray-400 mt-4">
            <span>{t('auth.noAccount')} </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              {t('auth.register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
