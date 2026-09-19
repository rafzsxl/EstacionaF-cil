(() => {
  'use strict';

  const KEY = 'estaciona-facil-v1';
  const VERSION = 3;
  const SCHEMA = 'parking-days-v1';
  const rates = { car: 10, motorcycle: 8 };

  const today = () => new Date().toISOString().slice(0, 10);
  const makeDay = () => ({ id: `day-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, date: today(), status: 'open', createdAt: Date.now() });
  const rateFor = category => Number(rates[category] || 0);
  const numberOr = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

  function migrate(parsed) {
    const source = parsed && typeof parsed === 'object' ? parsed : {};
    const legacyActive = Array.isArray(source.active) ? source.active : [];
    const legacyHistory = Array.isArray(source.history) ? source.history : [];
    const sourceDays = Array.isArray(source.days) ? source.days.filter(day => day && day.id) : [];
    const days = sourceDays.length ? sourceDays.map(day => ({
      ...day,
      status: day.status === 'closed' ? 'closed' : 'open',
      date: day.date || today()
    })) : [makeDay()];
    const currentDayId = days.some(day => day.id === source.currentDayId)
      ? source.currentDayId
      : days[days.length - 1].id;
    const normalizeRecord = (item, isHistory) => {
      const category = item.category === 'motorcycle' ? 'motorcycle' : 'car';
      const rate = rateFor(category);
      const normalized = {
        ...item,
        category,
        dayId: item.dayId || currentDayId,
        fixedFee: numberOr(item.fixedFee, rate),
        hourlyRate: numberOr(item.hourlyRate, rate)
      };
      if (isHistory) {
        normalized.amount = numberOr(item.amount, normalized.fixedFee + normalized.hourlyRate * Math.max(0, numberOr(item.exit, item.entry) - numberOr(item.entry, 0)) / 3600000);
        if (item.fixedFee == null || item.hourlyRate == null) normalized.legacy = true;
      }
      return normalized;
    };
    return {
      version: VERSION,
      schema: SCHEMA,
      days,
      currentDayId,
      active: legacyActive.map(item => normalizeRecord(item, false)),
      history: legacyHistory.map(item => normalizeRecord(item, true))
    };
  }

  function load() {
    let parsed = null;
    try { parsed = JSON.parse(localStorage.getItem(KEY)); } catch { /* JSON antigo inválido: iniciar sem descartar o restante possível. */ }
    const state = migrate(parsed);
    const records = [...state.active, ...state.history];
    const incomplete = !Array.isArray(parsed?.active) || !Array.isArray(parsed?.history) || !Array.isArray(parsed?.days) || !parsed?.currentDayId || records.some(item => !item.dayId || !Number.isFinite(item.fixedFee) || !Number.isFinite(item.hourlyRate));
    const needsMigration = !parsed || parsed.version !== VERSION || parsed.schema !== SCHEMA || incomplete;
    if (needsMigration) {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* A aplicação continua utilizável se o armazenamento estiver bloqueado. */ }
    }
    return state;
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify({ ...state, version: VERSION, schema: SCHEMA }));
  }

  window.EstacionaFacilStorage = { KEY, VERSION, SCHEMA, load, save };
})();
