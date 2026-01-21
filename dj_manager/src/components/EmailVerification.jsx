import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { verifyCode, verifyUser, generateVerificationCode, saveVerificationCode } from '../utils/users';

function EmailVerification({ email, onVerificationSuccess, onResendCode }) {
  const { t } = useLanguage();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!code || code.length !== 6) {
      setError('Por favor ingresa el código de 6 dígitos');
      return;
    }

    setLoading(true);

    const result = verifyCode(email, code);

    if (!result.valid) {
      setError(result.message || t('auth.verificationError'));
      setLoading(false);
      return;
    }

    // Marcar usuario como verificado
    const verifyResult = verifyUser(email);
    
    if (verifyResult.success) {
      setLoading(false);
      onVerificationSuccess();
    } else {
      setError('Error al verificar usuario');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    
    const newCode = generateVerificationCode();
    saveVerificationCode(email, newCode);
    
    console.log(`Nuevo código de verificación para ${email}: ${newCode}`);
    alert(`Nuevo código enviado: ${newCode}\n\n(En producción, esto se enviaría por email)`);
    
    setResending(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <i className="fas fa-envelope-check mr-2"></i>
          {t('auth.emailVerification')}
        </h2>

        <p className="text-gray-300 mb-6 text-center">
          {t('auth.emailVerificationSent')}
        </p>

        <p className="text-sm text-gray-400 mb-4 text-center">
          Email: <span className="text-purple-400">{email}</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">{t('auth.verificationCode')} *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400 text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength="6"
              required
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              Ingresa el código de 6 dígitos
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin mr-2"></i>Verificando...</span>
            ) : (
              <span>{t('auth.verifyButton')}</span>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-sm text-purple-400 hover:text-purple-300 underline disabled:opacity-50"
            >
              {resending ? (
                <span><i className="fas fa-spinner fa-spin mr-2"></i>Reenviando...</span>
              ) : (
                <span>{t('auth.resendCode')}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailVerification;
