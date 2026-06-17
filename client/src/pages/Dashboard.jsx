import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '../features/auth/authSlice';
import { getMyOrg, createOrg, updateMyOrg, resetOrgState } from '../features/org/orgSlice';
import CertificateMockup from '../components/CertificateMockup';
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Building2, 
  Globe,
  ArrowRight,
  UserCheck
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'NGO',
    registrationNumber: '',
    website: '',
    address: '',
    logoUrl: '',
  });

  const { name, type, registrationNumber, website, address, logoUrl } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { org, isLoading, isError, message, isSuccess } = useSelector((state) => state.org);

  // Interactive Sandbox states
  const [testVerified, setTestVerified] = useState(false);
  const [stakeholders, setStakeholders] = useState([
    { id: 1, name: 'Srinivas Rao', role: 'Beneficiary', email: 'srinivas.rao@mail.com', status: 'Survey Pending' },
    { id: 2, name: 'Devi Priya', role: 'Local NGO Partner', email: 'devi.priya@ngo.org', status: 'Survey Completed' },
    { id: 3, name: 'K. Satish Kumar', role: 'Community Representative', email: 'satish.kumar@community.in', status: 'Survey Pending' }
  ]);
  const [newStakeholder, setNewStakeholder] = useState({ name: '', role: 'Beneficiary', email: '' });
  const [surveysDispatched, setSurveysDispatched] = useState(false);
  const [dispatching, setDispatching] = useState(false);
  const [applications, setApplications] = useState([
    { id: 'APP-2026-904', date: 'June 01, 2026', type: 'Rubric V2 Certification', status: 'Under Evaluation', score: '--' },
    { id: 'APP-2026-481', date: 'May 12, 2026', type: 'Stakeholder Feedback Audit', status: 'Draft', score: '--' }
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getMyOrg());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (org) {
      setFormData({
        name: org.name || '',
        type: org.type || 'NGO',
        registrationNumber: org.registrationNumber || '',
        website: org.website || '',
        address: org.address || '',
        logoUrl: org.logoUrl || '',
      });
      setTestVerified(org.verified);
    }
  }, [org]);

  useEffect(() => {
    if (isSuccess && isEditing) {
      setIsEditing(false);
      dispatch(resetOrgState());
    }
  }, [isSuccess, isEditing, dispatch]);

  useEffect(() => {
    if (isError && message && message !== 'No organization profile found for this user') {
      alert(message);
      dispatch(resetOrgState());
    }
  }, [isError, message, dispatch]);

  const onLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const orgData = {
      name,
      type,
      registrationNumber,
      website,
      address,
      logoUrl,
    };

    if (org) {
      dispatch(updateMyOrg(orgData));
    } else {
      dispatch(createOrg(orgData)).then(() => {
        dispatch(getMyOrg());
      });
    }
  };

  const isOrgVerified = org ? (org.verified || testVerified) : false;

  const handleAddStakeholder = (e) => {
    e.preventDefault();
    if (!newStakeholder.name || !newStakeholder.email) return;
    const added = {
      id: Date.now(),
      name: newStakeholder.name,
      role: newStakeholder.role,
      email: newStakeholder.email,
      status: 'Survey Pending'
    };
    setStakeholders([...stakeholders, added]);
    setNewStakeholder({ name: '', role: 'Beneficiary', email: '' });
  };

  const handleDeleteStakeholder = (id) => {
    setStakeholders(stakeholders.filter(s => s.id !== id));
  };

  const handleDispatchSurveys = () => {
    if (stakeholders.length === 0) return;
    setDispatching(true);
    setTimeout(() => {
      setDispatching(false);
      setSurveysDispatched(true);
      setStakeholders(stakeholders.map(s => ({ ...s, status: 'Survey Sent' })));
      // Update applications state to reflect the survey progress
      setApplications(prev => prev.map((app, idx) => idx === 0 ? { ...app, status: 'Auditing Responses' } : app));
      alert('Surveys dispatched successfully to all registered stakeholders!');
    }, 1500);
  };

  if (isLoading && !org) {
    return <div className="text-center mt-20 text-3xl">Loading Dashboard...</div>;
  }

  const renderTimeline = () => {
    const steps = [
      { id: 1, title: 'Profile Setup', desc: 'Organization profile completed', status: org ? 'completed' : 'active' },
      { id: 2, title: 'Stakeholder Ledger', desc: 'Stakeholder contacts registered', status: !org ? 'locked' : (stakeholders.length > 0 ? 'completed' : 'active') },
      { id: 3, title: 'Survey Dispatch', desc: 'Feedback surveys collected', status: !org || stakeholders.length === 0 ? 'locked' : (surveysDispatched ? 'completed' : 'active') },
      { id: 4, title: 'Independent Audit', desc: 'Validator score verification', status: !org || !surveysDispatched ? 'locked' : (isOrgVerified ? 'completed' : 'active') },
      { id: 5, title: 'Credential Issued', desc: 'Smart Certificate published', status: org && isOrgVerified ? 'completed' : 'locked' },
    ];

    return (
      <div className="landing-card-glass" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }} className="gradient-text">Verification Progress Timeline</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', flexWrap: 'wrap', gap: '1.5rem' }}>
          {/* Connector line for desktop */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '40px',
            right: '40px',
            height: '2px',
            background: 'rgba(15, 23, 42, 0.08)',
            zIndex: 1,
            display: 'block'
          }} />

          {steps.map((s) => {
            let icon = s.id;
            let bgColor = '#cbd5e1';
            let textColor = 'var(--text-muted)';
            let borderColor = 'transparent';

            if (s.status === 'completed') {
              icon = <CheckCircle2 size={18} />;
              bgColor = '#22c55e'; // Green
              textColor = 'var(--text-main)';
            } else if (s.status === 'active') {
              bgColor = '#4f46e5'; // Purple
              textColor = 'var(--text-main)';
              borderColor = 'rgba(79, 70, 229, 0.3)';
            } else if (s.status === 'locked') {
              bgColor = 'rgba(15, 23, 42, 0.05)';
              textColor = '#94a3b8';
            }

            return (
              <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '18%', minWidth: '120px', zIndex: 2, position: 'relative' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: bgColor,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: s.status === 'active' ? '4px solid ' + borderColor : 'none',
                  boxShadow: s.status === 'active' ? '0 0 15px rgba(79, 70, 229, 0.4)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {icon}
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '0.85rem', marginBottom: '0.25rem', color: textColor }}>{s.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderScoreGauge = () => {
    const score = isOrgVerified ? 96 : 0;
    const radius = 50;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="landing-card-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', height: '100%' }}>
        <h4 className="stat-label" style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Overall Impact Index</h4>
        <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background Circle */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="transparent"
              stroke="rgba(15, 23, 42, 0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Foreground Score Path */}
            <motion.circle
              cx="65"
              cy="65"
              r={radius}
              fill="transparent"
              stroke={isOrgVerified ? 'var(--color-gold)' : '#cbd5e1'}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isOrgVerified ? '96' : '--'}
            </span>
            {isOrgVerified && (
              <div style={{ fontSize: '0.65rem', color: 'var(--color-gold-text)', fontWeight: 700 }}>GOLD CLASS</div>
            )}
          </div>
        </div>
        <span className="stat-desc" style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          {isOrgVerified 
            ? 'Outstanding verification score based on stakeholder survey audit' 
            : 'Register stakeholders to initiate score evaluation'}
        </span>
      </div>
    );
  };

  const renderOverview = () => {
    return (
      <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {!org ? (
          <div className="profile-setup-banner" style={{ border: '1px solid rgba(223, 183, 108, 0.25)' }}>
            <div className="profile-setup-banner-text">
              <h3>Complete Your Profile Setup</h3>
              <p>You must set up your organization details before applying for certificates.</p>
            </div>
            <button className="btn-primary" style={{ width: 'auto', margin: 0 }} onClick={() => setActiveTab('profile')}>
              Set Up Now
            </button>
          </div>
        ) : (
          <div className="profile-setup-banner" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(223, 183, 108, 0.05) 100%)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
            <div className="profile-setup-banner-text">
              <h3>Profile Configured</h3>
              <p>Your organization profile is active. You can now manage stakeholders and certification requests.</p>
            </div>
            <span className={isOrgVerified ? 'badge badge-success' : 'badge badge-warning'}>
              {isOrgVerified ? 'Verified Profile' : 'Pending Verification'}
            </span>
          </div>
        )}

        {renderTimeline()}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }} className="grid-cols-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: 0 }}>
              <div className="stat-card" style={{ background: 'rgba(255, 255, 255, 0.65)' }}>
                <span className="stat-label">Certification Status</span>
                <span className="stat-value" style={{ fontSize: '1.35rem', marginTop: '0.5rem', color: isOrgVerified ? '#22c55e' : 'inherit' }}>
                  {isOrgVerified ? 'Credential Issued' : 'Profile Created'}
                </span>
                <span className="stat-desc">
                  {isOrgVerified ? 'Smart certificate is active' : 'Complete other stages to audit'}
                </span>
              </div>
              <div className="stat-card" style={{ background: 'rgba(255, 255, 255, 0.65)' }}>
                <span className="stat-label">Verified Stakeholders</span>
                <span className="stat-value">{stakeholders.length}</span>
                <span className="stat-desc">Active references in system</span>
              </div>
            </div>

            <div className="landing-card-glass" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Application Guidelines</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                To certify your social impact, please complete the verification criteria:
              </p>
              <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '2', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                <li>Complete your organization profile setup (available in the <strong>Profile</strong> tab).</li>
                <li>Submit details of key stakeholders (beneficiaries, partners, community members).</li>
                <li>Dispatch surveys and gather anonymous community feedback.</li>
                <li>An independent evaluator will audit aggregated scores and issue the Impact Cred.</li>
              </ol>
            </div>
          </div>

          <div>
            {renderScoreGauge()}
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    const isNewProfile = !org;

    if (isNewProfile || isEditing) {
      return (
        <div className="landing-card-glass animate-fade-in-up" style={{ padding: '2.5rem' }}>
          <h3 className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{isNewProfile ? 'Set Up Organization Profile' : 'Edit Organization Profile'}</span>
            {isEditing && (
              <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            )}
          </h3>
          <form onSubmit={onSubmit} style={{ marginTop: '1.5rem' }}>
            <div className="grid-cols-2">
              <div>
                <div className="form-group">
                  <label htmlFor="name">Organization Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter official organization name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Organization Type</label>
                  <select
                    className="form-control"
                    id="type"
                    name="type"
                    value={type}
                    onChange={onChange}
                    style={{ height: '45px' }}
                    required
                  >
                    <option value="NGO">NGO / Non-Profit</option>
                    <option value="CSR">Corporate CSR Team</option>
                    <option value="Social Enterprise">Social Enterprise</option>
                    <option value="Foundation">Foundation / Trust</option>
                    <option value="Educational Institution">Educational Institution</option>
                    <option value="Healthcare Organization">Healthcare Organization</option>
                    <option value="Community Initiative">Community Initiative</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="registrationNumber">Registration Number / Tax ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={registrationNumber}
                    onChange={onChange}
                    placeholder="Enter registration ID"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="website">Website URL (Optional)</label>
                  <input
                    type="url"
                    className="form-control"
                    id="website"
                    name="website"
                    value={website}
                    onChange={onChange}
                    placeholder="https://example.org"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="logoUrl">Logo URL (Optional)</label>
                  <input
                    type="url"
                    className="form-control"
                    id="logoUrl"
                    name="logoUrl"
                    value={logoUrl}
                    onChange={onChange}
                    placeholder="https://example.org/logo.png"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Registered Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={address}
                    onChange={onChange}
                    placeholder="Enter official address details"
                    rows="3"
                    style={{ resize: 'none', height: '110px' }}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ maxWidth: '200px', marginTop: '1rem' }}>
              {isNewProfile ? 'Create Profile' : 'Save Changes'}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="landing-card-glass animate-fade-in-up" style={{ padding: '2.5rem' }}>
        <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Organization Details</span>
          <button className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
        <div className="grid-cols-2" style={{ marginTop: '2rem' }}>
          <div>
            <div className="detail-item">
              <div className="detail-label">Name</div>
              <div className="detail-value">{org.name}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Organization Type</div>
              <div className="detail-value">{org.type}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Registration / License ID</div>
              <div className="detail-value">{org.registrationNumber}</div>
            </div>
          </div>
          <div>
            <div className="detail-item">
              <div className="detail-label">Website</div>
              <div className="detail-value">
                {org.website ? (
                  <a href={org.website} target="_blank" rel="noopener noreferrer" className="link">
                    {org.website}
                  </a>
                ) : (
                  'Not specified'
                )}
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Verification Status</div>
              <div className="detail-value" style={{ marginTop: '0.25rem' }}>
                <span className={isOrgVerified ? 'badge badge-success' : 'badge badge-warning'}>
                  {isOrgVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Office Address</div>
              <div className="detail-value">{org.address}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderApplications = () => {
    return (
      <div className="animate-fade-in-up">
        <div className="landing-card-glass" style={{ padding: '2.5rem' }}>
          <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Active Applications</span>
            {org && (
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScmEsmx0pcwmBGqsbJZyKVW_KciQWZQMwYe5KuziYmDfGi7Mg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" 
                style={{ width: 'auto', margin: 0, padding: '0.5rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
              >
                Apply for Certification
              </a>
            )}
          </div>

          <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Application ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date Submitted</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Type</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Evaluation Status</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Current Score</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  let badgeClass = 'badge-info';
                  if (app.status === 'Approved' || app.status === 'Verified') badgeClass = 'badge-success';
                  if (app.status === 'Draft') badgeClass = 'badge-warning';

                  return (
                    <tr key={app.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: 700 }}>{app.id}</td>
                      <td style={{ padding: '1.2rem 1rem' }}>{app.date}</td>
                      <td style={{ padding: '1.2rem 1rem' }}>{app.type}</td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <span className={`badge ${badgeClass}`}>{app.status}</span>
                      </td>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: 800, color: app.score !== '--' ? 'var(--color-gold-text)' : 'inherit' }}>{app.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderStakeholders = () => {
    return (
      <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }} className="grid-cols-2">
          {/* Add Stakeholder Form */}
          <div className="landing-card-glass" style={{ padding: '2rem', height: 'fit-content' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0' }}>Add Stakeholder Reference</h4>
            <form onSubmit={handleAddStakeholder} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="stakeholderName">Full Name</label>
                <input
                  type="text"
                  id="stakeholderName"
                  className="form-control"
                  placeholder="Enter name"
                  value={newStakeholder.name}
                  onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="stakeholderEmail">Email Address</label>
                <input
                  type="email"
                  id="stakeholderEmail"
                  className="form-control"
                  placeholder="Enter email"
                  value={newStakeholder.email}
                  onChange={(e) => setNewStakeholder({ ...newStakeholder, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="stakeholderRole">Stakeholder Role</label>
                <select
                  id="stakeholderRole"
                  className="form-control"
                  value={newStakeholder.role}
                  onChange={(e) => setNewStakeholder({ ...newStakeholder, role: e.target.value })}
                  style={{ height: '45px' }}
                >
                  <option value="Beneficiary">Beneficiary / Recipient</option>
                  <option value="Local NGO Partner">Local NGO Partner</option>
                  <option value="Community Representative">Community Representative</option>
                  <option value="Funding Partner">Funding Partner / Donor</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ margin: '0.5rem 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Plus size={16} /> Add Stakeholder
              </button>
            </form>
          </div>

          {/* Stakeholder List Table */}
          <div className="landing-card-glass" style={{ padding: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0' }}>Stakeholder Ledger</h4>
            {stakeholders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No stakeholders registered yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                      <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Name</th>
                      <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Role</th>
                      <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email</th>
                      <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</th>
                      <th style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stakeholders.map((s) => (
                      <tr key={s.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
                        <td style={{ padding: '0.9rem 0.75rem', fontWeight: 600 }}>{s.name}</td>
                        <td style={{ padding: '0.9rem 0.75rem', fontSize: '0.85rem' }}>{s.role}</td>
                        <td style={{ padding: '0.9rem 0.75rem', fontSize: '0.85rem' }}>{s.email}</td>
                        <td style={{ padding: '0.9rem 0.75rem' }}>
                          <span className={`badge ${s.status === 'Survey Completed' ? 'badge-success' : 'badge-warning'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.9rem 0.75rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDeleteStakeholder(s.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                            title="Delete Stakeholder"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Survey dispatch simulator panel */}
        {stakeholders.length > 0 && (
          <div className="landing-card-glass" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Dispatch Verification Surveys</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, maxWidth: '520px' }}>
                Collect direct field metrics from the community. Dispatching surveys triggers automated emails containing secure evaluation forms to all registered stakeholders.
              </p>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: 'auto', margin: 0, padding: '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={handleDispatchSurveys}
              disabled={dispatching}
            >
              <Send size={16} /> {dispatching ? 'Sending...' : 'Dispatch Surveys'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderCertificates = () => {
    return (
      <div className="animate-fade-in-up">
        {isOrgVerified ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <CertificateMockup orgName={org?.name || 'EcoSphere Alliance'} showSliders={false} />
            <div className="landing-card-glass text-center" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Download Smart Credential</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Your smart certificate is cryptographically signed and stored in the Impact Ledger. Download the validated credential.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  className="btn-primary" 
                  style={{ width: 'auto', margin: 0, padding: '0.75rem 2rem' }}
                  onClick={() => alert(`Downloading certificate ID: IC-7482-90A\nCryptographic Hash: 0x7a39d84bf7291a265691de88e1bc98ef73\nVerification Status: ACTIVE`)}
                >
                  Download PDF Certificate
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="landing-card-glass text-center" style={{ padding: '4rem 2rem' }}>
            <AlertTriangle size={48} style={{ color: '#eab308', marginBottom: '1.5rem', marginInline: 'auto' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Certificate Not Issued Yet</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Your organization profile has not been verified. Once you set up your profile, ledger stakeholders, dispatch surveys, and complete the validator audit, your cryptographic smart certificate will be viewable here.
            </p>
            <button className="btn-primary" style={{ width: 'auto', margin: 0 }} onClick={() => setActiveTab('overview')}>
              View Steps on Overview
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {(() => {
            switch (activeTab) {
              case 'overview':
                return renderOverview();
              case 'profile':
                return renderProfile();
              case 'applications':
                return renderApplications();
              case 'stakeholders':
                return renderStakeholders();
              case 'certificates':
                return renderCertificates();
              default:
                return renderOverview();
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-bg-dark-deep)' }}>
      {/* Background overlapping elements to match landing page visual language */}
      <div className="global-rotating-diamonds-bg">
        <div className="bg-diamond dia-1"></div>
        <div className="bg-diamond dia-2"></div>
        <div className="bg-diamond dia-3"></div>
        <div className="bg-diamond dia-4"></div>
        <div className="bg-diamond dia-5"></div>
        <div className="bg-diamond dia-6"></div>
      </div>
      <div className="landing-glow-blob landing-glow-blob-1"></div>
      <div className="landing-glow-blob landing-glow-blob-2"></div>

      <div className="dashboard-layout" style={{ position: 'relative', zIndex: 10, flex: 1 }}>
        {/* Sidebar Navigation */}
        <aside className="sidebar animate-slide-in-left" style={{ background: 'rgba(255, 255, 255, 0.75)', borderRight: '1px solid rgba(15, 23, 42, 0.08)' }}>
          <div>
            <div className="logo-text">Impact Cred.</div>
            <nav className="sidebar-nav">
              <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                Overview
              </button>
              <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                My Profile
              </button>
              <button className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
                Applications
              </button>
              <button className={`nav-item ${activeTab === 'stakeholders' ? 'active' : ''}`} onClick={() => setActiveTab('stakeholders')}>
                Stakeholders
              </button>
              <button className={`nav-item ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>
                Certificates
              </button>
            </nav>
          </div>

          <div className="sidebar-user">
            <div className="user-info">
              <div className="avatar">
                {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-details">
                <span className="user-name">{user ? user.name : 'User'}</span>
                <span className="user-role">{user ? user.role : 'Member'}</span>
              </div>
            </div>
            <button onClick={onLogout} className="btn-danger-outline">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Panel Content */}
        <main className="main-content" style={{ padding: '2.5rem 3.5rem' }}>
          <header className="dashboard-header" style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
            <div className="header-title">
              <h1 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'profile' && 'Organization Profile'}
                {activeTab === 'applications' && 'Track Applications'}
                {activeTab === 'stakeholders' && 'Stakeholder Ledger'}
                {activeTab === 'certificates' && 'Credibility Credentials'}
              </h1>
            </div>
            <div className="header-meta" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              {org && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.6)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid rgba(223, 183, 108, 0.25)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Validator Sandbox:</span>
                  <button 
                    className={isOrgVerified ? 'badge badge-success' : 'badge badge-warning'} 
                    style={{ cursor: 'pointer', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}
                    onClick={() => setTestVerified(!testVerified)}
                  >
                    {isOrgVerified ? 'Verified Profile' : 'Pending Verification'}
                  </button>
                </div>
              )}
              {org && (
                <span className="user-name" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {org.name}
                </span>
              )}
            </div>
          </header>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
