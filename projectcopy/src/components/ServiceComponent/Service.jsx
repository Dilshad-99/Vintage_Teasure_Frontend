import './Service.css';

function Service() {
  const services = [
    {
      icon: '💰',
      title: 'Buy & Sell',
      desc: "Found something you love? Take it home. Got something collecting dust? We'll give it new life — and you a fair price.",
    },
    {
      icon: '🤝',
      title: 'Pawn Loans',
      desc: "Life happens. Need cash fast? Bring in something valuable, we'll hold onto it safely, and you can get it back when you're ready. No credit check, no judgement.",
    },
    {
      icon: '🔍',
      title: 'Free Appraisals',
      desc: "Curious what that old watch or painting is actually worth? Come in, grab a coffee, and let our experts take a look — completely free, no strings attached.",
    },
    {
      icon: '💎',
      title: 'Jewelry Care',
      desc: "We clean, repair, and authenticate rings, necklaces, watches — you name it. Your grandma's brooch deserves the royal treatment.",
    },
    {
      icon: '🔒',
      title: 'Safe Storage',
      desc: "Got something precious but no place to keep it? Our vault is monitored 24/7. Your treasure is safe with us.",
    },
    {
      icon: '📦',
      title: 'Consignment',
      desc: "Don't want to sell outright? We'll display your item, find the right buyer, and only take a small cut. You sit back and relax.",
    },
  ];

  return (
    <div className="page-section service-page">
      <h2>How Can We Help You?</h2>
      <p className="subtitle">We've got a few ways to make your day a little better.</p>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.title}>
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

      <div className="service-cta">
        <p>Not sure which service is right for you? Just walk in or give us a call — we're happy to chat.</p>
      </div>
    </div>
  );
}

export default Service;