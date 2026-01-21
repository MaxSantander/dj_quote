import { useLanguage } from '../contexts/LanguageContext';
import { generateQuotePDF } from '../utils/pdfGenerator';

function QuoteDisplay({ quote, config, onBack }) {
  const { t } = useLanguage();

  const handleDownloadPDF = () => {
    generateQuotePDF(quote, config);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-purple-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          <i className="fas fa-file-invoice-dollar mr-3"></i>
          {t('quote.title')}
        </h2>

        {/* Client Info */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">{t('quote.eventDetails')}</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><strong>{t('quote.client')}:</strong> {quote.name}</div>
            <div><strong>{t('auth.email')}:</strong> {quote.email}</div>
            <div><strong>{t('quote.event')}:</strong> {quote.eventType}</div>
            <div><strong>{t('quote.date')}:</strong> {quote.eventDate}</div>
            <div><strong>{t('quote.location')}:</strong> {quote.city || `${quote.toPostalCode || ''}`}</div>
            <div><strong>{t('quote.schedule')}:</strong> {quote.startTime} - {quote.endTime} ({quote.hours}h)</div>
            <div><strong>{t('clientForm.guests')}:</strong> {quote.guests}</div>
            <div><strong>{t('quote.venue')}:</strong> {quote.venueType}</div>
          </div>
          {quote.spotifyLink && (
            <div className="mt-4 p-3 bg-green-900 bg-opacity-30 rounded">
              <i className="fab fa-spotify mr-2 text-green-400"></i>
              <a href={quote.spotifyLink} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                {t('quote.viewSpotify')}
              </a>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">{t('quote.priceBreakdown')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{t('quote.baseRate')} ({Math.min(quote.hours, 5)}h)</span>
              <span className="font-semibold">€{quote.baseRate.toFixed(2)}</span>
            </div>
            {quote.extraHours > 0 && (
              <div className="flex justify-between">
                <span>{t('quote.extraHours')} ({quote.extraHours}h × €{config.extraHourRate})</span>
                <span className="font-semibold">€{quote.extraHoursCost.toFixed(2)}</span>
              </div>
            )}
            {quote.equipmentCost > 0 && (
              <div className="flex justify-between">
                <span>{t('quote.equipment')}</span>
                <span className="font-semibold">€{quote.equipmentCost.toFixed(2)}</span>
              </div>
            )}
            {quote.travelCost > 0 && (
              <div className="flex justify-between">
                <span>{t('quote.travel')} ({quote.distance}km)</span>
                <span className="font-semibold">€{quote.travelCost.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-700 pt-3 flex justify-between">
              <span>{t('quote.subtotal')}</span>
              <span className="font-semibold">€{quote.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('quote.tax')} ({config.taxRate}%)</span>
              <span className="font-semibold">€{quote.tax.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-purple-500 pt-3 flex justify-between text-2xl font-bold text-purple-400">
              <span>{t('quote.total')}</span>
              <span>€{quote.total.toFixed(2)}</span>
            </div>
            <div className="bg-purple-900 bg-opacity-30 p-3 rounded mt-4">
              <div className="flex justify-between">
                <span>{t('quote.deposit')} ({config.deposit}%)</span>
                <span className="font-bold text-lg">€{quote.deposit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-purple-300">{t('quote.cancellationPolicy')}</h3>
          <p className="text-sm text-gray-300">
            {config.cancellationPolicy || t('quote.cancellationPolicyText')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-semibold transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {t('quote.newQuote')}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition"
          >
            <i className="fas fa-download mr-2"></i>
            {t('quote.downloadPDF')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteDisplay;
