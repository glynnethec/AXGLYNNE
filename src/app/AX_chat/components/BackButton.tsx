import Link from 'next/link';

export default function BackButton() {
  return (
    <Link href="/" style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 200, textDecoration: 'none' }}>
      <div style={{
        padding: '10px 20px',
        borderRadius: '999px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#f5f5f7',
        fontSize: '13px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <line x1="19" y1="12" x2="5" y2="12"></line>
           <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Home
      </div>
    </Link>
  );
}
