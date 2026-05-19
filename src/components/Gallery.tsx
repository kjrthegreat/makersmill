const PHOTOS = [
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_003-1024x683.jpg', alt: 'Makers Mill interior', delay: '0s' },
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_005-1024x682.jpg', alt: 'Makers Mill goods', delay: '.06s' },
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_008-1024x682.jpg', alt: 'Makers Mill artisan items', delay: '.12s' },
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_011-1024x682.jpg', alt: 'Makers Mill display', delay: '.06s' },
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_014-1024x682.jpg', alt: 'Makers Mill market', delay: '.09s' },
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_017-1024x682.jpg', alt: 'Makers Mill space', delay: '.15s' },
  { src: 'https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_020-1024x682.jpg', alt: 'Makers Mill venue', delay: '.18s' }
];

export function Gallery() {
  return (
    <section id="gallery">
      <div className="gallery-inner">
        <div className="gallery-head rev">
          <div className="label">The Atmosphere</div>
          <h2 className="gallery-h">Feel the Place.</h2>
          <p className="gallery-sub">A look inside The Makers Mill — Somerset&apos;s creative gathering spot.</p>
        </div>
        <div className="gallery-grid">
          {PHOTOS.map((p) => (
            <div key={p.src} className="gitem rev" style={p.delay !== '0s' ? { transitionDelay: p.delay } : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
