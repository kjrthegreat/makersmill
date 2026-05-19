// Apply for a Space points to the form on the Store page.
const APPLY_SPACE_HREF = '/store#apply-form';
// Stage / Performer Inquiry points to the form on the Stage page.
const STAGE_INQUIRY_HREF = '/stage#performer-form';
const CONTACT_HREF = 'mailto:makersmillsomerset@gmail.com';

export function Inquiry() {
  return (
    <section id="inquiry" className="inquiry">
      <div className="inquiry-inner">
        <div className="label rev" style={{ justifyContent: 'center' }}>
          Get Involved
        </div>
        <h2 className="inquiry-h rev" style={{ transitionDelay: '.08s' }}>
          Bring Your Business
          <br />
          <em>to the Mill.</em>
        </h2>
        <p className="inquiry-p rev" style={{ transitionDelay: '.16s' }}>
          Looking for retail space, a studio spot, or a place on the stage? We&apos;re always
          interested in talking with makers, performers, and businesses who&apos;d be at home here.
        </p>
        <div className="inquiry-ctas rev" style={{ transitionDelay: '.24s' }}>
          <a href={APPLY_SPACE_HREF} className="btn btn-fill">
            Apply for a Space
          </a>
          <a href={STAGE_INQUIRY_HREF} className="btn btn-outline">
            Stage / Performer Inquiry
          </a>
          <a href={CONTACT_HREF} className="btn btn-outline">
            Contact Makers Mill
          </a>
        </div>
        <div className="inquiry-tags rev" style={{ transitionDelay: '.32s' }}>
          <span>Businesses &amp; Tenants</span>
          <span>Makers &amp; Sellers</span>
          <span>Performers &amp; Artists</span>
        </div>
      </div>
    </section>
  );
}
