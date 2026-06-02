import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is Impact Cred?',
      a: 'Impact Cred is a professional social impact certification and credibility platform that recognizes organizations creating measurable and meaningful contribution toward society.',
    },
    {
      q: 'Who can apply for certification?',
      a: 'Any organization working toward social good, sustainability, community welfare, education, healthcare, environmental responsibility, or public impact initiatives can apply.',
    },
    {
      q: 'How is the evaluation conducted?',
      a: 'The evaluation process includes stakeholder surveys, partnership assessments, transparency reviews, ethical practice analysis, and structured credibility evaluation.',
    },
    {
      q: 'Is the certification independent?',
      a: 'Yes. Impact Cred follows a transparent and independent evaluation framework designed to ensure fairness, authenticity, and professional credibility.',
    },
    {
      q: 'What does the certification represent?',
      a: 'The certification represents transparency, stakeholder trust, accountability, ethical operations, sustainability, and measurable social impact.',
    },
    {
      q: 'How long does the process take?',
      a: 'The certification timeline depends on stakeholder response completion and evaluation stages, generally ranging between 2 to 6 weeks.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <div className="faq-header" onClick={() => toggleFaq(index)}>
              <span>{faq.q}</span>
              <ChevronDown className="faq-chevron" size={20} />
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="faq-body">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
