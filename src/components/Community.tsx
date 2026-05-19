const TAGS = [
  'Musicians',
  'Artists',
  'Makers',
  'Vintage Hunters',
  'Regulars',
  'First-Timers',
  'Downtown Somerset',
  'Lake Cumberland'
];

export function Community() {
  return (
    <section id="community">
      <div className="comm-inner">
        <div className="label rev" style={{ justifyContent: 'center' }}>
          Somerset, Kentucky
        </div>
        <h2 className="comm-h rev" style={{ transitionDelay: '.08s' }}>
          Built By This Town.
          <br />
          <em>For This Town.</em>
        </h2>
        <div className="comm-rule rev" style={{ transitionDelay: '.16s' }}></div>
        <p className="comm-p rev" style={{ transitionDelay: '.2s' }}>
          The Makers Mill exists because Somerset has always had creative people who needed a place
          to land. Musicians without a stage. Artists without a wall. Makers without a market.
        </p>
        <p className="comm-p rev" style={{ transitionDelay: '.24s' }}>
          Creativity and community thrive here as talent and skill are put on display — giving you
          the opportunity to make one-of-a-kind pieces a part of your life.
        </p>
        <div className="comm-tags rev" style={{ transitionDelay: '.3s' }}>
          {TAGS.map((t) => (
            <div key={t} className="comm-tag">
              {t}
            </div>
          ))}
        </div>
        <a href="#inquiry" className="btn btn-fill rev" style={{ transitionDelay: '.36s' }}>
          Find Your Place Here
        </a>
      </div>
    </section>
  );
}
