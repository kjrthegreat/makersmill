// TODO: replace '#' with Green River Valley Farm's real ordering / website URL
const ORDER_HREF = '#';

export function RegionFeature() {
  return (
    <section id="region" className="region">
      <div className="region-card rev">
        <div className="region-mark">
          <div className="region-mark-inner">GRVF</div>
        </div>
        <div className="region-body">
          <div className="region-label">From the Region</div>
          <h2 className="region-name">Green River Valley Farm</h2>
          <div className="region-tag">Fresh produce · Order online · Local pickup</div>
          <p className="region-p">
            A regional farm partner of The Makers Mill. Order produce online and pick it up — a
            simple way to bring something good home alongside whatever else you find at the Mill.
          </p>
          <a href={ORDER_HREF} className="btn btn-fill">
            Order Produce
          </a>
        </div>
      </div>
    </section>
  );
}
