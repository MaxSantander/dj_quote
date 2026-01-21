import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { eventTypes } from '../constants/defaults';
import { musicStyles } from '../constants/musicStyles';
import { calculateHours, calculateQuote } from '../utils/calculations';
import { calculateDistanceBetweenPostalCodes } from '../utils/distance';
import { getDatePlaceholder, getDatePattern, parseFormattedDate, formatDateForDisplay } from '../utils/dateFormat';
import QuoteDisplay from './QuoteDisplay';

function ClientForm({ config, onSubmit }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'boda',
    eventDate: '',
    fromPostalCode: '93051',
    toPostalCode: '',
    city: '',
    startTime: '20:00',
    endTime: '02:00',
    guests: 100,
    venueType: 'interior',
    services: [],
    distance: 0,
    musicStyles: [],
    musicStylesOther: '',
    spotifyLink: '',
    specialRequests: ''
  });

  const [quote, setQuote] = useState(null);
  const [calculatingDistance, setCalculatingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState('');

  const serviceOptions = [
    { id: 'dj_only', labelKey: 'services.djOnly', price: 0 },
    { id: 'pa_basic', labelKey: 'services.paBasic', price: config.equipment.paBasic },
    { id: 'pa_pro', labelKey: 'services.paPro', price: config.equipment.paPro },
    { id: 'lighting_basic', labelKey: 'services.lightingBasic', price: config.equipment.lightingBasic },
    { id: 'lighting_pro', labelKey: 'services.lightingPro', price: config.equipment.lightingPro },
    { id: 'wireless_mic', labelKey: 'services.wirelessMic', price: config.equipment.wireless_mic },
    { id: 'ceremony', labelKey: 'services.ceremony', price: config.equipment.ceremony }
  ];

  const hours = calculateHours(formData.startTime, formData.endTime);

  // Calcular distancia cuando cambia el código postal destino
  useEffect(() => {
    const calculateDistance = async () => {
      if (formData.toPostalCode && formData.toPostalCode.length >= 5) {
        setCalculatingDistance(true);
        setDistanceError('');
        
        const result = await calculateDistanceBetweenPostalCodes(
          formData.fromPostalCode,
          formData.toPostalCode
        );
        
        if (result.success) {
          setFormData(prev => ({
            ...prev,
            distance: result.distance,
            city: result.toLocation
          }));
        } else {
          setDistanceError(result.message || 'Error al calcular distancia');
        }
        
        setCalculatingDistance(false);
      } else if (formData.toPostalCode.length === 0) {
        setFormData(prev => ({ ...prev, distance: 0, city: '' }));
        setDistanceError('');
      }
    };

    const timeoutId = setTimeout(calculateDistance, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [formData.toPostalCode, formData.fromPostalCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedQuote = calculateQuote(formData, config, serviceOptions);
    const fullQuote = { ...formData, ...calculatedQuote };
    setQuote(fullQuote);
    onSubmit(fullQuote);
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  if (quote) {
    return <QuoteDisplay quote={quote} config={config} onBack={() => setQuote(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <i className="fas fa-music mr-3 text-purple-400"></i>
          {t('clientForm.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.name')} *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('auth.email')} *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.eventType')} *</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{t(`eventTypes.${type.value}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.eventDate')} *</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                lang={language}
              />
              <p className="text-xs text-gray-400 mt-1">
                {language === 'de' && 'Format: tt.mm.jjjj'}
                {language === 'en' && 'Format: mm/dd/yyyy'}
                {language === 'es' && 'Formato: dd-mm-aaaa'}
              </p>
            </div>
          </div>

          {/* Postal Codes */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.fromPostalCode')}</label>
              <input
                type="text"
                value={formData.fromPostalCode}
                onChange={(e) => setFormData({...formData, fromPostalCode: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                placeholder="93051"
              />
              <p className="text-xs text-gray-400 mt-1">{t('clientForm.fromPostalCodeHint')}</p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.toPostalCode')} *</label>
              <input
                type="text"
                required
                value={formData.toPostalCode}
                onChange={(e) => setFormData({...formData, toPostalCode: e.target.value.replace(/\D/g, '').slice(0, 5)})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                placeholder="80331"
              />
              <p className="text-xs text-gray-400 mt-1">{t('clientForm.toPostalCodeHint')}</p>
            </div>
          </div>

          {/* Distance Display */}
          {(calculatingDistance || formData.distance > 0) && (
            <div className="bg-gray-900 rounded-lg p-4">
              {calculatingDistance ? (
                <div className="flex items-center text-purple-300">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  <span>{t('clientForm.calculatingDistance')}</span>
                </div>
              ) : formData.distance > 0 ? (
                <div className="text-purple-300">
                  <i className="fas fa-route mr-2"></i>
                  <strong>{t('clientForm.distance')}:</strong> {formData.distance} km
                  {formData.city && (
                    <span className="text-gray-400 ml-2">({formData.city})</span>
                  )}
                </div>
              ) : null}
              {distanceError && (
                <div className="text-red-400 text-sm mt-2">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {distanceError}
                </div>
              )}
            </div>
          )}

          {/* Time & Guests */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.startTime')} *</label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.endTime')} *</label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.guests')}</label>
              <input
                type="number"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="text-center text-purple-300 font-semibold">
            <i className="fas fa-clock mr-2"></i>
            {t('clientForm.duration')}: {hours} {t('clientForm.hours')}
          </div>

          {/* Venue Type */}
          <div>
            <label className="block mb-2 text-sm font-semibold">{t('clientForm.venueType')}</label>
            <div className="flex gap-4">
              {['interior', 'exterior', 'ambos'].map(type => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="venueType"
                    value={type}
                    checked={formData.venueType === type}
                    onChange={(e) => setFormData({...formData, venueType: e.target.value})}
                    className="mr-2"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block mb-3 text-sm font-semibold">{t('clientForm.services')} *</label>
            <div className="space-y-2">
              {serviceOptions.map(service => (
                <label key={service.id} className="flex items-center p-3 bg-gray-900 rounded cursor-pointer hover:bg-gray-800 transition">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="mr-3"
                  />
                  <span className="flex-1">{t(service.labelKey)}</span>
                  <span className="text-purple-400 font-semibold">
                    {service.price > 0 ? `+€${service.price}` : t('clientForm.included')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Music Styles Checklist */}
          <div>
            <label className="block mb-3 text-sm font-semibold">{t('clientForm.musicStyles')}</label>
            <div className="grid md:grid-cols-2 gap-3 bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              {musicStyles.map(style => (
                <label key={style.id} className="flex items-center p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition">
                  <input
                    type="checkbox"
                    checked={formData.musicStyles.includes(style.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          musicStyles: [...prev.musicStyles, style.id]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          musicStyles: prev.musicStyles.filter(id => id !== style.id)
                        }));
                      }
                    }}
                    className="mr-3"
                  />
                  <span>{style.label[language]}</span>
                </label>
              ))}
            </div>
            <div className="mt-3">
              <label className="block mb-2 text-sm font-semibold">{t('clientForm.musicStylesOther')}</label>
              <input
                type="text"
                value={formData.musicStylesOther}
                onChange={(e) => setFormData({...formData, musicStylesOther: e.target.value})}
                placeholder={t('clientForm.musicStylesOther')}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Spotify Link */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              <i className="fab fa-spotify mr-2 text-green-400"></i>
              {t('clientForm.spotifyLink')}
            </label>
            <input
              type="url"
              value={formData.spotifyLink}
              onChange={(e) => setFormData({...formData, spotifyLink: e.target.value})}
              placeholder="https://open.spotify.com/playlist/..."
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
            />
            <p className="text-xs text-gray-400 mt-1">{t('clientForm.spotifyHint')}</p>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block mb-2 text-sm font-semibold">{t('clientForm.specialRequests')}</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              rows="4"
              placeholder={t('clientForm.specialRequestsPlaceholder')}
              className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            <i className="fas fa-calculator mr-2"></i>
            {t('clientForm.calculateQuote')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
