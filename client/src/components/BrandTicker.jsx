import React from 'react';

const BrandTicker = () => {
  const brands = [
    {
      name: 'unicef',
      logo: (
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#00adef' }}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="8" stroke="currentColor" strokeWidth="1" />
          <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1" />
          <text x="26" y="18" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.5px" fill="currentColor">unicef</text>
        </svg>
      )
    },
    {
      name: 'Microsoft',
      logo: (
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="2" width="9" height="9" fill="#f25022"/>
          <rect x="11" y="2" width="9" height="9" fill="#7fba00"/>
          <rect x="0" y="13" width="9" height="9" fill="#00a4ef"/>
          <rect x="11" y="13" width="9" height="9" fill="#ffb900"/>
          <text x="26" y="18" fontFamily="Segoe UI, sans-serif" fontWeight="600" fontSize="15" fill="#5e5e5e">Microsoft</text>
        </svg>
      )
    },
    {
      name: 'TATA',
      logo: (
        <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#005a9c' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 8 9 L 12 16 L 16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="8" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="26" y="18" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="15" letterSpacing="1px" fill="currentColor">TATA</text>
        </svg>
      )
    },
    {
      name: 'Tech Mahindra',
      logo: (
        <svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 2 12 L 14 6 L 10 18" stroke="#ff0000" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="20" y="17" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="13" fill="#000000">Tech</text>
          <text x="52" y="17" fontFamily="system-ui, sans-serif" fontWeight="300" fontSize="13" fill="#ff0000">Mahindra</text>
        </svg>
      )
    },
    {
      name: 'Infosys',
      logo: (
        <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#007cc3' }}>
          <text x="2" y="18" fontFamily="system-ui, sans-serif" fontWeight="800" fontStyle="italic" fontSize="19" letterSpacing="-0.5px" fill="currentColor">Infosys</text>
        </svg>
      )
    },
    {
      name: 'Reliance Foundation',
      logo: (
        <svg width="170" height="24" viewBox="0 0 170 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 4 L 16 12 L 6 20 Z" fill="#d2153d" />
          <text x="22" y="17" fontFamily="system-ui, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14" fill="#0a2240">Reliance</text>
          <text x="86" y="17" fontFamily="system-ui, sans-serif" fontWeight="400" fontSize="12" fill="#d2153d">Foundation</text>
        </svg>
      )
    },
    {
      name: 'GiveIndia',
      logo: (
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12 18 C 12 18 4 12 4 8 C 4 5 6 3 9 3 C 11 3 12 5 12 5 C 12 5 13 3 15 3 C 18 3 20 5 20 8 C 20 12 12 18 12 18 Z" fill="#ec4899" />
          <text x="26" y="17" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="15" fill="#0f172a">Give</text>
          <text x="58" y="17" fontFamily="system-ui, sans-serif" fontWeight="300" fontSize="15" fill="#ec4899">India</text>
        </svg>
      )
    }
  ];

  // Duplicate the array for a seamless loop
  const tickerItems = [...brands, ...brands, ...brands];

  return (
    <div className="brand-ticker-container">
      <div className="brand-ticker-mask">
        <div className="brand-ticker-track" style={{ gap: '3.5rem' }}>
          {tickerItems.map((brand, index) => (
            <div key={index} className="brand-ticker-item" style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0 }}>
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandTicker;
