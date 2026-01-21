/**
 * Calcula las horas totales entre hora de inicio y fin
 * Maneja correctamente horarios que cruzan medianoche
 * @param {string} startTime - Hora de inicio (formato HH:mm)
 * @param {string} endTime - Hora de fin (formato HH:mm)
 * @returns {number} Número de horas
 */
export const calculateHours = (startTime, endTime) => {
  const start = parseInt(startTime.split(':')[0]);
  const end = parseInt(endTime.split(':')[0]);
  let hours = end - start;
  if (hours <= 0) hours += 24;
  return hours;
};

/**
 * Calcula el precio de una cotización basado en la configuración y datos del formulario
 * @param {Object} formData - Datos del formulario
 * @param {Object} config - Configuración de precios
 * @param {Array} serviceOptions - Opciones de servicios disponibles
 * @returns {Object} Objeto con todos los cálculos de precios
 */
export const calculateQuote = (formData, config, serviceOptions) => {
  const hours = calculateHours(formData.startTime, formData.endTime);
  const baseRate = config.baseRatePerHour * Math.min(hours, 5);
  const extraHours = Math.max(0, hours - 5);
  const extraHoursCost = extraHours * config.extraHourRate;

  const equipmentCost = formData.services.reduce((sum, serviceId) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    return sum + (service ? service.price : 0);
  }, 0);

  const travelCost = formData.distance * config.kmRate;
  const subtotal = baseRate + extraHoursCost + equipmentCost + travelCost;
  const tax = subtotal * (config.taxRate / 100);
  const total = subtotal + tax;

  return {
    hours,
    baseRate,
    extraHours,
    extraHoursCost,
    equipmentCost,
    travelCost,
    subtotal,
    tax,
    total,
    deposit: total * (config.deposit / 100)
  };
};
