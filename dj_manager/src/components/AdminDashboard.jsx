import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function AdminDashboard({ config, onConfigSave, quotes, setQuotes, onLogout }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('config'); // 'config', 'quotes'
  const [editConfig, setEditConfig] = useState(config);

  const handleSaveConfig = () => {
    onConfigSave(editConfig);
    alert(t('admin.configSaved'));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            <i className="fas fa-cog mr-3 text-purple-400"></i>
            {t('admin.title')}
          </h2>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            {t('header.logout')}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'config' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-sliders-h mr-2"></i>
            {t('admin.config')}
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'quotes' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-list mr-2"></i>
            {t('admin.quotes')} ({quotes.length})
          </button>
        </div>

        {/* Config Tab */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold">{t('admin.baseRatePerHour')}</label>
                <input
                  type="number"
                  value={editConfig.baseRatePerHour}
                  onChange={(e) => setEditConfig({...editConfig, baseRatePerHour: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">{t('admin.extraHourRate')}</label>
                <input
                  type="number"
                  value={editConfig.extraHourRate}
                  onChange={(e) => setEditConfig({...editConfig, extraHourRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">{t('admin.kmRate')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={editConfig.kmRate}
                  onChange={(e) => setEditConfig({...editConfig, kmRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">{t('admin.taxRate')}</label>
                <input
                  type="number"
                  value={editConfig.taxRate}
                  onChange={(e) => setEditConfig({...editConfig, taxRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">{t('admin.equipmentPrices')}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">{t('admin.paBasic')}</label>
                  <input
                    type="number"
                    value={editConfig.equipment.paBasic}
                    onChange={(e) => setEditConfig({...editConfig, equipment: {...editConfig.equipment, paBasic: parseFloat(e.target.value)}})}
                    className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t('admin.paPro')}</label>
                  <input
                    type="number"
                    value={editConfig.equipment.paPro}
                    onChange={(e) => setEditConfig({...editConfig, equipment: {...editConfig.equipment, paPro: parseFloat(e.target.value)}})}
                    className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t('admin.lightingBasic')}</label>
                  <input
                    type="number"
                    value={editConfig.equipment.lightingBasic}
                    onChange={(e) => setEditConfig({...editConfig, equipment: {...editConfig.equipment, lightingBasic: parseFloat(e.target.value)}})}
                    className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t('admin.lightingPro')}</label>
                  <input
                    type="number"
                    value={editConfig.equipment.lightingPro}
                    onChange={(e) => setEditConfig({...editConfig, equipment: {...editConfig.equipment, lightingPro: parseFloat(e.target.value)}})}
                    className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t('admin.wirelessMic')}</label>
                  <input
                    type="number"
                    value={editConfig.equipment.wireless_mic}
                    onChange={(e) => setEditConfig({...editConfig, equipment: {...editConfig.equipment, wireless_mic: parseFloat(e.target.value)}})}
                    className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t('admin.ceremony')}</label>
                  <input
                    type="number"
                    value={editConfig.equipment.ceremony}
                    onChange={(e) => setEditConfig({...editConfig, equipment: {...editConfig.equipment, ceremony: parseFloat(e.target.value)}})}
                    className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold">{t('admin.deposit')}</label>
                <input
                  type="number"
                  value={editConfig.deposit}
                  onChange={(e) => setEditConfig({...editConfig, deposit: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">{t('admin.cancellationPolicy')}</label>
              <textarea
                value={editConfig.cancellationPolicy || ''}
                onChange={(e) => setEditConfig({...editConfig, cancellationPolicy: e.target.value})}
                rows="3"
                placeholder={t('quote.cancellationPolicyText')}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500 rounded focus:outline-none focus:border-purple-400"
              ></textarea>
              <p className="text-xs text-gray-400 mt-1">
                {t('admin.cancellationPolicyHint')}
              </p>
            </div>

            <button
              onClick={handleSaveConfig}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-bold transition"
            >
              <i className="fas fa-save mr-2"></i>
              {t('admin.saveConfig')}
            </button>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div>
            {quotes.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <i className="fas fa-inbox text-6xl mb-4"></i>
                <p>{t('admin.noQuotes')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-purple-400">{quote.name}</h3>
                        <p className="text-sm text-gray-400">{quote.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">€{quote.total.toFixed(2)}</div>
                        <div className="text-xs text-gray-400">{new Date(quote.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div><strong>{t('quote.event')}:</strong> {quote.eventType}</div>
                      <div><strong>{t('quote.date')}:</strong> {quote.eventDate}</div>
                      <div><strong>{t('quote.location')}:</strong> {quote.city || quote.toPostalCode}</div>
                      <div><strong>{t('quote.schedule')}:</strong> {quote.startTime} - {quote.endTime}</div>
                      <div><strong>{t('clientForm.duration')}:</strong> {quote.hours}h</div>
                      <div><strong>{t('clientForm.guests')}:</strong> {quote.guests}</div>
                    </div>
                    {quote.spotifyLink && (
                      <div className="mt-3 p-2 bg-green-900 bg-opacity-20 rounded text-sm">
                        <i className="fab fa-spotify mr-2 text-green-400"></i>
                        <a href={quote.spotifyLink} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                          {t('quote.viewSpotify')}
                        </a>
                      </div>
                    )}
                    {quote.specialRequests && (
                      <div className="mt-3 p-3 bg-gray-800 rounded text-sm">
                        <strong>{t('admin.specialRequests')}:</strong>
                        <p className="text-gray-300 mt-1">{quote.specialRequests}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
