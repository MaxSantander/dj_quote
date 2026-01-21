import { useLanguage } from '../contexts/LanguageContext';

function Header({ view, onNavigate }) {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-headphones text-3xl text-purple-400"></i>
          <h1 className="text-2xl font-bold">{t('header.title')}</h1>
        </div>
        <nav className="flex items-center space-x-4 flex-wrap">
          <button 
            onClick={() => onNavigate('client')}
            className={`px-4 py-2 rounded transition ${view === 'client' ? 'bg-purple-600' : 'hover:bg-purple-800'}`}
          >
            {t('header.quote')}
          </button>
          
          <button 
            onClick={() => onNavigate('admin-login')}
            className={`px-4 py-2 rounded transition ${view === 'admin' || view === 'admin-login' ? 'bg-purple-600' : 'hover:bg-purple-800'}`}
          >
            <i className="fas fa-cog mr-2"></i>{t('header.admin')}
          </button>

          <div className="flex items-center space-x-2">
            <i className="fas fa-globe text-purple-400"></i>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-900 border border-purple-500 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇬🇧 English</option>
              <option value="de">🇩🇪 Deutsch</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
