import { useLanguage } from 'contexts/language'

export const useGetTranslatedLabel = () => {
  const { language } = useLanguage()

  const getTranslatedLabel = (c) =>
    (language === 'he-IL' ? c?.translation_heb : c?.name) || c?.name
  return getTranslatedLabel
}
