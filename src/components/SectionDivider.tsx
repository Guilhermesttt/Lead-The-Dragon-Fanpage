export function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,159,252,0.5), rgba(255,159,252,0.35), rgba(255,159,252,0.5), transparent)',
        }}
      />
      <div
        className="absolute inset-0 animate-pulse opacity-60"
        style={{
          background:
            'linear-gradient(to right, transparent 30%, rgba(255,159,252,0.6) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: 'shine 4s linear infinite',
        }}
      />
    </div>
  )
}
