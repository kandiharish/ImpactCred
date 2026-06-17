import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Eye,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  Globe,
  Database,
  Lightbulb,
  Scale,
  Handshake,
  BarChart3,
  Leaf,
  FileEdit,
  UserCheck,
  MessagesSquare,
  ChevronDown,
  Target,
  FileText,
  Mail,
  Phone,
  Bookmark,
  Check
} from 'lucide-react';

import CertificateMockup from '../components/CertificateMockup';
import FaqAccordion from '../components/FaqAccordion';
import BrandTicker from '../components/BrandTicker';
import TimelineProcess from '../components/TimelineProcess';

// Smooth animated counter using IntersectionObserver to start counting up when scrolled into view
const AnimatedCounter = ({ target, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const end = parseInt(target.replace(/,/g, ''), 10);
    if (isNaN(end)) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quadratic ease-out to slow down numbers at the end
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span ref={elementRef} style={{ display: 'inline-block' }}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

const testimonialsList = [
  {
    text: "Impact Cred certification has strengthened our credibility and opened doors to new partnerships.",
    name: "Anita Sharma",
    role: "CEO, GreenFuture Foundation"
  },
  {
    text: "The evaluation process is rigorous, fair and truly reflects our impact on communities.",
    name: "Rohit Varma",
    role: "Director, Sewa Initiative"
  },
  {
    text: "A globally benchmarked certification that every impact-driven organization should aim for.",
    name: "Dr. Meera Nair",
    role: "Founder, Healthbridge Trust"
  },
  {
    text: "The stakeholder feedback analysis helped us refine our community engagement model and secure CSR funding.",
    name: "Rajesh Iyer",
    role: "Managing Director, Kaveri Water Project"
  },
  {
    text: "Impact Cred's verification rubric is extremely comprehensive. It has made our CSR audits transparent and efficient.",
    name: "Priya Patel",
    role: "Head of CSR, Zenith Technologies"
  },
  {
    text: "Earning the credibility seal has significantly boosted donor confidence and helped us scale our learning centers.",
    name: "Vikram Malhotra",
    role: "Executive Director, Shanti Education Trust"
  }
];

const LandingPage = () => {

  const { user } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      navigate('/', { replace: true, state: {} });
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [location, navigate]);

  const whyPoints = [
    {
      title: "Independent Verification",
      desc: "Unbiased third-party audits that prevent self-declared bias.",
      icon: <Shield size={24} />
    },
    {
      title: "Global Recognition",
      desc: "Standardized rating parameters aligned with global ESG frameworks.",
      icon: <Globe size={24} />
    },
    {
      title: "Stronger Partnerships",
      desc: "Verified dashboards that accelerate funding and partner trust.",
      icon: <Users size={24} />
    },
    {
      title: "Continuous Improvement",
      desc: "Stakeholder survey feedback to optimize ground-level impact.",
      icon: <TrendingUp size={24} />
    }
  ];

  // Monitor scroll positioning to update active navigation tabs & navbar styling
  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar frosted glass background
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = [
        'hero', 
        'about', 
        'mission', 
        'vision', 
        'framework', 
        'process', 
        'eligibility', 
        'who-can-apply', 
        'statistics', 
        'why-choose-us', 
        'benefits', 
        'testimonials', 
        'faqs'
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Standard scroll animation fade triggers
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const frameworkCardVariant = (delay) => ({
    initial: { opacity: 0, y: 40, scale: 0.96, rotate: -1.5 },
    whileInView: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
  });

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: '-80px' }
  };

  const frameworksList = [
    {
      title: 'Transparency',
      desc: 'Open and accountable operations at every level.',
      icon: <Eye size={24} />
    },
    {
      title: 'Credibility',
      desc: 'Evaluation systems built on concrete evidence and validation.',
      icon: <Award size={24} />
    },
    {
      title: 'Ethical Practices',
      desc: 'Upholding strict organizational integrity and fairness.',
      icon: <Scale size={24} />
    },
    {
      title: 'Collaboration',
      desc: 'Nurturing deep, honest stakeholder partnerships.',
      icon: <Handshake size={24} />
    },
    {
      title: 'Impact Contribution',
      desc: 'Evaluating real, quantifiable social improvements.',
      icon: <BarChart3 size={24} />
    },
    {
      title: 'Sustainability',
      desc: 'Fostering long-term growth and environmental balance.',
      icon: <Leaf size={24} />
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Application',
      desc: 'Organization submits registered profiles and credentials.',
      icon: <FileEdit size={22} />
    },
    {
      step: '2',
      title: 'Stakeholder Verification',
      desc: 'We map and confirm key beneficiary groups.',
      icon: <UserCheck size={22} />
    },
    {
      step: '3',
      title: 'Survey Assessment',
      desc: 'Dynamic surveys gather anonymous field feedback.',
      icon: <MessagesSquare size={22} />
    },
    {
      step: '4',
      title: 'Independent Evaluation',
      desc: 'Scores compile through strict rubric checks.',
      icon: <Scale size={22} />
    },
    {
      step: '5',
      title: 'Certification',
      desc: 'Organizations earn verified seals and dashboard features.',
      icon: <Award size={22} />
    }
  ];

  const applySectors = [
    {
      title: 'NGOs & Nonprofits',
      desc: 'Education, health, rural, child welfare, and local support teams.',
      icon: '🤝',
      img: '/ngos.jpg'
    },
    {
      title: 'CSR & Corporates',
      desc: 'Businesses executing sustainable social initiatives.',
      icon: '🏢',
      img: '/csr.webp'
    },
    {
      title: 'Social Enterprises',
      desc: 'Ventures solving complex community and environmental challenges.',
      icon: '💡',
      img: '/social%20enterprice.webp'
    },
    {
      title: 'Foundations & Trusts',
      desc: 'Philanthropic groups allocating capital for public development.',
      icon: '💎',
      img: '/trust.png'
    },
    {
      title: 'Educational Institutions',
      desc: 'Schools and platforms training future changemakers.',
      icon: '🏫',
      img: '/educations.png'
    },
    {
      title: 'Healthcare Organizations',
      desc: 'Medical clinics, wellness units, and public health setups.',
      icon: '🌱',
      img: '/hospital.webp'
    }
  ];

  const partnerLogos = [
    { name: 'unicef', style: { color: '#1d4ed8', fontStyle: 'italic', fontWeight: '800' } },
    { name: 'TATA', style: { letterSpacing: '2px', fontWeight: '800', color: '#0f172a' } },
    { name: 'Tech Mahindra', style: { color: '#e11d48', fontWeight: '700' } },
    { name: 'adani Foundation', style: { color: '#15803d', fontWeight: '800' } },
    { name: 'Microsoft', style: { color: '#4b5563', fontWeight: '600' } },
    { name: 'Infosys Foundation', style: { color: '#0369a1', fontWeight: '700' } },
    { name: 'Reliance Foundation', style: { color: '#b45309', fontWeight: '800' } }
  ];

  return (
    <div className="landing-container">
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
        <button onClick={() => scrollToSection('hero')} className="landing-nav-brand" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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
        </button>
        <nav className="landing-nav-links">
          <button onClick={() => scrollToSection('hero')} className={`landing-nav-link ${activeSection === 'hero' ? 'active' : ''}`}>Home</button>
          <button onClick={() => scrollToSection('about')} className={`landing-nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Us</button>
          <button onClick={() => scrollToSection('framework')} className={`landing-nav-link ${activeSection === 'framework' ? 'active' : ''}`}>Framework</button>
          <button onClick={() => scrollToSection('process')} className={`landing-nav-link ${activeSection === 'process' ? 'active' : ''}`}>Process</button>
          <button onClick={() => scrollToSection('who-can-apply')} className={`landing-nav-link ${activeSection === 'who-can-apply' ? 'active' : ''}`}>Eligibility</button>
          {/* <button onClick={() => scrollToSection('statistics')} className={`landing-nav-link ${activeSection === 'statistics' ? 'active' : ''}`}>Resources</button> */}
          <button onClick={() => scrollToSection('faqs')} className={`landing-nav-link ${activeSection === 'faqs' ? 'active' : ''}`}>FAQs</button>
          <button onClick={() => scrollToSection('footer')} className={`landing-nav-link`}>Contact</button>
          <Link to="/team" className="landing-nav-link">Team</Link>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <Link to="/dashboard" className="landing-nav-btn-primary" id="nav-dashboard-btn">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScmEsmx0pcwmBGqsbJZyKVW_KciQWZQMwYe5KuziYmDfGi7Mg/viewform" target="_blank" rel="noopener noreferrer" className="landing-nav-btn-primary" id="nav-register-btn">Apply Now <ArrowRight size={14} /></a>
            </>
          )}
        </div>
      </header>

      <main>
        {/* SECTION 1: HERO SECTION */}
        <section id="hero" className="landing-hero">
          <div className="landing-hero-backdrop"></div>
          {/* Floating Professional Squares */}
          <div className="hero-square-container">
            <div className="hero-square sq-1"></div>
            <div className="hero-square sq-2"></div>
            <div className="hero-square sq-3"></div>
            <div className="hero-square sq-4"></div>
            <div className="hero-square sq-5"></div>
            <div className="hero-square sq-6"></div>
            <div className="hero-square sq-7"></div>
          </div>

          <div className="landing-hero-container">
            <div className="landing-hero-content">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="landing-hero-badge"
              >
                INDEPENDENT VALIDATION. TRUSTED IMPACT.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="landing-hero-title"
              >
                Building Trust Through <br />
                <span className="gold-text">Verified</span> Social Impact
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="landing-hero-subtitle"
              >
                Impact Cred is a global certification platform that independently evaluates organizations and recognizes their commitment to creating meaningful change.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="landing-hero-ctas"
              >
                {user ? (
                  <Link to="/dashboard" className="landing-btn landing-btn-primary" id="hero-dashboard-cta">
                    Enter Dashboard <ArrowRight size={16} />
                  </Link>
                ) : (
                  <>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScmEsmx0pcwmBGqsbJZyKVW_KciQWZQMwYe5KuziYmDfGi7Mg/viewform" target="_blank" rel="noopener noreferrer" className="landing-btn landing-btn-primary" id="hero-register-cta">
                      Apply for Certification <ArrowRight size={16} />
                    </a>
                    <button onClick={() => scrollToSection('framework')} className="landing-btn landing-btn-secondary" id="hero-framework-cta">
                      Explore Framework
                    </button>
                  </>
                )}
              </motion.div>

              {/* Inline Stats Row inside Left Column */}
              <div className="landing-hero-stats">
                <div className="landing-hero-stat-item">
                  <div className="landing-hero-stat-icon-wrap">
                    <Award size={20} />
                  </div>
                  <div className="landing-hero-stat-info">
                    <div className="landing-hero-stat-num" style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                      Smart Seals
                    </div>
                    <div className="landing-hero-stat-label">Cryptographic Trust</div>
                  </div>
                </div>

                <div className="landing-hero-stat-divider"></div>

                <div className="landing-hero-stat-item">
                  <div className="landing-hero-stat-icon-wrap">
                    <Users size={20} />
                  </div>
                  <div className="landing-hero-stat-info">
                    <div className="landing-hero-stat-num" style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                      Direct Feedback
                    </div>
                    <div className="landing-hero-stat-label">Anonymous Surveys</div>
                  </div>
                </div>

                <div className="landing-hero-stat-divider"></div>

                <div className="landing-hero-stat-item">
                  <div className="landing-hero-stat-icon-wrap">
                    <Shield size={20} />
                  </div>
                  <div className="landing-hero-stat-info">
                    <div className="landing-hero-stat-num" style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                      Unbiased Audits
                    </div>
                    <div className="landing-hero-stat-label">Independent Review</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Glowing Globe Graphic with Nodes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="landing-hero-graphic"
              style={{ position: 'relative' }}
            >
              {/* Shining backside effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(223, 183, 108, 0.24) 0%, rgba(255, 255, 255, 0) 70%)',
                filter: 'blur(35px)',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img 
                src="/first%20page%20right%20side%20image.png" 
                className="landing-hero-image" 
                alt="Impact Cred Globe and Certified Shield" 
                style={{ 
                  width: '100%', 
                  maxWidth: '100%', 
                  height: 'auto', 
                  maxHeight: '95vh', 
                  objectFit: 'contain', 
                  display: 'block', 
                  position: 'relative', 
                  zIndex: 2, 
                  transform: 'scale(1.08)',
                  transformOrigin: 'right center',
                  animation: 'heroFloat 6s ease-in-out infinite' 
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: TRUSTED BY ORGANIZATIONS REMOVED */}


        {/* SECTION 3: ABOUT IMPACT CRED */}
        <section id="about" className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* GenZ Abstract Shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(223, 183, 108, 0.15)',
              top: '-60px',
              right: '5%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              left: '4%',
              bottom: '15%',
              fontSize: '2rem',
              fontWeight: '300',
              color: 'rgba(99, 102, 241, 0.15)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            +
          </motion.div>
          <div className="landing-editorial-layout">
            <motion.div {...fadeInUp} className="landing-editorial-content">
              <span className="landing-section-badge" style={{ textAlign: 'left' }}>About Impact Cred</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.25', margin: '0' }} className="gradient-text">
                We are building a world where trust is earned, impact is measured, and change is recognized.
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 140 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="shining-underline"
                style={{ marginBottom: '2rem' }}
              />
              <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--color-text-muted-dark)', marginBottom: '2rem' }}>
                Impact Cred provides an independent and transparent certification based on rigorous evaluation, stakeholder feedback, and measurable impact frameworks.
              </p>
              <button onClick={() => scrollToSection('framework')} className="landing-btn landing-btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                Learn More <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div {...fadeInUp} className="about-graphic-col">
              <div className="about-mockup-container">
                <div className="about-mockup-glow"></div>
                
                {/* Panel 1: Base Dashboard Card */}
                <div className="about-mockup-card base-panel">
                  <div className="mockup-header">
                    <span className="mockup-dot red"></span>
                    <span className="mockup-dot yellow"></span>
                    <span className="mockup-dot green"></span>
                    <div className="mockup-header-title">organization_audit_report.xml</div>
                  </div>
                  <div className="mockup-body">
                    <div className="mockup-metrics-row">
                      <div className="mockup-metric-bar" style={{ height: '40%' }}></div>
                      <div className="mockup-metric-bar" style={{ height: '70%' }}></div>
                      <div className="mockup-metric-bar" style={{ height: '55%' }}></div>
                      <div className="mockup-metric-bar" style={{ height: '90%' }}></div>
                      <div className="mockup-metric-bar" style={{ height: '75%' }}></div>
                    </div>
                    <div className="mockup-text-skeleton">
                      <div className="skeleton-line" style={{ width: '80%' }}></div>
                      <div className="skeleton-line" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Floating Trust Rating Card (Top Right) */}
                <div className="about-mockup-card float-panel-top">
                  <div className="float-panel-inner">
                    <div className="float-panel-icon-wrap">
                      <Award size={22} />
                    </div>
                    <div className="float-panel-details">
                      <span className="float-panel-num">98%</span>
                      <span className="float-panel-label">Credibility Score</span>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Floating Status Card (Bottom Left) */}
                <div className="about-mockup-card float-panel-bottom">
                  <div className="float-panel-inner">
                    <div className="float-panel-indicator green"></div>
                    <div className="float-panel-details">
                      <span className="float-panel-num">Rubric Certified</span>
                      <span className="float-panel-label">Verified Smart Contract</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: OUR MISSION */}
        <section id="mission" className="mission-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* GenZ Abstract Shapes */}
          <motion.div 
            animate={{ scale: [1, 1.12, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              border: '2px solid rgba(99, 102, 241, 0.15)',
              left: '8%',
              top: '20%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <motion.div 
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(223, 183, 108, 0.1) 0%, rgba(255,255,255,0) 70%)',
              right: '10%',
              bottom: '5%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <div className="mission-vision-layout">
            <motion.div {...fadeInUp} className="mission-vision-text-col">
              <span className="landing-section-badge" style={{ textAlign: 'left' }}>OUR MISSION</span>
              <h2 className="gradient-text mission-vision-title">Empowering Credibility, Inspiring Global Change</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 160 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="shining-underline"
              />
              <p>
                To build a world where trust is earned, not claimed. We independently evaluate and certify organizations to cultivate transparency, accountability, and verified impact.
              </p>
              <div className="mission-vision-points-list">
                <div className="mission-vision-point-item">
                  <div className="mission-vision-point-icon">
                    <Check size={16} />
                  </div>
                  <div className="mission-vision-point-text-wrap">
                    <span className="mission-vision-point-title">Independent Validation</span>
                    <span className="mission-vision-point-desc">Rigorous rubric evaluations prevent biased self-declarations.</span>
                  </div>
                </div>
                <div className="mission-vision-point-item">
                  <div className="mission-vision-point-icon">
                    <Check size={16} />
                  </div>
                  <div className="mission-vision-point-text-wrap">
                    <span className="mission-vision-point-title">Quantifiable Outcomes</span>
                    <span className="mission-vision-point-desc">We replace subjective claims with verified credibility ratings.</span>
                  </div>
                </div>
                <div className="mission-vision-point-item">
                  <div className="mission-vision-point-icon">
                    <Check size={16} />
                  </div>
                  <div className="mission-vision-point-text-wrap">
                    <span className="mission-vision-point-title">Stakeholder Trust</span>
                    <span className="mission-vision-point-desc">Direct beneficiary feedback loops authenticate real-world impact.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="mission-vision-graphic-wrap">
              <div className="mission-vision-graphic-glow"></div>
              <div className="mission-vision-graphic-card">
                <svg width="200" height="200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(223, 183, 108, 0.3)" />
                      <stop offset="100%" stopColor="rgba(223, 183, 108, 0)" />
                    </radialGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" fill="url(#targetGlow)" />
                  <circle cx="60" cy="60" r="44" stroke="var(--color-gold)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" style={{ transformOrigin: 'center', animation: 'spinOuter 20s linear infinite' }} />
                  <circle cx="60" cy="60" r="36" stroke="#0f172a" strokeWidth="2" strokeDasharray="16 8" opacity="0.65" style={{ transformOrigin: 'center', animation: 'spinInner 15s linear infinite reverse' }} />
                  <circle cx="60" cy="60" r="28" stroke="var(--color-gold)" strokeWidth="1" opacity="0.3" />
                  <circle cx="60" cy="60" r="20" stroke="#0f172a" strokeWidth="2.5" />
                  <circle cx="60" cy="60" r="10" stroke="var(--color-gold)" strokeWidth="3" fill="rgba(223, 183, 108, 0.1)" />
                  <circle cx="60" cy="60" r="4" fill="var(--color-gold)" />
                  <path d="M 60 10 L 60 25 M 60 95 L 60 110 M 10 60 L 25 60 M 95 60 L 110 60" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <g style={{ transform: 'translate(4px, -4px)', animation: 'pulseArrow 4s ease-in-out infinite' }}>
                    <path d="M 92 28 L 68 52" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 68 52 L 68 42 M 68 52 L 78 52" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 87 25 L 95 25 L 95 33 Z" fill="var(--color-gold)" />
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: OUR VISION */}
        <section id="vision" className="vision-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* GenZ Abstract Shapes */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(99, 102, 241, 0.12)',
              bottom: '-40px',
              left: '6%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], rotate: [45, 135, 45] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              right: '12%',
              top: '15%',
              width: '24px',
              height: '24px',
              border: '2px solid rgba(223, 183, 108, 0.22)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <div className="mission-vision-layout swapped">
            <motion.div {...fadeInUp} className="mission-vision-graphic-wrap">
              <div className="mission-vision-graphic-glow"></div>
              <div className="mission-vision-graphic-card">
                <svg width="200" height="200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(223, 183, 108, 0.3)" />
                      <stop offset="100%" stopColor="rgba(223, 183, 108, 0)" />
                    </radialGradient>
                    <linearGradient id="eyeIris" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-gold)" />
                      <stop offset="100%" stopColor="#b88d3c" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" fill="url(#eyeGlow)" />
                  <circle cx="60" cy="60" r="46" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="20 40" opacity="0.3" style={{ transformOrigin: 'center', animation: 'spinOuter 30s linear infinite' }} />
                  <circle cx="60" cy="60" r="40" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="30 15" opacity="0.4" style={{ transformOrigin: 'center', animation: 'spinInner 25s linear infinite reverse' }} />
                  <path d="M 15 60 C 35 30, 85 30, 105 60 C 85 90, 35 90, 15 60 Z" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="60" cy="60" r="16" stroke="var(--color-gold)" strokeWidth="2" fill="rgba(223, 183, 108, 0.1)" />
                  <circle cx="60" cy="60" r="8" fill="url(#eyeIris)" />
                  <circle cx="60" cy="60" r="3" fill="#ffffff" opacity="0.8" />
                  <path d="M 35 48 C 45 42 75 42 85 48" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" style={{ transformOrigin: 'center', animation: 'scanBeam 3s ease-in-out infinite alternate' }} />
                </svg>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="mission-vision-text-col">
              <span className="landing-section-badge" style={{ textAlign: 'left' }}>OUR VISION</span>
              <h2 className="gradient-text mission-vision-title">The Standard of Trust for a Better Future</h2>

              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 160 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="shining-underline"
              />
              <p>
                To serve as the global benchmark for organizational credibility, bridging the trust gap between impactful social ventures and verification-seeking partners.
              </p>
              <div className="mission-vision-points-list">
                <div className="mission-vision-point-item">
                  <div className="mission-vision-point-icon">
                    <Check size={16} />
                  </div>
                  <div className="mission-vision-point-text-wrap">
                    <span className="mission-vision-point-title">Global Standard</span>
                    <span className="mission-vision-point-desc">Harmonized with global ESG and sustainability reporting parameters.</span>
                  </div>
                </div>
                <div className="mission-vision-point-item">
                  <div className="mission-vision-point-icon">
                    <Check size={16} />
                  </div>
                  <div className="mission-vision-point-text-wrap">
                    <span className="mission-vision-point-title">Universal Compatibility</span>
                    <span className="mission-vision-point-desc">A unified rubric suitable for NGOs, CSR wings, and social enterprises.</span>
                  </div>
                </div>
                <div className="mission-vision-point-item">
                  <div className="mission-vision-point-icon">
                    <Check size={16} />
                  </div>
                  <div className="mission-vision-point-text-wrap">
                    <span className="mission-vision-point-title">Ecosystem Integration</span>
                    <span className="mission-vision-point-desc">Connecting verified actors to accelerate impact funding and support.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: OUR EVALUATION FRAMEWORK */}
        <section id="framework" className="framework-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* GenZ Abstract Shapes */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              right: '5%',
              top: '10%',
              fontSize: '2.5rem',
              fontWeight: '300',
              color: 'rgba(223, 183, 108, 0.15)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            ✦
          </motion.div>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              position: 'absolute',
              left: '4%',
              bottom: '12%',
              fontSize: '2rem',
              fontWeight: '300',
              color: 'rgba(99, 102, 241, 0.15)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            ✦
          </motion.div>
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="landing-section-badge">EVALUATION FRAMEWORK</span>
            <h2 className="landing-section-title gradient-text">Our Evaluation Framework</h2>
          </div>

          <div className="framework-flow-container">
            {/* Dynamic Crawling Connector Line SVG for Desktop */}
            <div className="framework-connector-svg-wrap">
              <svg width="100%" height="2" viewBox="0 0 1000 2" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="1" x2="1000" y2="1" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="10 8" className="flowing-dashed-line" />
              </svg>
            </div>

            {/* Card 1: Transparency */}
            <motion.div 
              {...frameworkCardVariant(0.05)}
              className="framework-flow-card"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="framework-flow-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6L8 12V24C8 34 16 40 24 42C32 40 40 34 40 24V12L24 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                  <polygon points="24,16 27,22 34,23 29,28 30,35 24,31 18,35 19,28 14,23 21,22" fill="var(--color-gold)" stroke="var(--color-gold)" strokeWidth="1" />
                </svg>
              </div>
              <h3 className="framework-flow-title">Transparency</h3>
              <div className="framework-flow-divider"></div>
              <p className="framework-flow-desc">Open and accountable operations at every level.</p>
            </motion.div>

            {/* Card 2: Credibility */}
            <motion.div 
              {...frameworkCardVariant(0.15)}
              className="framework-flow-card"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="framework-flow-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="16" r="8" stroke="currentColor" strokeWidth="3" />
                  <path d="M8 36C8 28 16 28 20 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="34" cy="32" r="7" stroke="var(--color-gold)" strokeWidth="2.5" />
                  <path d="M39 37L43 41" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="framework-flow-title">Credibility</h3>
              <div className="framework-flow-divider"></div>
              <p className="framework-flow-desc">Evidence-based and reliable practices.</p>
            </motion.div>

            {/* Card 3: Ethical Practices */}
            <motion.div 
              {...frameworkCardVariant(0.25)}
              className="framework-flow-card"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="framework-flow-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 8V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M12 40H36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M10 16H38" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M16 16L12 28H20L16 16Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M32 16L28 28H36L32 16Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="framework-flow-title">Ethical Practices</h3>
              <div className="framework-flow-divider"></div>
              <p className="framework-flow-desc">Integrity, fairness and responsibility.</p>
            </motion.div>

            {/* Card 4: Collaboration */}
            <motion.div 
              {...frameworkCardVariant(0.35)}
              className="framework-flow-card"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="framework-flow-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24C12 24 16 20 20 24L16 28L12 24Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M16 20L28 32M32 16L20 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M18 16C15 16 12 18 10 20L6 24C4 26 4 30 6 32L10 36" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M30 32C33 32 36 30 38 28L42 24C44 22 44 18 42 16L38 12" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="framework-flow-title">Collaboration</h3>
              <div className="framework-flow-divider"></div>
              <p className="framework-flow-desc">Strong partnerships for greater impact.</p>
            </motion.div>

            {/* Card 5: Impact Contribution */}
            <motion.div 
              {...frameworkCardVariant(0.45)}
              className="framework-flow-card"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="framework-flow-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="28" width="6" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="18" y="20" width="6" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="28" y="12" width="6" height="28" fill="var(--color-gold)" stroke="var(--color-gold)" strokeWidth="1" opacity="0.8" />
                  <path d="M8 32L18 22L28 14L38 6" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M30 6H38V14" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="framework-flow-title">Impact Contribution</h3>
              <div className="framework-flow-divider"></div>
              <p className="framework-flow-desc">Real and measurable social impact.</p>
            </motion.div>

            {/* Card 6: Sustainability */}
            <motion.div 
              {...frameworkCardVariant(0.55)}
              className="framework-flow-card"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="framework-flow-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 40C24 40 24 24 38 12M24 30C24 30 16 26 14 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M24 16C28 12 36 8 40 8C40 12 36 20 32 24" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 28C10 24 8 16 8 12C12 12 20 14 24 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 40V44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="framework-flow-title">Sustainability</h3>
              <div className="framework-flow-divider"></div>
              <p className="framework-flow-desc">Long-term positive change.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: CERTIFICATION PROCESS */}
        <section id="process" className="landing-section" style={{ background: 'var(--color-bg-dark)' }}>
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="landing-section-badge">CERTIFICATION PROCESS</span>
            <h2 className="landing-section-title gradient-text">A Simple Yet Rigorous Process</h2>
          </div>

          <TimelineProcess />
        </section>


        {/* SECTION 7: WHO CAN APPLY */}
        <section id="who-can-apply" className="landing-section">
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="landing-section-badge">WHO CAN APPLY</span>
            <h2 className="landing-section-title">Open to All Impact-Driven Organizations</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="landing-apply-grid"
          >
            {applySectors.map((sec, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="landing-apply-card">
                <div className="landing-apply-content">
                  <div className="landing-apply-header">
                    <span className="landing-apply-icon">{sec.icon}</span>
                    <h3 className="landing-apply-title">{sec.title}</h3>
                  </div>
                  <p className="landing-apply-desc">{sec.desc}</p>
                </div>
                <div 
                  className="landing-apply-image" 
                  style={{ 
                    backgroundImage: `url("${sec.img}")`,
                    backgroundSize: sec.title === 'Social Enterprises' ? '135%' : 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 8: IMPACT STATISTICS */}
        {false && (
        <section id="statistics" className="landing-section" style={{ background: 'var(--color-bg-dark)' }}>
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="landing-section-badge">IMPACT STATISTICS</span>
            <h2 className="landing-section-title gradient-text">Driving Real Change Worldwide</h2>
          </div>

          <div className="landing-editorial-layout">
            {/* Left side: Vertical statistics */}
            <motion.div {...fadeInUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '2rem', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className="landing-stat-number-animated">
                  <AnimatedCounter target="42" suffix="+" />
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>Countries Impacted</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                <span className="landing-stat-number-animated">
                  <AnimatedCounter target="1250" suffix="+" />
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>Organizations Certified</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                <span className="landing-stat-number-animated">
                  <AnimatedCounter target="8500" suffix="+" />
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>Stakeholders Engaged</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                <span className="landing-stat-number-animated">
                  <AnimatedCounter target="98" suffix="%" />
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>Average Trust Score</span>
              </div>
            </motion.div>

            {/* Right side: Map Image with Yellow overlay lines */}
            <motion.div {...fadeInUp} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
                <img 
                  src="/ChatGPT%20Image%20Jun%202,%202026,%2007_01_13%20PM.png" 
                  alt="Worldwide Impact Map" 
                  style={{ width: '100%', borderRadius: '16px', display: 'block', boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }} 
                />
                <svg 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    pointerEvents: 'none' 
                  }}
                  viewBox="0 0 1000 500"
                >
                  {/* Multiple branching curved paths animating simultaneously on view */}
                  <motion.path 
                    d="M 180 180 Q 350 150 520 220" 
                    stroke="#dfb76c" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                  />
                  <motion.path 
                    d="M 180 180 Q 215 250 250 320" 
                    stroke="#dfb76c" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
                  />
                  <motion.path 
                    d="M 520 220 Q 680 180 820 160" 
                    stroke="#dfb76c" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
                  />
                  <motion.path 
                    d="M 520 220 Q 600 320 830 360" 
                    stroke="#dfb76c" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 0.9 }}
                  />
                  <motion.path 
                    d="M 250 320 Q 540 340 830 360" 
                    stroke="#dfb76c" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 0.5 }}
                  />
                  <motion.path 
                    d="M 180 180 Q 500 100 820 160" 
                    stroke="#dfb76c" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay: 0.2 }}
                  />

                  {/* Pulsing yellow dots that shine sequentially as paths split and connect */}
                  <circle cx="180" cy="180" r="5" fill="#dfb76c" />
                  <motion.circle 
                    cx="180" 
                    cy="180" 
                    r="12" 
                    fill="none" 
                    stroke="#dfb76c" 
                    strokeWidth="1.5" 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.7, 1.6, 0.7], opacity: [0.8, 0, 0.8] }}
                    viewport={{ once: false }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                  />
                  
                  <circle cx="250" cy="320" r="5" fill="#dfb76c" />
                  <motion.circle 
                    cx="250" 
                    cy="320" 
                    r="12" 
                    fill="none" 
                    stroke="#dfb76c" 
                    strokeWidth="1.5" 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.7, 1.6, 0.7], opacity: [0.8, 0, 0.8] }}
                    viewport={{ once: false }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  />

                  <circle cx="520" cy="220" r="5" fill="#dfb76c" />
                  <motion.circle 
                    cx="520" 
                    cy="220" 
                    r="12" 
                    fill="none" 
                    stroke="#dfb76c" 
                    strokeWidth="1.5" 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.7, 1.6, 0.7], opacity: [0.8, 0, 0.8] }}
                    viewport={{ once: false }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                  />

                  <circle cx="820" cy="160" r="5" fill="#dfb76c" />
                  <motion.circle 
                    cx="820" 
                    cy="160" 
                    r="12" 
                    fill="none" 
                    stroke="#dfb76c" 
                    strokeWidth="1.5" 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.7, 1.6, 0.7], opacity: [0.8, 0, 0.8] }}
                    viewport={{ once: false }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
                  />

                  <circle cx="830" cy="360" r="5" fill="#dfb76c" />
                  <motion.circle 
                    cx="830" 
                    cy="360" 
                    r="12" 
                    fill="none" 
                    stroke="#dfb76c" 
                    strokeWidth="1.5" 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.7, 1.6, 0.7], opacity: [0.8, 0, 0.8] }}
                    viewport={{ once: false }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1.1 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>
        )}


        {/* SECTION 9: WHY IMPACT CRED */}
        <section id="why-choose-us" className="landing-section" style={{ background: '#fafbfc' }}>
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="landing-section-badge">WHY IMPACT CRED</span>
            <h2 className="landing-section-title">Why Organizations Choose Impact Cred</h2>
          </div>

          <div className="landing-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {whyPoints.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  borderColor: 'rgba(223, 183, 108, 0.45)',
                  boxShadow: '0 15px 35px rgba(223, 183, 108, 0.08)'
                }}
                className="landing-why-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(223, 183, 108, 0.15)',
                  borderRadius: '20px',
                  padding: '2rem 1.75rem',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '80px',
                  height: '80px',
                  background: 'radial-gradient(circle, rgba(223, 183, 108, 0.12) 0%, transparent 70%)',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(223, 183, 108, 0.06)',
                  color: 'var(--color-gold-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  margin: '0 auto 1.25rem auto',
                  border: '1px solid rgba(223, 183, 108, 0.15)'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: 'var(--color-text-muted-dark)', margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 10: BENEFITS OF CERTIFICATION */}
        <section id="benefits" className="landing-section" style={{ background: '#f8fafc' }}>
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="landing-section-badge">BENEFITS OF CERTIFICATION</span>
            <h2 className="landing-section-title">The Impact Cred Advantage</h2>
          </div>

          <div className="landing-advantage-layout">
            <div className="landing-advantage-col">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(223, 183, 108, 0.45)', boxShadow: '0 12px 30px rgba(223, 183, 108, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                className="landing-advantage-card left"
              >
                <div className="landing-advantage-icon"><Shield size={20} /></div>
                <div>
                  <h3 className="landing-advantage-title">Enhanced Credibility</h3>
                  <p className="landing-advantage-desc">Stand out as a certified, trustworthy ecosystem leader.</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(223, 183, 108, 0.45)', boxShadow: '0 12px 30px rgba(223, 183, 108, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                className="landing-advantage-card left"
              >
                <div className="landing-advantage-icon"><Eye size={20} /></div>
                <div>
                  <h3 className="landing-advantage-title">Greater Visibility</h3>
                  <p className="landing-advantage-desc">Attract donors, partners, and media eyes easily.</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(223, 183, 108, 0.45)', boxShadow: '0 12px 30px rgba(223, 183, 108, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                className="landing-advantage-card left"
              >
                <div className="landing-advantage-icon"><Users size={20} /></div>
                <div>
                  <h3 className="landing-advantage-title">Stakeholder Trust</h3>
                  <p className="landing-advantage-desc">Direct beneficiary feedback loops authenticate your efforts.</p>
                </div>
              </motion.div>
            </div>

            <div className="landing-advantage-center" style={{ position: 'relative', width: '320px', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Rays SVG background */}
              <svg 
                style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  width: '680px', 
                  height: '440px', 
                  pointerEvents: 'none', 
                  zIndex: 10 
                }}
                viewBox="0 0 680 440"
              >
                <defs>
                  <linearGradient id="rayGradLeft" x1="1" y1="0.5" x2="0" y2="0.5">
                    <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="rayGradRight" x1="0" y1="0.5" x2="1" y2="0.5">
                    <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Left/Right reflective arcs wrapping the center image */}
                <motion.path
                  d="M 262 142 A 110 110 0 0 0 262 298"
                  stroke="var(--color-gold)"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.path
                  d="M 418 142 A 110 110 0 0 1 418 298"
                  stroke="var(--color-gold)"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Pulsing reflective anchor points on left and right edges */}
                <circle cx="230" cy="220" r="4" fill="var(--color-gold)" opacity="0.3" />
                <motion.circle 
                  cx="230" cy="220" r="4" 
                  fill="none" 
                  stroke="var(--color-gold)" 
                  strokeWidth="1"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                <circle cx="450" cy="220" r="4" fill="var(--color-gold)" opacity="0.3" />
                <motion.circle 
                  cx="450" cy="220" r="4" 
                  fill="none" 
                  stroke="var(--color-gold)" 
                  strokeWidth="1"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Left rays - Transparent pointings starting from left reflective arc, ending near edge of points */}
                <motion.path 
                  d="M 262 142 L 83 60" 
                  stroke="url(#rayGradLeft)" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.path 
                  d="M 230 220 L 35 220" 
                  stroke="url(#rayGradLeft)" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.path 
                  d="M 262 298 L 83 380" 
                  stroke="url(#rayGradLeft)" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Right rays - Transparent pointings starting from right reflective arc, ending near edge of points */}
                <motion.path 
                  d="M 418 142 L 597 60" 
                  stroke="url(#rayGradRight)" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.path 
                  d="M 450 220 L 645 220" 
                  stroke="url(#rayGradRight)" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.path 
                  d="M 418 298 L 597 380" 
                  stroke="url(#rayGradRight)" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Glowing points at the ends of rays, made highly transparent */}
                <circle cx="60" cy="50" r="4" fill="var(--color-gold)" opacity="0.15" />
                <circle cx="10" cy="220" r="4" fill="var(--color-gold)" opacity="0.15" />
                <circle cx="60" cy="390" r="4" fill="var(--color-gold)" opacity="0.15" />
                <circle cx="620" cy="50" r="4" fill="var(--color-gold)" opacity="0.15" />
                <circle cx="670" cy="220" r="4" fill="var(--color-gold)" opacity="0.15" />
                <circle cx="620" cy="390" r="4" fill="var(--color-gold)" opacity="0.15" />
              </svg>

              <div className="landing-advantage-logo-container" style={{ position: 'relative', zIndex: 5, animation: 'heroFloat 6s ease-in-out infinite' }}>
                <img 
                  src="/ChatGPT_Image_Jun_2__2026__07_09_52_PM-removebg-preview.png" 
                  alt="Impact Cred Logo" 
                  style={{ 
                    width: '280px', 
                    height: '280px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 35px rgba(223, 183, 108, 0.25))'
                  }} 
                />
              </div>
            </div>

            <div className="landing-advantage-col">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(223, 183, 108, 0.45)', boxShadow: '0 12px 30px rgba(223, 183, 108, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                className="landing-advantage-card"
              >
                <div className="landing-advantage-icon"><Award size={20} /></div>
                <div>
                  <h3 className="landing-advantage-title">More Opportunities</h3>
                  <p className="landing-advantage-desc">Streamline applications for CSR capital and global grants.</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(223, 183, 108, 0.45)', boxShadow: '0 12px 30px rgba(223, 183, 108, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                className="landing-advantage-card"
              >
                <div className="landing-advantage-icon"><BarChart3 size={20} /></div>
                <div>
                  <h3 className="landing-advantage-title">Measurable Impact</h3>
                  <p className="landing-advantage-desc">Replace generic claims with verified scoring statistics.</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(223, 183, 108, 0.45)', boxShadow: '0 12px 30px rgba(223, 183, 108, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                className="landing-advantage-card"
              >
                <div className="landing-advantage-icon"><TrendingUp size={20} /></div>
                <div>
                  <h3 className="landing-advantage-title">Sustainable Growth</h3>
                  <p className="landing-advantage-desc">Scale initiatives based on actionable community survey insights.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CERTIFICATE INTERACTIVE LIVE DEMO */}
        <section className="landing-section">
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="landing-section-badge">INTERACTIVE DEMO</span>
            <h2 className="landing-section-title">Tamper-Proof Certifications</h2>
          </div>
          <CertificateMockup />
        </section>

        {/* SECTION 11: TESTIMONIALS */}
        <section id="testimonials" className="landing-section" style={{ background: '#f8fafc', overflow: 'hidden' }}>
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="landing-section-badge">TESTIMONIALS</span>
            <h2 className="landing-section-title">Voices of Trust</h2>
          </div>

          <div className="testimonials-marquee-container">
            <div className="testimonials-marquee-track">
              {[...testimonialsList, ...testimonialsList].map((item, idx) => (
                <div key={idx} className="landing-card-glass testimonial-card testimonial-card-shine">
                  <p className="testimonial-text">
                    "{item.text}"
                  </p>
                  <div>
                    <h4 className="testimonial-name">{item.name}</h4>
                    <span className="testimonial-role">{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12: FAQ */}
        <section id="faqs" className="landing-section">
          <div className="landing-section-title-wrap" style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
            <span className="landing-section-badge">FAQS</span>
            <h2 className="landing-section-title">Frequently Asked Questions</h2>
          </div>
          
          <div style={{ position: 'relative' }}>
            {/* Background Decorative "?" Watermark */}
            <div className="faq-watermark">?</div>
            <FaqAccordion />
          </div>
        </section>

        {/* SECTION 13: CALL TO ACTION (CONTRASTING DARK THEME) */}
        <section id="cta" className="landing-cta-section">
          <div className="landing-cta-container">
            <div className="landing-cta-content">
              <span className="landing-cta-badge">Ready to Validate Your Impact?</span>
              <h2 className="landing-cta-title">Join a global movement of trusted organizations creating meaningful change.</h2>
              <p className="landing-cta-subtitle">
                Validate your credibility score, dispatch automated stakeholder feedback surveys, and download tamper-proof smart certifications.
              </p>
              <div className="cta-buttons-wrap">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScmEsmx0pcwmBGqsbJZyKVW_KciQWZQMwYe5KuziYmDfGi7Mg/viewform" target="_blank" rel="noopener noreferrer" className="landing-btn landing-btn-primary">Apply for Certification <ArrowRight size={16} /></a>
                <a href="mailto:impactcred.connect@gmail.com" className="landing-btn landing-btn-secondary" style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)' }}>Talk to Our Team</a>
              </div>
            </div>

            <div className="landing-cta-image-col">
              {/* Image representing open door with glowing light */}
              <img 
                src="/door%20open.png" 
                className="landing-cta-door-img" 
                alt="Open door representing transparency and new opportunities" 
              />
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 14: FOOTER & CONTACT DETAILS */}
      <footer id="footer" className="landing-footer">
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
              <button onClick={() => scrollToSection('hero')} className="landing-footer-link">Home</button>
              <button onClick={() => scrollToSection('about')} className="landing-footer-link">About Us</button>
              <button onClick={() => scrollToSection('framework')} className="landing-footer-link">Framework</button>
              <button onClick={() => scrollToSection('process')} className="landing-footer-link">Process</button>
              <Link to="/team" className="landing-footer-link">Team</Link>
            </div>
          </div>

          <div className="landing-footer-col">
            <h4>Certifications</h4>
            <div className="landing-footer-links">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScmEsmx0pcwmBGqsbJZyKVW_KciQWZQMwYe5KuziYmDfGi7Mg/viewform" target="_blank" rel="noopener noreferrer" className="landing-footer-link">Apply Now</a>
              <button onClick={() => scrollToSection('benefits')} className="landing-footer-link">Benefits</button>
              <button onClick={() => scrollToSection('framework')} className="landing-footer-link">Evaluation Criteria</button>
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
      <section className="landing-bottom-highlights">
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

export default LandingPage;
