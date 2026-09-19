(() => {
  'use strict';

  const defaultRates = { car: 10, motorcycle: 8 };

  function normalizeVehicleType(vehicleType) {
    const value = String(vehicleType || '').toLowerCase();
    if (value === 'moto' || value === 'motorcycle') return 'motorcycle';
    return 'car';
  }

  /**
   * Calcula a cobrança do estacionamento.
   *
   * A taxa fixa é cobrada sempre. Depois das horas completas:
   * - 1 a 29 minutos: meia hora;
   * - 30 a 59 minutos: uma hora completa.
   */
  function calculateCharge(vehicleType, minutes, fixedFee, hourlyRate) {
    const category = normalizeVehicleType(vehicleType);
    const fixed = Number.isFinite(Number(fixedFee)) ? Number(fixedFee) : defaultRates[category];
    const hourly = Number.isFinite(Number(hourlyRate)) ? Number(hourlyRate) : defaultRates[category];
    const totalMinutes = Math.max(0, Math.floor(Number(minutes) || 0));
    const completeHours = Math.floor(totalMinutes / 60);
    const remainder = totalMinutes % 60;
    const fraction = remainder === 0 ? 0 : remainder < 30 ? 0.5 : 1;
    return Math.round((fixed + (completeHours + fraction) * hourly) * 100) / 100;
  }

  const billing = { calculateCharge, normalizeVehicleType, defaultRates };
  if (typeof module !== 'undefined' && module.exports) module.exports = billing;
  if (typeof window !== 'undefined') window.EstacionaFacilBilling = billing;
})();
