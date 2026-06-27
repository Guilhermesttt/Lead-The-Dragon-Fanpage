import leadImage from './assets/Lead The Dragon Logo.jpg'

function Home() {
  return (
    <div className="relative min-h-screen bg-bg-main text-white overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      <div
        className="absolute inset-0 z-3 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
        }}
      />
      <div className="absolute top-[68px] left-0 right-0 z-10 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(82,39,255,0.5), rgba(255,159,252,0.4), rgba(82,39,255,0.5), transparent)' }}
      />

      <div className="absolute bottom-[72px] left-0 right-0 z-10 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(82,39,255,0.5), rgba(255,159,252,0.4), rgba(82,39,255,0.5), transparent)' }}
      />

      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="X / Twitter"
            className="text-gray-400 hover:text-pink-neon transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </a>
        </div>

        {/* Center — Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src={leadImage}
            alt="Lead The Dragon Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Right — Menu */}
        <nav className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase">
          <span style={{ color: '#FF9FFC' }}>☰</span>
          <span className="text-gray-300 hover:text-pink-neon cursor-pointer transition-colors duration-200">
            Menu
          </span>
        </nav>
      </header>

      {/* ── BOTTOM INFO BAR ── */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-6 py-6">

        {/* Bottom Left */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#FF9FFC' }}>
            Lead The Dragon
          </p>
          <p className="text-xs text-gray-400 max-w-[220px] leading-relaxed uppercase tracking-wider">
            Velocidade. Força. Conquiste qualquer terreno.
          </p>
        </div>

        {/* Bottom Right */}
        <div className="text-right">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-300 leading-relaxed">
            A MAIS INTENSA<br />EXPERIÊNCIA
          </p>
        </div>
      </footer>

      {/* ── SIDE ICONS (right side) ── */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {[
          <svg key="globe" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></svg>,
          <svg key="clock" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
          <svg key="gear" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
        ].map((icon, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-200 bg-black/30 backdrop-blur-sm text-gray-400 hover:text-pink-neon"
            style={{ border: '1px solid rgba(82,39,255,0.35)' }}
          >
            {icon}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Home
