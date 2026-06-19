export function Visit() {
  return (
    <section id="visit">
      <div className="visit-inner inner">
        <div className="rev-l">
          <div className="label">Find Us</div>
          <h2 className="visit-h">
            Come
            <br />
            <em>Downtown.</em>
          </h2>
          <div className="visit-addr">
            <div className="visit-addr-name">The Makers Mill</div>
            <div className="visit-addr-line">
              402 E. Mt. Vernon St.
              <br />
              Somerset, KY 42501
              <br />
              Downtown Somerset
            </div>
          </div>
          <div className="visit-contact">
            <a href="tel:6066879033"><span className="gly">☎︎</span> (606) 687-9033</a>
            <a href="mailto:makersmillsomerset@gmail.com"><span className="gly">✉︎</span> makersmillsomerset@gmail.com</a>
          </div>
          <div className="hours-title">✦ Hours</div>
          <div className="hours-row">
            <span className="hours-day">Monday</span>
            <span className="hours-time">Closed</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Tuesday</span>
            <span className="hours-time">4:00 PM – 10:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Wednesday</span>
            <span className="hours-time">12:00 PM – 10:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Thursday</span>
            <span className="hours-time">12:00 PM – 10:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Friday</span>
            <span className="hours-time">12:00 PM – 10:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Saturday</span>
            <span className="hours-time">10:00 AM – 10:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Sunday</span>
            <span className="hours-time">2:00 PM – 9:00 PM</span>
          </div>
          <div className="hours-note">
            ✦ Hours may vary for special events. Always confirm directly with The Makers Mill before
            your visit.
          </div>
          <div className="visit-ctas">
            <a
              href="https://maps.google.com/?q=402+E+Mt+Vernon+St+Somerset+KY"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-fill"
            >
              Get Directions
            </a>
            <a href="mailto:makersmillsomerset@gmail.com" className="btn btn-outline">
              Contact The Mill
            </a>
          </div>
        </div>
        <div className="visit-photos rev-r">
          <div className="vphoto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_002-1024x682.jpg"
              alt="Makers Mill exterior / entrance"
            />
          </div>
          <div className="vphoto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_022-1024x682.jpg"
              alt="Makers Mill interior"
            />
          </div>
          <div className="vphoto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://rcmediaservices.net/wp-content/uploads/2024/08/MakersMill_025-1024x683.jpg"
              alt="Makers Mill space"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
