import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Bitcoin, Loader2, Globe, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nationality: '',
    gender: 'Male'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    // We can also pass the user's name to user_metadata
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          nationality: formData.nationality,
          gender: formData.gender,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess('Account created! Please check your email to verify your account before signing in.');
      setLoading(false);
      // Optional: clear form data here
      setFormData({ name: '', email: '', password: '', confirmPassword: '', nationality: '', gender: 'Male' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Bitcoin size={40} className="text-accent-primary" />
          </div>
          <h2>Create Account</h2>
          <p className="text-muted">Start earning Bitcoin today</p>
        </div>

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-group-auth">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                name="name"
                className="auth-input" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nationality</label>
            <div className="input-group-auth">
              <Globe size={18} className="input-icon" />
              <input 
                type="text" 
                name="nationality"
                className="auth-input" 
                placeholder="e.g. United States"
                list="countries"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
              <datalist id="countries">
                <option value="United States" />
                <option value="United Kingdom" />
                <option value="Canada" />
                <option value="Australia" />
                <option value="Nigeria" />
                <option value="South Africa" />
                <option value="India" />
                <option value="Germany" />
                <option value="France" />
                <option value="Japan" />
                <option value="Brazil" />
                <option value="Mexico" />
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="input-group-auth">
              <Users size={18} className="input-icon" />
              <select 
                name="gender" 
                className="auth-input" 
                value={formData.gender}
                onChange={handleChange}
                required
                style={{ appearance: 'none', backgroundColor: 'transparent' }}
              >
                <option value="Male" style={{ color: '#0f172a', backgroundColor: '#ffffff' }}>Male</option>
                <option value="Female" style={{ color: '#0f172a', backgroundColor: '#ffffff' }}>Female</option>
                <option value="Other" style={{ color: '#0f172a', backgroundColor: '#ffffff' }}>Other</option>
                <option value="Prefer not to say" style={{ color: '#0f172a', backgroundColor: '#ffffff' }}>Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-group-auth">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                name="email"
                className="auth-input" 
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group-auth">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                name="password"
                className="auth-input" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-group-auth">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                name="confirmPassword"
                className="auth-input" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full btn-lg auth-submit" disabled={loading}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          {error && (
            <div className="error-alert" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              <span className="warning-icon bg-red">!</span>
              {error}
            </div>
          )}
          {success && (
            <div className="error-alert" style={{ marginTop: '0.5rem', marginBottom: 0, backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', color: '#059669' }}>
              <span className="warning-icon bg-green">✓</span>
              {success}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/" className="text-accent-primary">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
