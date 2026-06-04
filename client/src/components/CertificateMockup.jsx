import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CertificateMockup = ({ orgName = "EcoSphere Alliance", showSliders = true }) => {
  // Local state for interactive sliders that update the certificate in real-time
  const [scores, setScores] = useState({
    transparency: 98,
    ethics: 96,
    collaboration: 94,
    impact: 95,
  });

  const handleScoreChange = (metric, val) => {
    setScores((prev) => ({
      ...prev,
      [metric]: parseInt(val, 10),
    }));
  };

  // Calculate Overall Score
  const overallScore = Math.round(
    (scores.transparency + scores.ethics + scores.collaboration + scores.impact) / 4
  );

  return (
    <div className="landing-cert-sandbox">
      {/* 3D Certificate Mockup */}
      <div className="cert-mockup-wrapper">
        <div className="cert-mockup-glow"></div>
        <motion.div
          className="cert-mockup-card"
          whileHover={{ rotateY: -8, rotateX: 6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="cert-mockup-header">
            <div>
              <span className="cert-mockup-logo">Impact Cred.</span>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                SOCIAL CREDIBILITY STANDARDS
              </div>
            </div>
            <div className="cert-mockup-badge-seal" title="Gold Class Verification Seal">
              🎖️
            </div>
          </div>

          <div className="cert-mockup-body">
            <div style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem' }}>
              Certificate of Social Impact
            </div>
            <h4>{orgName}</h4>
            <p>
              Successfully verified and certified for demonstrating outstanding standards of social responsibility, beneficiary transparency, and ethical collaboration.
            </p>

            <div className="cert-mockup-scores">
              {/* Transparency */}
              <div className="cert-mockup-score-row">
                <span className="cert-mockup-score-label">Transparency & Openness</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="cert-mockup-score-bar-bg">
                    <motion.div
                      className="cert-mockup-score-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.transparency}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <span className="cert-mockup-score-value">{scores.transparency}%</span>
                </div>
              </div>

              {/* Ethics */}
              <div className="cert-mockup-score-row">
                <span className="cert-mockup-score-label">Ethical Standard Practices</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="cert-mockup-score-bar-bg">
                    <motion.div
                      className="cert-mockup-score-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.ethics}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <span className="cert-mockup-score-value">{scores.ethics}%</span>
                </div>
              </div>

              {/* Collaboration */}
              <div className="cert-mockup-score-row">
                <span className="cert-mockup-score-label">Partnership Integrity</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="cert-mockup-score-bar-bg">
                    <motion.div
                      className="cert-mockup-score-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.collaboration}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <span className="cert-mockup-score-value">{scores.collaboration}%</span>
                </div>
              </div>

              {/* Impact */}
              <div className="cert-mockup-score-row">
                <span className="cert-mockup-score-label">Social Impact Metrics</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="cert-mockup-score-bar-bg">
                    <motion.div
                      className="cert-mockup-score-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.impact}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <span className="cert-mockup-score-value">{scores.impact}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cert-mockup-footer">
            <div className="cert-mockup-qr-wrap">
              {/* Mini visual QR generator using CSS blocks */}
              <div className="cert-mockup-qr" title="Scan to verify credibility score">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px', width: '100%', height: '100%' }}>
                  {[1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1].map((bit, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: bit ? '#030712' : 'transparent',
                        borderRadius: '1px',
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="cert-mockup-meta">
                <span className="cert-mockup-id">ID: IC-7482-90A</span>
                <span className="cert-mockup-status">
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
                  VERIFIED ACTIVE
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Overall Score
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {overallScore}/100
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Controls sidebar */}
      {showSliders && (
        <div>
          <div style={{ position: 'relative', zIndex: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🎛️</span>
              <h3 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem' }}>
                Live Credibility Sandbox
              </h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Impact Cred generates tamper-proof certificates by collecting raw verification data. Test the interactive sandbox sliders to see how the cryptographic score indicators dynamically compute rating standards.
            </p>

            <div className="cert-sandbox-interactive">
              <div className="cert-sandbox-slider-group">
                <label>
                  <span>Transparency & Openness</span>
                  <strong>{scores.transparency}%</strong>
                </label>
                <input
                  type="range"
                  className="cert-sandbox-slider"
                  min="50"
                  max="100"
                  value={scores.transparency}
                  onChange={(e) => handleScoreChange('transparency', e.target.value)}
                />
              </div>

              <div className="cert-sandbox-slider-group">
                <label>
                  <span>Ethical Standard Practices</span>
                  <strong>{scores.ethics}%</strong>
                </label>
                <input
                  type="range"
                  className="cert-sandbox-slider"
                  min="50"
                  max="100"
                  value={scores.ethics}
                  onChange={(e) => handleScoreChange('ethics', e.target.value)}
                />
              </div>

              <div className="cert-sandbox-slider-group">
                <label>
                  <span>Partnership Integrity</span>
                  <strong>{scores.collaboration}%</strong>
                </label>
                <input
                  type="range"
                  className="cert-sandbox-slider"
                  min="50"
                  max="100"
                  value={scores.collaboration}
                  onChange={(e) => handleScoreChange('collaboration', e.target.value)}
                />
              </div>

              <div className="cert-sandbox-slider-group">
                <label>
                  <span>Social Impact Metrics</span>
                  <strong>{scores.impact}%</strong>
                </label>
                <input
                  type="range"
                  className="cert-sandbox-slider"
                  min="50"
                  max="100"
                  value={scores.impact}
                  onChange={(e) => handleScoreChange('impact', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateMockup;
