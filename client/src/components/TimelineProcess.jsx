import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Step 1 — Application Submission',
      shortTitle: 'Submission',
      icon: '📝',
      desc: 'Organizations submit their certification request along with organizational details, impact information, and stakeholder references.',
      details: [
        'Define CSR/NGO categories',
        'Upload verified impact records',
        'Add reference stakeholder contacts (corporate partners, community groups)',
      ],
    },
    {
      title: 'Step 2 — Stakeholder Verification',
      shortTitle: 'Verification',
      icon: '🔍',
      desc: 'Impact Cred identifies and verifies associated stakeholders including corporate partners, NGOs, CSR teams, foundations, and collaborators.',
      details: [
        'Rigid verification of corporate domains',
        'Automated stakeholder outreach matching',
        'KYC and verification checks to prevent fraudulent references',
      ],
    },
    {
      title: 'Step 3 — Survey-Based Assessment',
      shortTitle: 'Assessment',
      icon: '📊',
      desc: 'Professional survey forms and evaluation questionnaires are directly shared with stakeholders to understand organizational credibility, ethical practices, and contribution effectiveness.',
      details: [
        'Anonymized feedback channels',
        'Assess transparency & communication standards',
        'Measure long-term collaboration quality & beneficiary outcomes',
      ],
    },
    {
      title: 'Step 4 — Independent Evaluation',
      shortTitle: 'Evaluation',
      icon: '⚖️',
      desc: 'Responses are carefully analyzed using Impact Cred’s structured credibility framework and assessment methodology to avoid evaluator bias.',
      details: [
        'Weighted scoring system',
        'Cross-verifying survey answers to flag anomalies',
        'Review against absolute compliance and integrity benchmarks',
      ],
    },
    {
      title: 'Step 5 — Certification & Recognition',
      shortTitle: 'Recognition',
      icon: '🎓',
      desc: 'Organizations successfully meeting the required standards receive official Impact Cred Certification recognizing their commitment toward meaningful and measurable impact.',
      details: [
        'Cryptographic certificate generation with unique QR status check',
        'Publish verified organization profile to public trust matrix',
        'Annual renewal tracking for continued credibility status',
      ],
    },
  ];

  return (
    <div className="timeline-container">
      {/* Vertical glowing track */}
      <div className="timeline-track"></div>
      <div
        className="timeline-progress"
        style={{
          transform: `scaleY(${activeStep / (steps.length - 1)})`,
        }}
      ></div>

      <div className="timeline-grid">
        {/* Steps List */}
        <div className="timeline-steps-list">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className={`timeline-step ${activeStep === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(idx)}
              onClick={() => setActiveStep(idx)}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="timeline-node">
                {step.icon}
              </div>
              <div className="timeline-step-content">
                <h3 className="timeline-step-heading">
                  {step.title}
                </h3>
                <p className="timeline-step-desc">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Detail Card Box */}
        <div className="timeline-detail-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="landing-card-glass timeline-detail-card"
            >
              <div className="timeline-card-header">
                <span className="timeline-card-header-icon">{steps[activeStep].icon}</span>
                <span className="timeline-card-header-badge">
                  {steps[activeStep].shortTitle} Core Metrics
                </span>
              </div>
              <h4 className="timeline-card-title">
                Key Implementation Pillars
              </h4>
              <ul className="timeline-card-list">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <li key={dIdx} className="timeline-card-list-item">
                    <span className="timeline-card-check">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TimelineProcess;
