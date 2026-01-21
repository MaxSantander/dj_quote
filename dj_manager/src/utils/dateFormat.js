/**
 * Formatea una fecha según el idioma seleccionado
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @param {string} lang - Idioma ('es', 'en', 'de')
 * @returns {string} Fecha formateada
 */
export const formatDateForDisplay = (dateString, lang) => {
  if (!dateString) return '';
  
  const date = new Date(dateString + 'T00:00:00');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  switch (lang) {
    case 'de':
      return `${day}.${month}.${year}`;
    case 'en':
      return `${month}/${day}/${year}`;
    case 'es':
    default:
      return `${day}-${month}-${year}`;
  }
};

/**
 * Convierte una fecha formateada a formato YYYY-MM-DD para el input
 * @param {string} formattedDate - Fecha formateada
 * @param {string} lang - Idioma
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
export const parseFormattedDate = (formattedDate, lang) => {
  if (!formattedDate) return '';
  
  // Si ya está en formato YYYY-MM-DD, devolverlo
  if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
    return formattedDate;
  }
  
  let day, month, year;
  
  switch (lang) {
    case 'de':
      // Formato: dd.mm.yyyy
      const partsDE = formattedDate.split('.');
      if (partsDE.length === 3) {
        day = partsDE[0].trim();
        month = partsDE[1].trim();
        year = partsDE[2].trim();
      }
      break;
    case 'en':
      // Formato: mm/dd/yyyy
      const partsEN = formattedDate.split('/');
      if (partsEN.length === 3) {
        month = partsEN[0].trim();
        day = partsEN[1].trim();
        year = partsEN[2].trim();
      }
      break;
    case 'es':
    default:
      // Formato: dd-mm-yyyy
      const partsES = formattedDate.split('-');
      if (partsES.length === 3 && partsES[0].length <= 2) {
        // Si el primer segmento es <= 2 dígitos, asumimos formato dd-mm-yyyy
        day = partsES[0].trim();
        month = partsES[1].trim();
        year = partsES[2].trim();
      } else if (partsES.length === 3 && partsES[0].length === 4) {
        // Si el primer segmento es 4 dígitos, es formato yyyy-mm-dd
        year = partsES[0].trim();
        month = partsES[1].trim();
        day = partsES[2].trim();
      }
      break;
  }
  
  if (day && month && year) {
    // Validar que los valores sean numéricos
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 1900 && yearNum <= 2100) {
      return `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    }
  }
  
  return '';
};

/**
 * Obtiene el placeholder para el campo de fecha según el idioma
 * @param {string} lang - Idioma
 * @returns {string} Placeholder
 */
export const getDatePlaceholder = (lang) => {
  switch (lang) {
    case 'de':
      return 'tt.mm.jjjj';
    case 'en':
      return 'mm/dd/yyyy';
    case 'es':
    default:
      return 'dd-mm-aaaa';
  }
};

/**
 * Obtiene el patrón de formato para validación
 * @param {string} lang - Idioma
 * @returns {string} Patrón regex
 */
export const getDatePattern = (lang) => {
  switch (lang) {
    case 'de':
      return '\\d{2}\\.\\d{2}\\.\\d{4}';
    case 'en':
      return '\\d{2}/\\d{2}/\\d{4}';
    case 'es':
    default:
      return '\\d{2}-\\d{2}-\\d{4}';
  }
};
