import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ClientForm from './components/ClientForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { defaultConfig } from './constants/defaults';
import { loadConfig, saveConfig, saveQuote, loadQuotes, updateQuotes } from './utils/localStorage';

function App() {
  const [view, setView] = useState('client');
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  // Load admin config from localStorage
  const [adminConfig, setAdminConfig] = useState(() => {
    return loadConfig(defaultConfig);
  });

  const [quotes, setQuotes] = useState(() => {
    return loadQuotes();
  });

  const handleConfigSave = (config) => {
    setAdminConfig(config);
    saveConfig(config);
  };

  const handleQuoteSubmit = (quote) => {
    const newQuotes = saveQuote(quote);
    setQuotes(newQuotes);
  };

  const handleQuotesUpdate = (newQuotes) => {
    setQuotes(newQuotes);
    updateQuotes(newQuotes);
  };

  const handleNavigate = (newView) => {
    if (newView === 'admin' && !isAdminAuth) {
      setView('admin-login');
    } else {
      setView(newView);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminAuth(true);
    setView('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuth(false);
    setView('client');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <Header 
          view={view} 
          onNavigate={handleNavigate}
        />
        
        <main className="container mx-auto px-4 py-8">
          {view === 'client' && <ClientForm config={adminConfig} onSubmit={handleQuoteSubmit} />}
          {view === 'admin-login' && <AdminLogin onLogin={handleAdminLogin} />}
          {view === 'admin' && isAdminAuth && (
            <AdminDashboard 
              config={adminConfig} 
              onConfigSave={handleConfigSave}
              quotes={quotes}
              setQuotes={handleQuotesUpdate}
              onLogout={handleAdminLogout}
            />
          )}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
