const CONFIG_KEY = 'djQuoteConfig';
const QUOTES_KEY = 'djQuotes';

/**
 * Guarda la configuración en localStorage
 * @param {Object} config - Configuración a guardar
 */
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error guardando configuración:', error);
  }
};

/**
 * Carga la configuración desde localStorage
 * @param {Object} defaultConfig - Configuración por defecto si no existe
 * @returns {Object} Configuración cargada o por defecto
 */
export const loadConfig = (defaultConfig) => {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    return saved ? JSON.parse(saved) : defaultConfig;
  } catch (error) {
    console.error('Error cargando configuración:', error);
    return defaultConfig;
  }
};

/**
 * Guarda una cotización en localStorage
 * @param {Object} quote - Cotización a guardar
 */
export const saveQuote = (quote) => {
  try {
    const quotes = loadQuotes();
    const newQuotes = [...quotes, { ...quote, id: Date.now(), date: new Date().toISOString() }];
    localStorage.setItem(QUOTES_KEY, JSON.stringify(newQuotes));
    return newQuotes;
  } catch (error) {
    console.error('Error guardando cotización:', error);
    return [];
  }
};

/**
 * Carga todas las cotizaciones desde localStorage
 * @returns {Array} Array de cotizaciones
 */
export const loadQuotes = () => {
  try {
    const saved = localStorage.getItem(QUOTES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error cargando cotizaciones:', error);
    return [];
  }
};

/**
 * Actualiza las cotizaciones en localStorage
 * @param {Array} quotes - Array de cotizaciones
 */
export const updateQuotes = (quotes) => {
  try {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
  } catch (error) {
    console.error('Error actualizando cotizaciones:', error);
  }
};
