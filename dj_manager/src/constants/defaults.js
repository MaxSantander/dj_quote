export const defaultConfig = {
  baseRatePerHour: 150,
  extraHourRate: 100,
  kmRate: 0.5,
  equipment: {
    paBasic: 200,
    paPro: 400,
    lightingBasic: 150,
    lightingPro: 350,
    wireless_mic: 50,
    ceremony: 200
  },
  taxRate: 19,
  deposit: 30,
  cancellationPolicy: '' // Se usa traducción dinámica según idioma
};

export const eventTypes = [
  { value: 'boda', label: 'Boda' },
  { value: 'cumpleanos', label: 'Cumpleaños' },
  { value: 'corporativo', label: 'Evento Corporativo' },
  { value: 'fiesta', label: 'Fiesta Privada' },
  { value: 'club', label: 'Club/Bar' }
];

export const ADMIN_PASSWORD = 'dj2024';
