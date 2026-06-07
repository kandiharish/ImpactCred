import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Shield, Award, Handshake, TrendingUp } from 'lucide-react';

const Team = () => {
  const { user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Dynamic Gold/Yellow Rotating Diamonds Background Overlay */}
      <div className="global-rotating-diamonds-bg">
        <div className="bg-diamond dia-1"></div>
        <div className="bg-diamond dia-2"></div>
        <div className="bg-diamond dia-3"></div>
        <div className="bg-diamond dia-4"></div>
        <div className="bg-diamond dia-5"></div>
        <div className="bg-diamond dia-6"></div>
      </div>

      {/* Background blobs in light container */}
      <div className="landing-glow-blob landing-glow-blob-1"></div>
      <div className="landing-glow-blob landing-glow-blob-2"></div>

      {/* Premium Header/Navbar */}
      <header className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="landing-nav-brand" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img 
            src="/impactcred%20logo.png" 
            alt="Impact Cred Logo" 
            style={{ 
              height: scrolled ? '100px' : '155px', 
              width: 'auto', 
              display: 'block', 
              transform: scrolled ? 'translateY(-4px)' : 'translateY(-15px)',
              transition: 'all 0.3s ease',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))'
            }} 
          />
        </Link>
        <nav className="landing-nav-links">
          <Link to="/" state={{ scrollTo: 'hero' }} className="landing-nav-link">Home</Link>
          <Link to="/" state={{ scrollTo: 'about' }} className="landing-nav-link">About Us</Link>
          <Link to="/" state={{ scrollTo: 'framework' }} className="landing-nav-link">Framework</Link>
          <Link to="/" state={{ scrollTo: 'process' }} className="landing-nav-link">Process</Link>
          <Link to="/" state={{ scrollTo: 'who-can-apply' }} className="landing-nav-link">Eligibility</Link>
          <Link to="/" state={{ scrollTo: 'faqs' }} className="landing-nav-link">FAQs</Link>
          <Link to="/" state={{ scrollTo: 'footer' }} className="landing-nav-link">Contact</Link>
          <Link to="/team" className="landing-nav-link active">Team</Link>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <Link to="/dashboard" className="landing-nav-btn-primary" id="nav-dashboard-btn">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="landing-nav-btn-primary" id="nav-register-btn">Apply Now <ArrowRight size={14} /></Link>
            </>
          )}
        </div>
      </header>

      {/* Main Coming Soon Content */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '160px 6% 80px 6%', boxSizing: 'border-box' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="landing-card-glass"
          style={{
            maxWidth: '640px',
            width: '100%',
            padding: '4rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            border: '1px solid rgba(223, 183, 108, 0.25)',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Decorative Icon */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(223, 183, 108, 0.15) 0%, rgba(79, 70, 229, 0.08) 100%)',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(223, 183, 108, 0.35)',
            boxShadow: '0 10px 25px rgba(223, 183, 108, 0.1)',
            animation: 'heroFloat 6s ease-in-out infinite'
          }}>
            <Users size={40} style={{ color: 'var(--color-gold-text)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span className="landing-section-badge" style={{ margin: '0 auto', display: 'inline-block' }}>OUR TEAM</span>
            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.15,
              background: 'linear-gradient(135deg, #4f46e5 0%, #dfb76c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px'
            }}>
              Coming Soon
            </h1>
          </div>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.65',
            color: 'var(--color-text-muted-dark)',
            margin: 0,
            maxWidth: '480px'
          }}>
            We are assembling a distinguished team of impact validators, NGO certification specialists, and tech visionaries dedicated to building a new standard of global trust.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <Link to="/" className="landing-btn landing-btn-primary" style={{ padding: '0.85rem 2rem', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>

      {/* SECTION 14: FOOTER & CONTACT DETAILS */}
      <footer id="footer" className="landing-footer" style={{ position: 'relative', zIndex: 10 }}>
        <div className="landing-footer-grid">
          <div className="landing-footer-brand">
            <img src="/impactcred%20logo.png" alt="Impact Cred Logo" style={{ height: '54px', width: 'auto', marginBottom: '1.25rem', display: 'block' }} />
            <p style={{ marginBottom: '1.5rem' }}>
              Measuring what matters. Recognizing organizations creating meaningful social impact through transparency, accountability, and verified credibility.
            </p>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>
                <strong>Phone:</strong> <a href="tel:+919063641004" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90636 41004</a>
              </div>
              <div>
                <strong>Email:</strong> <a href="mailto:impactcred.connect@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>impactcred.connect@gmail.com</a>
              </div>
              <div>
                <strong>Address:</strong> Hyderabad, India
              </div>
            </div>
          </div>

          <div className="landing-footer-col">
            <h4>Quick Links</h4>
            <div className="landing-footer-links">
              <Link to="/" state={{ scrollTo: 'hero' }} className="landing-footer-link">Home</Link>
              <Link to="/" state={{ scrollTo: 'about' }} className="landing-footer-link">About Us</Link>
              <Link to="/" state={{ scrollTo: 'framework' }} className="landing-footer-link">Framework</Link>
              <Link to="/" state={{ scrollTo: 'process' }} className="landing-footer-link">Process</Link>
              <Link to="/team" className="landing-footer-link">Team</Link>
            </div>
          </div>

          <div className="landing-footer-col">
            <h4>Certifications</h4>
            <div className="landing-footer-links">
              <Link to="/register" className="landing-footer-link">Apply Now</Link>
              <Link to="/" state={{ scrollTo: 'benefits' }} className="landing-footer-link">Benefits</Link>
              <Link to="/" state={{ scrollTo: 'framework' }} className="landing-footer-link">Evaluation Criteria</Link>
            </div>
          </div>

          <div className="landing-footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for insights on social impact metrics and transparency standards.</p>
            <form className="landing-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="landing-newsletter-input" required />
              <button type="submit" className="landing-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Impact Cred. All rights reserved.</span>
          <div className="landing-footer-bottom-links">
            <a href="/privacy" className="landing-footer-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>
            <a href="/terms" className="landing-footer-link" style={{ fontSize: '0.85rem' }}>Terms of Use</a>
          </div>
        </div>
      </footer>

      {/* BOTTOM HIGHLIGHTS ROW MATCHING MOCKUP */}
      <section className="landing-bottom-highlights" style={{ position: 'relative', zIndex: 10 }}>
        <div className="landing-highlights-grid">
          <div className="landing-highlight-col">
            <div className="landing-highlight-icon"><Shield size={20} /></div>
            <div className="landing-highlight-text-wrap">
              <span className="landing-highlight-title">Independent Verification</span>
              <span className="landing-highlight-desc">No self-declared claims.</span>
            </div>
          </div>
          <div className="landing-highlight-col">
            <div className="landing-highlight-icon"><Award size={20} /></div>
            <div className="landing-highlight-text-wrap">
              <span className="landing-highlight-title">Enhanced Reputation</span>
              <span className="landing-highlight-desc">Build credibility and trust.</span>
            </div>
          </div>
          <div className="landing-highlight-col">
            <div className="landing-highlight-icon"><Handshake size={20} /></div>
            <div className="landing-highlight-text-wrap">
              <span className="landing-highlight-title">Better Partnerships</span>
              <span className="landing-highlight-desc">Stronger collaborations.</span>
            </div>
          </div>
          <div className="landing-highlight-col">
            <div className="landing-highlight-icon"><TrendingUp size={20} /></div>
            <div className="landing-highlight-text-wrap">
              <span className="landing-highlight-title">Long-term Value</span>
              <span className="landing-highlight-desc">Sustainable and scalable impact.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
