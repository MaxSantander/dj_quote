/**
 * Obtiene las coordenadas de un código postal usando OpenStreetMap Nominatim API
 */
export const getCoordinatesFromPostalCode = async (postalCode, country = 'DE') => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=${country}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'DJQuotePro/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener coordenadas');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo coordenadas:', error);
    return null;
  }
};

/**
 * Calcula la distancia en kilómetros entre dos puntos usando la fórmula de Haversine
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Redondear a 1 decimal
};

/**
 * Calcula la distancia entre dos códigos postales
 */
export const calculateDistanceBetweenPostalCodes = async (fromPostalCode, toPostalCode, country = 'DE') => {
  try {
    const [fromCoords, toCoords] = await Promise.all([
      getCoordinatesFromPostalCode(fromPostalCode, country),
      getCoordinatesFromPostalCode(toPostalCode, country)
    ]);
    
    if (!fromCoords || !toCoords) {
      return {
        success: false,
        message: 'No se pudieron obtener las coordenadas de uno o ambos códigos postales'
      };
    }
    
    const distance = calculateDistance(
      fromCoords.lat,
      fromCoords.lon,
      toCoords.lat,
      toCoords.lon
    );
    
    return {
      success: true,
      distance,
      fromLocation: fromCoords.displayName,
      toLocation: toCoords.displayName
    };
  } catch (error) {
    console.error('Error calculando distancia:', error);
    return {
      success: false,
      message: 'Error al calcular la distancia'
    };
  }
};
