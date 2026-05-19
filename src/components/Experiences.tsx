// Order intentionally puts Stage / Food / Store / Pool / Arcade / Open Mic / Vintage Finds
// ahead of Trivia — Trivia is kept but de-emphasized per client direction.
const EXPERIENCES = [
  { n: '01', icon: '🎸', title: 'Live Music', desc: 'Local and regional acts every Saturday at 7PM. The stage is always alive.' },
  { n: '02', icon: '🥃', title: 'Food & Drink', desc: 'Craft brews, cocktails, and gourmet sandwiches made fresh in the back. Worth staying for.' },
  { n: '03', icon: '🎨', title: 'Local Makers', desc: "Handmade pottery, jewelry, paintings, sculptures, and goods from Somerset's makers." },
  { n: '04', icon: '🎱', title: 'Pool', desc: "Rack 'em up. A proper pool hall ready for a casual game or a serious hustle." },
  { n: '05', icon: '🕹️', title: 'Arcade', desc: "Pinball machines and classic games. We know there's a pinball wizard out there somewhere." },
  { n: '06', icon: '🎤', title: 'Open Mic', desc: 'Singers, poets, comedians — the mic is open. Sign up at the door and take your moment.' },
  { n: '07', icon: '🪺', title: 'Vintage Finds', desc: 'Curated vintage clothing, furniture, windows, and one-of-a-kind pieces. New stuff every visit.' },
  { n: '08', icon: '🧠', title: 'Trivia Nights', desc: 'Every Thursday 7–9PM hosted by Kyle Kadel. Free entry. Teams of any size welcome.' }
];

const DELAYS = ['0s', '.07s', '.14s', '.21s', '.07s', '.14s', '.21s', '.28s'];

export function Experiences() {
  return (
    <section id="experiences">
      <div className="exp-inner">
        <div className="exp-head rev">
          <div className="label">What&apos;s Inside</div>
          <h2 className="exp-h">
            Eight Reasons
            <br />
            to Come Back.
          </h2>
          <p className="exp-sub">You&apos;ll find something new every time you walk through the door.</p>
        </div>
        <div className="exp-grid">
          {EXPERIENCES.map((e, i) => (
            <div key={e.n} className="exp-card rev" style={{ transitionDelay: DELAYS[i] }}>
              <div className="exp-n">{e.n}</div>
              <div className="exp-icon">{e.icon}</div>
              <div className="exp-title">{e.title}</div>
              <div className="exp-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
