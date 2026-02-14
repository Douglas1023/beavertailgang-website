export default function AboutPage() {
  return (
    <div>
      <section style={{
        padding: "70px clamp(16px, 3vw, 48px)",
        maxWidth: 760, margin: "0 auto",
      }}>
        <p className="fade-up" style={{
          fontFamily: "var(--font-body)", fontSize: "0.62rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--fg-muted)", marginBottom: 10,
        }}>Our Story</p>
        <h1 className="fade-up d1" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
          fontWeight: 500, letterSpacing: "0.05em", marginBottom: 44,
        }}>ABOUT BTG</h1>

        <div className="fade-up d2" style={{
          fontFamily: "var(--font-body)", fontSize: "0.9rem",
          lineHeight: 1.85, color: "var(--fg-muted)",
          display: "flex", flexDirection: "column", gap: 24,
        }}>
          <p>
            BeaverTailGang started with one idea: make the best golf hat out there. Not the most hyped. Not the trendiest. Just the one you grab every single round without thinking twice.
          </p>
          <p>
            Based in Austin, Texas, BTG runs on limited drops. When a colorway sells out, it&apos;s done — no restocks, no exceptions. That&apos;s not a gimmick. It&apos;s how we keep things intentional.
          </p>
          <p>
            Our community of 11,000+ golfers isn&apos;t built on algorithms. It&apos;s built on people who play the game, wear the hat, and tag us from courses all over the country. DM us to get featured — that&apos;s always been the move.
          </p>
          <p>
            Every piece we make is designed with purpose. We don&apos;t chase trends. We create what we&apos;d want to wear on the course — and we think you will too.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 36, marginTop: 36, paddingTop: 36,
            borderTop: "1px solid var(--border)",
          }}>
            {[
              { title: "LIMITED DROPS", desc: "Once it's gone, it's gone. Every hat is intentionally scarce." },
              { title: "BUILT FOR THE COURSE", desc: "Premium materials, clean fits, designed to perform." },
              { title: "AUSTIN, TX", desc: "Independent brand, rooted in Texas golf culture." },
              { title: "COMMUNITY FIRST", desc: "11K+ strong. DM us to be featured." },
            ].map((v, i) => (
              <div key={i}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "0.92rem",
                  fontWeight: 600, letterSpacing: "0.08em",
                  marginBottom: 8, color: "var(--fg)",
                }}>{v.title}</h3>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
