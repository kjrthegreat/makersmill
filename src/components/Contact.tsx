import Image from 'next/image';

export function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <Image
          className="contact-acorn rev"
          src="/acorn.png"
          alt=""
          width={64}
          height={64}
        />
        <div className="contact-stamp rev">The Makers Mill</div>
        <h2 className="contact-h rev" style={{ transitionDelay: '.08s' }}>
          Come Out.
          <br />
          <em>
            Perform. Sell.
            <br />
            Belong.
          </em>
        </h2>
        <p className="contact-sub rev" style={{ transitionDelay: '.16s' }}>
          Want to book the stage, sell your work, attend an event, or just find out what&apos;s going
          on? We&apos;d love to hear from you.
        </p>
        <div className="contact-ctas rev" style={{ transitionDelay: '.24s' }}>
          <a href="#visit" className="btn btn-fill">
            Plan Your Visit
          </a>
          <a href="mailto:makersmillsomerset@gmail.com" className="btn btn-outline">
            Book / Contact The Mill
          </a>
        </div>
        <div className="contact-social rev" style={{ transitionDelay: '.32s' }}>
          Follow along →{' '}
          <a href="https://www.instagram.com/somersetmakersmill/" target="_blank" rel="noopener noreferrer">
            @somersetmakersmill
          </a>
          &nbsp;·&nbsp;
          <a href="https://www.facebook.com/somersetmakersmill/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
