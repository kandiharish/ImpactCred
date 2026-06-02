import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { getMyOrg, createOrg, updateMyOrg, resetOrgState } from '../features/org/orgSlice';

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

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch user's organization details
    dispatch(getMyOrg());
  }, [user, navigate, dispatch]);

  // Sync form data when org is loaded or isEditing changes
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
    }
  }, [org, isEditing]);

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
      // Update
      dispatch(updateMyOrg(orgData));
    } else {
      // Create
      dispatch(createOrg(orgData)).then(() => {
        dispatch(getMyOrg()); // Refresh user state
      });
    }
  };

  if (isLoading && !org) {
    return <div className="text-center mt-20 text-3xl">Loading Dashboard...</div>;
  }

  const renderOverview = () => {
    return (
      <div className="animate-fade-in-up">
        {!org ? (
          <div className="profile-setup-banner">
            <div className="profile-setup-banner-text">
              <h3>Complete Your Profile Setup</h3>
              <p>You must set up your organization details before applying for certificates.</p>
            </div>
            <button className="btn-primary" style={{ width: 'auto', margin: 0 }} onClick={() => setActiveTab('profile')}>
              Set Up Now
            </button>
          </div>
        ) : (
          <div className="profile-setup-banner" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
            <div className="profile-setup-banner-text">
              <h3>Profile Configured</h3>
              <p>Your organization profile is active. You can now manage stakeholders and certification requests.</p>
            </div>
            <span className="badge badge-success">
              {org.verified ? 'Verified Profile' : 'Pending Verification'}
            </span>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="stat-card animate-fade-in-up delay-1">
            <span className="stat-label">Certification Status</span>
            <span className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>No Active Requests</span>
            <span className="stat-desc">Complete profile to initiate application</span>
          </div>
          <div className="stat-card animate-fade-in-up delay-2">
            <span className="stat-label">Verified Stakeholders</span>
            <span className="stat-value">0</span>
            <span className="stat-desc">Active references in system</span>
          </div>
          <div className="stat-card animate-fade-in-up delay-3">
            <span className="stat-label">Impact Score</span>
            <span className="stat-value">--</span>
            <span className="stat-desc">Calculated upon evaluation</span>
          </div>
        </div>

        <div className="panel-card">
          <h3 className="panel-title">Application Guidelines</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            To certify your social impact, please follow these steps:
          </p>
          <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '2' }}>
            <li>Complete your organization profile setup (available in the <strong>Profile</strong> tab).</li>
            <li>Submit details of key stakeholders (beneficiaries, partners, community members).</li>
            <li>Wait for surveys to be dispatched and response data to be collected.</li>
            <li>An independent evaluator will audit the aggregated scores and issue the Impact Cred.</li>
          </ol>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    const isNewProfile = !org;

    if (isNewProfile || isEditing) {
      return (
        <div className="panel-card animate-fade-in-up">
          <h3 className="panel-title">
            {isNewProfile ? 'Set Up Organization Profile' : 'Edit Organization Profile'}
            {isEditing && (
              <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            )}
          </h3>
          <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn-primary" style={{ maxWidth: '200px' }}>
              {isNewProfile ? 'Create Profile' : 'Save Changes'}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="panel-card animate-fade-in-up">
        <div className="panel-title">
          <span>Organization Details</span>
          <button className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
        <div className="grid-cols-2">
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
                <span className={org.verified ? 'badge badge-success' : 'badge badge-warning'}>
                  {org.verified ? 'Verified' : 'Pending Verification'}
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

  const renderPlaceholderTab = (title) => {
    return (
      <div className="panel-card text-center animate-fade-in-up" style={{ padding: '4rem 2rem' }}>
        <h3 className="text-3xl" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{title} Dashboard</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.6' }}>
          This component is part of the upcoming implementation roadmap (Milestone 4 - Milestone 8) for the Impact Cred social certification platform.
        </p>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return renderProfile();
      case 'applications':
        return renderPlaceholderTab('Application Tracking');
      case 'stakeholders':
        return renderPlaceholderTab('Stakeholder Management');
      case 'certificates':
        return renderPlaceholderTab('Impact Certifications');
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar animate-slide-in-left">
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
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'profile' && 'Organization Profile'}
              {activeTab === 'applications' && 'Track Applications'}
              {activeTab === 'stakeholders' && 'Stakeholder Ledger'}
              {activeTab === 'certificates' && 'Credibility Credentials'}
            </h1>
          </div>
          <div className="header-meta">
            {org && (
              <span className="user-name" style={{ fontSize: '1.1rem', color: 'var(--primary-accent)' }}>
                {org.name}
              </span>
            )}
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
