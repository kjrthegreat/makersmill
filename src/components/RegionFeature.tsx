// TODO: replace '#' with Green River Valley Farm's real ordering / website URL
const ORDER_HREF = '#';

export function RegionFeature() {
  return (
    <section id="region" className="region">
      <div className="region-inner">
        <div className="region-head">
          <div className="label rev" style={{ justifyContent: 'center' }}>
            From the Region
          </div>
          <h2 className="region-h rev" style={{ transitionDelay: '.08s' }}>
            More Stores.
            <br />
            <em>More Soon.</em>
          </h2>
          <p className="region-sub rev" style={{ transitionDelay: '.16s' }}>
            Partner shops and producers around Somerset that connect to the Mill. We&apos;re adding
            more as relationships form — this is just the start.
          </p>
        </div>
        <div className="region-list">
          <div className="region-card rev" style={{ transitionDelay: '.24s' }}>
            <div className="region-mark">
              <div className="region-mark-inner">GRVF</div>
            </div>
            <div className="region-body">
              <div className="region-label">Farm Partner</div>
              <h3 className="region-name">Green River Valley Farm</h3>
              <div className="region-tag">Fresh produce · Order online · Local pickup</div>
              <p className="region-p">
                A regional farm partner of The Makers Mill. Order produce online and pick it up —
                a simple way to bring something good home alongside whatever else you find at the
                Mill.
              </p>
              <a href={ORDER_HREF} className="btn btn-fill">
                Order Produce
              </a>
            </div>
          </div>
          <div className="region-card region-card-soon rev" style={{ transitionDelay: '.32s' }}>
            <div className="region-mark">
              <div className="region-mark-inner">+</div>
            </div>
            <div className="region-body">
              <div className="region-label">Coming Soon</div>
              <h3 className="region-name">More Partners on the Way</h3>
              <div className="region-tag">New listings as relationships form</div>
              <p className="region-p">
                We&apos;re lining up more regional shops, producers, and makers to feature here.
                If you run something that should be on this list, get in touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
