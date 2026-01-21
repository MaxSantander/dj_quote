import jsPDF from 'jspdf';
import { getLanguage } from '../i18n/translations';
import { translations } from '../i18n/translations';

const CONTACT_INFO = {
  email: 'info@r-flow.online',
  phone: '+49 1747590459',
  whatsapp: '+49 1747590459',
  web: 'r-flow.online',
  instagram: 'regensburgflow'
};

const t = (key) => {
  const lang = getLanguage();
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const generateQuotePDF = (quote, config) => {
  const doc = new jsPDF();
  const lang = getLanguage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  // Colors
  const primaryColor = [138, 43, 226]; // Purple
  const darkColor = [30, 30, 30];

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(t('quote.title'), pageWidth / 2, 25, { align: 'center' });

  yPos = 55;

  // Client Info Section
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(t('quote.eventDetails'), margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const clientInfo = [
    [t('quote.client'), quote.name],
    [t('auth.email'), quote.email],
    [t('quote.event'), quote.eventType],
    [t('quote.date'), quote.eventDate],
    [t('quote.location'), quote.city || quote.toPostalCode || ''],
    [t('quote.schedule'), `${quote.startTime} - ${quote.endTime} (${quote.hours}h)`],
    [t('clientForm.guests'), quote.guests.toString()],
    [t('quote.venue'), quote.venueType]
  ];

  clientInfo.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 50, yPos);
    yPos += 6;
  });

  yPos += 5;

  // Price Breakdown Section
  if (yPos > 250) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(t('quote.priceBreakdown'), margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const priceItems = [
    [t('quote.baseRate') + ` (${Math.min(quote.hours, 5)}h)`, quote.baseRate.toFixed(2)],
  ];

  if (quote.extraHours > 0) {
    priceItems.push([
      `${t('quote.extraHours')} (${quote.extraHours}h × €${config.extraHourRate})`,
      quote.extraHoursCost.toFixed(2)
    ]);
  }

  if (quote.equipmentCost > 0) {
    priceItems.push([t('quote.equipment'), quote.equipmentCost.toFixed(2)]);
  }

  if (quote.travelCost > 0) {
    priceItems.push([
      `${t('quote.travel')} (${quote.distance}km)`,
      quote.travelCost.toFixed(2)
    ]);
  }

  priceItems.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.text(label, margin, yPos);
    doc.text(`€${value}`, pageWidth - margin - 30, yPos, { align: 'right' });
    yPos += 6;
  });

  // Totals
  yPos += 3;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'normal');
  doc.text(t('quote.subtotal'), margin, yPos);
  doc.text(`€${quote.subtotal.toFixed(2)}`, pageWidth - margin - 30, yPos, { align: 'right' });
  yPos += 6;

  doc.text(`${t('quote.tax')} (${config.taxRate}%)`, margin, yPos);
  doc.text(`€${quote.tax.toFixed(2)}`, pageWidth - margin - 30, yPos, { align: 'right' });
  yPos += 8;

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t('quote.total'), margin, yPos);
  doc.text(`€${quote.total.toFixed(2)}`, pageWidth - margin - 30, yPos, { align: 'right' });
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setFillColor(230, 230, 250);
  doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 10, 2, 2, 'F');
  doc.text(`${t('quote.deposit')} (${config.deposit}%)`, margin + 5, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(`€${quote.deposit.toFixed(2)}`, pageWidth - margin - 30, yPos, { align: 'right' });
  yPos += 15;

  // Cancellation Policy
  if (yPos > 250) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(t('quote.cancellationPolicy'), margin, yPos);
  yPos += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const policyLines = doc.splitTextToSize(config.cancellationPolicy, pageWidth - 2 * margin);
  doc.text(policyLines, margin, yPos);
  yPos += policyLines.length * 5 + 10;

  // Contact Information
  if (yPos > 250) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'es' ? 'Información de Contacto' : lang === 'en' ? 'Contact Information' : 'Kontaktinformationen', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const contactLabels = {
    es: { email: 'Email', phone: 'Teléfono/WhatsApp', web: 'Web', instagram: 'Instagram' },
    en: { email: 'Email', phone: 'Phone/WhatsApp', web: 'Web', instagram: 'Instagram' },
    de: { email: 'E-Mail', phone: 'Telefon/WhatsApp', web: 'Web', instagram: 'Instagram' }
  };

  const labels = contactLabels[lang] || contactLabels.en;

  doc.text(`${labels.email}: ${CONTACT_INFO.email}`, margin, yPos);
  yPos += 6;
  doc.text(`${labels.phone}: ${CONTACT_INFO.phone}`, margin, yPos);
  yPos += 6;
  doc.text(`${labels.web}: ${CONTACT_INFO.web}`, margin, yPos);
  yPos += 6;
  doc.text(`${labels.instagram}: @${CONTACT_INFO.instagram}`, margin, yPos);

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `R-Flow - ${CONTACT_INFO.web} | ${CONTACT_INFO.email}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save PDF
  const fileName = `Cotizacion_${quote.name.replace(/\s+/g, '_')}_${quote.eventDate}.pdf`;
  doc.save(fileName);
};
