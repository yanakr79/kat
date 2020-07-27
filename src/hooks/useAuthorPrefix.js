import { useTranslation } from '../i18n';

const useAuthorPrefix = () => {
  const { t } = useTranslation();
  return `${t('author')}: `;
};

export default useAuthorPrefix;
