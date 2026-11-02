export default function BrandMark() {
  return <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="brand-stroke" x1="4" y1="5" x2="37" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C4B5FD" />
        <stop offset=".55" stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#67E8F9" />
      </linearGradient>
      <linearGradient id="brand-fill" x1="12" y1="10" x2="29" y2="31" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5F3FF" />
        <stop offset="1" stopColor="#A78BFA" />
      </linearGradient>
    </defs>
    <rect className="brand-mark-frame" x="1" y="1" width="38" height="38" rx="12" stroke="url(#brand-stroke)" strokeWidth="1.2" />
    <path className="brand-mark-glyph" d="M13 15.1h14M20 11.5v15.1c0 2.2 1.2 3.4 3.2 3.4 1.2 0 2.3-.4 3.3-1.2" stroke="url(#brand-fill)" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle className="brand-mark-star" cx="28.7" cy="27.8" r="1.7" fill="#67E8F9" />
    <path className="brand-mark-orbit" d="M8.5 28.9c4.2 4.8 12.2 6.2 18.1 3.1 4.4-2.3 7-6.4 7.1-11" stroke="url(#brand-stroke)" strokeWidth=".8" strokeLinecap="round" opacity=".5" />
  </svg>;
}
