import Languages from 'server/models/language';
import { get, set } from 'server/options';

export const getLocaleIds = async () => {
  const cashe = get('locales');
  if (!cashe) {
    const locales = await Languages.find().select('localeId -_id').lean() as { localeId: string }[];
    const map = locales.map(l => l.localeId);
    set('locales', map);
    return map;
  } else {
    return cashe as string[];
  }
}
