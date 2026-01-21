import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { createUser, generateVerificationCode, saveVerificationCode } from '../utils/users';

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('auth.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('auth.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('auth.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.passwordMinLength');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Crear usuario
    const result = createUser(formData.email, formData.password);
    
    if (!result.success) {
      setErrors({ general: result.message });
      setLoading(false);
      return;
    }

    // Generar y guardar código de verificación
    const code = generateVerificationCode();
    saveVerificationCode(formData.email, code);

    // En producción, aquí enviarías el email real
    // Por ahora, mostramos el código en consola y alert
    console.log(`Código de verificación para ${formData.email}: ${code}`);
    alert(`${t('auth.emailVerificationSent')}\n\nCódigo de verificación: ${code}\n\n(En producción, esto se enviaría por email)`);

    setLoading(false);
    onRegisterSuccess(formData.email, code);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <i className="fas fa-user-plus mr-2"></i>
          {t('auth.register')}
        </h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-500 rounded text-red-300 text-sm">
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
              className={`w-full px-4 py-2 bg-gray-900 border rounded focus:outline-none focus:border-purple-400 ${
                errors.email ? 'border-red-500' : 'border-purple-500'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">{t('auth.password')} *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full px-4 py-2 bg-gray-900 border rounded focus:outline-none focus:border-purple-400 ${
                errors.password ? 'border-red-500' : 'border-purple-500'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">{t('auth.confirmPassword')} *</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className={`w-full px-4 py-2 bg-gray-900 border rounded focus:outline-none focus:border-purple-400 ${
                errors.confirmPassword ? 'border-red-500' : 'border-purple-500'
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin mr-2"></i>Registrando...</span>
            ) : (
              <span>{t('auth.registerButton')}</span>
            )}
          </button>

          <div className="text-center text-sm text-gray-400 mt-4">
            <span>{t('auth.hasAccount')} </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              {t('auth.login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
