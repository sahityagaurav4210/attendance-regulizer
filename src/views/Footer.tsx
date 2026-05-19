import React, { type ReactNode } from 'react';
import IndianFlag from '../svg/IndianFlag';

function Footer(): ReactNode {
  const appVersion = import.meta.env.VITE_APP_VERSION || '0.0.0';
  return (
    <footer className="mt-8 text-center text-slate-400 text-sm">
      <div className="flex gap-x-1 items-center justify-center">
        <div className="flex items-center justify-center gap-x-2">
          <p>Made in</p>
          <IndianFlag size={16} />
        </div>

        <p> || v{appVersion}</p>
      </div>
      <p>© 2026 Gaurav Sahitya. All rights reserved.</p>
      <p className="mt-1">Designed for precision and ease of use.</p>
    </footer>
  );
}

export default React.memo(Footer);
