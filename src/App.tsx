import './configs/Internationalization';
import { memo, useEffect, useState, type ReactNode } from 'react';
import useAppHelperFns from './hooks/useAppHelperFns';
import { useTranslation } from 'react-i18next';
import Header from './views/Header';
import Footer from './views/Footer';

function App(): ReactNode {
  const { t } = useTranslation();
  const { formatOutTime, convertToIST } = useAppHelperFns();
  const [istTime, setIstTime] = useState(convertToIST(new Date()));
  const [inTime, setInTime] = useState(
    `${istTime.getFullYear()}-${String(istTime.getMonth() + 1).padStart(2, '0')}-${String(istTime.getDate()).padStart(2, '0')}T${String(istTime.getHours()).padStart(2, '0')}:${String(istTime.getMinutes()).padStart(2, '0')}`,
  );
  const [timer, setTimer] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState('08:30');
  const [outTime, setOutTime] = useState<string | null>(null);

  useEffect(function () {
    const interval = setInterval(() => {
      const currentIstTime = convertToIST(new Date());
      setIstTime(currentIstTime);
      setInTime(
        `${currentIstTime.getFullYear()}-${String(currentIstTime.getMonth() + 1).padStart(2, '0')}-${String(currentIstTime.getDate()).padStart(2, '0')}T${String(currentIstTime.getHours()).padStart(2, '0')}:${String(currentIstTime.getMinutes()).padStart(2, '0')}`,
      );
    }, 60_000);
    setTimer(interval);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inTime || !timer || !selectedDuration) return;

    clearInterval(timer);
    const date = new Date(inTime);
    const [hours, minutes] = selectedDuration.split(':').map(Number);

    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);

    // Format the out time
    const formattedOutTime = formatOutTime(date);
    setOutTime(formattedOutTime);
  };

  const handleReset = () => {
    globalThis.location.reload();
  };

  const handleInTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearInterval(timer);
    setInTime(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="body-height flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
            <h1 className="text-2xl font-bold text-white text-center">
              {t('attendanceRegulizer')}
            </h1>
            <p className="text-blue-100 text-sm text-center mt-1">
              {t('calculateCheckOutTime')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="inTime"
                className="block text-sm sm:text-xs font-bold text-blue-700 pl-1 uppercase underline underline-offset-2 decoration-dashed decoration-blue-500"
              >
                {t('inTime')}
              </label>
              <input
                id="inTime"
                type="datetime-local"
                value={inTime}
                onChange={handleInTimeChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="duration"
                className="block text-sm sm:text-xs font-bold text-blue-700 pl-1 uppercase underline underline-offset-2 decoration-dashed decoration-blue-500"
              >
                {t('duration')}
              </label>
              <div className="relative">
                <select
                  id="duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
                >
                  <option value="08:30">08:30</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition-all border border-blue-600 flex items-center justify-center space-x-2 text-white ring-2 ring-blue-400 focus:ring-blue-500 ring-offset-1 focus:ring-offset-blue-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{t('calculate')}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-8 rounded-lg transition-all border border-red-200 flex items-center justify-center space-x-2 ring-2 ring-red-300 focus:ring-red-400 ring-offset-1 focus:ring-offset-red-100"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{t('reset')}</span>
              </button>
            </div>
          </form>

          {outTime && (
            <div className="px-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-center text-center">
                <span className="text-green-600 text-sm font-bold uppercase tracking-wider mb-1">
                  {t('outTime')}
                </span>
                <span className="text-3xl font-extrabold text-slate-900">
                  {outTime}
                </span>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default memo(App);
