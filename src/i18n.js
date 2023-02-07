import { useLocation } from "react-router-dom"
import localeEn from "./i18n/en.json"
import localePt from "./i18n/pt.json"

const locales = {
    en: localeEn,
    pt: localePt
}

export const useLocale = () => {
    const loc = useLocation()
    let locale = new URLSearchParams(loc.search).get('lang')
    if (locales[locale] == null)
        locale = "pt"
    return [locale, locales[locale]]
}