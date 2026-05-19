import { Languages } from 'lucide-react';
import React, { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import LangConfig from '../configs/LangConfig';
import AppConstants from '../configs/AppConstants';
import AppImages from '../components/AppImages';
import { t } from 'i18next';

function Header(): ReactNode {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(
    AppConstants.DEFAULT_LANG_CODE,
  );

  useEffect(
    function () {
      i18n.changeLanguage(language);
    },
    [language, i18n],
  );

  return (
    <header className="min-h-max p-2">
      <div className="flex items-center justify-end gap-x-2">
        <Languages size={24} />
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none [text-align-last:center]"
        >
          {Object.entries(LangConfig).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-x-1 items-center">
        <AppImages
          uri="/logo.jpeg"
          altTxt="CW Logo"
          width="24px"
          height="24px"
          type={AppConstants.IMG_TYPE.LOGO}
        />

        <h1 className="text-2xl sm:text-3xl font-black text-orange-500 mb-1 uppercase">
          {t('codingWorks')}
        </h1>
      </div>
    </header>
  );
}

export default React.memo(Header);
