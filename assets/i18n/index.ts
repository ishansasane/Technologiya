import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

import en from "../locales/en.json";
import ar from "../locales/ar.json";
import ch from "../locales/ch.json";
import fr from "../locales/fr.json";
import hi from "../locales/hi.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";

const i18n = new I18n({
  en,
  ar,
  ch,
  fr,
  hi,
  ja,
  ko,
});

i18n.enableFallback = true;
export const setI18nLanguage = (lang: string) => {
  i18n.locale = lang;
};
export default i18n;
