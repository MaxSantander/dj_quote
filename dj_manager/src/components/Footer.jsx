import { useLanguage } from '../contexts/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black bg-opacity-50 border-t border-purple-500 mt-12 py-6 text-center text-gray-400">
      <p>{t('footer.copyright')}</p>
    </footer>
  );
}

export default Footer;
