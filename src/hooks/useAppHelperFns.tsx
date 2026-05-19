function useAppHelperFns() {
  /**
   * This function formats the out time string in the desired format. (in en-IN locale)
   * @param inTime {Date}
   * @returns {string} formatted out time string
   */
  function formatOutTime(inTime: Date): string {
    return inTime.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  /**
   * Converts a date to Indian Standard Time (IST)
   * @param date {Date}
   * @returns {Date} converted date in IST
   */
  function convertToIST(date: Date): Date {
    const utcOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + utcOffset + 19800000); // 19800000 ms = 5.5 hours
  }

  return { formatOutTime, convertToIST };
}

export default useAppHelperFns;
