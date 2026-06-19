import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const navigate = useNavigate();
  const [initials, setInitials] = useState('U');
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserData({
          email: user.email,
          fullName: user.user_metadata?.full_name || 'Anonymous',
          nationality: user.user_metadata?.nationality || 'Not provided',
          gender: user.user_metadata?.gender || 'Not provided'
        });
        
        if (user.user_metadata?.full_name) {
          const name = user.user_metadata.full_name.trim();
          const parts = name.split(' ');
          if (parts.length > 1) {
            setInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase());
          } else if (name.length > 0) {
            setInitials(name.substring(0, 2).toUpperCase());
          }
        }
      }
    };
    fetchUser();
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  return (
    <header className="header">
      <div className="container header-content">
        <div className="brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
          </div>
          <h1>MineVest</h1>
        </div>

        <div className="header-actions">
          <div className="wallet-status">
            <span className="status-dot"></span>
            <span className="balance-label">Unified Balance</span>
            <span className="balance-amount">$0.00</span>
          </div>
          <div className="user-profile" ref={dropdownRef} style={{ position: 'relative' }}>
            <div 
              className="avatar" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ cursor: 'pointer' }}
            >
              {initials}
            </div>
            
            {isDropdownOpen && userData && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <strong>{userData.fullName}</strong>
                  <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block' }}>{userData.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item">
                  <span className="text-muted">Nationality:</span> {userData.nationality}
                </div>
                <div className="dropdown-item">
                  <span className="text-muted">Gender:</span> {userData.gender}
                </div>
              </div>
            )}
          </div>
          
          <button className="icon-btn text-muted" onClick={handleSignOut} title="Sign Out" style={{ marginLeft: '0.5rem' }}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
