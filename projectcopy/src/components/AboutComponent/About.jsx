import './About.css';

function About() {
  return (
    <div className="page-section about-page">
      <h2>The People Behind the Counter</h2>
      <p className="subtitle">We're more than a business — we're your neighbors.</p>

      <div className="about-content">
        <div className="about-text">
          <p>
            Back in 2010, <strong>Pawn Star</strong> started as a small family idea: 
            what if there was a place where you could walk in with something you didn't 
            need anymore and walk out knowing you got a fair deal? No pressure, no tricks — 
            just real conversations between real people.
          </p>
          <p>
            Fifteen years later, that idea hasn't changed. Our team still greets every 
            person who walks through the door with a smile. We've helped folks find 
            engagement rings they couldn't afford new, reunited musicians with instruments 
            they thought were gone forever, and given thousands of families a financial 
            lifeline when they needed it most.
          </p>
          <p>
            We're not perfect, but we are honest. And honestly? We just love what we do.
          </p>
        </div>

        <div className="about-team">
          <h3 className="team-heading">Meet a Few of Us</h3>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">JR</div>
              <h4>James R.</h4>
              <p className="team-role">Founder &amp; Head Appraiser</p>
              <p className="team-bio">"I've been collecting since I was 12. Turning that obsession into a business was the best decision I ever made."</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">AP</div>
              <h4>Anita P.</h4>
              <p className="team-role">Jewelry Specialist</p>
              <p className="team-bio">"Every ring, every necklace — there's a love story in there somewhere. I just help figure out what it's worth."</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">DK</div>
              <h4>Derek K.</h4>
              <p className="team-role">Electronics &amp; Vintage</p>
              <p className="team-bio">"Someone brought in a working Atari 2600 last month. Best. Day. Ever."</p>
            </div>
          </div>
        </div>

        <div className="about-values">
          <div className="value-card">
            <span className="value-icon">&#129309;</span>
            <h3>We Keep It Real</h3>
            <p>No hidden fees, no shady appraisals. We'll tell you what something's worth and why — even if it means a smaller sale for us.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">&#128150;</span>
            <h3>People Over Profit</h3>
            <p>We've let customers keep their items when we could tell they weren't ready to sell. Some things are worth more than money.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">&#127793;</span>
            <h3>Rooted Here</h3>
            <p>We sponsor Little League teams, donate to local food banks, and know most of our regulars by name. This is our home too.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;