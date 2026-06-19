import { useState } from 'react';
import { X, ArrowUpRight, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function WithdrawalModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('');
  const [speed, setSpeed] = useState('medium');
  const [error, setError] = useState('');
  const availableBalance = 0.000; // BTC

  if (!isOpen) return null;

  const handleMax = () => setAmount(availableBalance.toString());

  const handleWithdraw = () => {
    setError('This investment has not yet reached its agreed maturity period. Funds can only be withdrawn once the lock-in term is complete.');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <div className="modal-header">
          <h2>Withdraw Earnings</h2>
          <button className="icon-btn close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Target Bitcoin Address</label>
            <input 
              type="text" 
              placeholder="Paste destination BTC address" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <div className="flex-between">
              <label>Amount to Withdraw (BTC)</label>
              <span className="available-text">Available: {availableBalance} BTC</span>
            </div>
            <div className="input-group">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" 
                className="form-input amount-input"
              />
              <button className="btn-max" onClick={handleMax}>Max</button>
            </div>
          </div>

          <div className="form-group speed-group">
            <label>Transaction Speed</label>
            <div className="speed-slider-container">
              <input 
                type="range" 
                min="1" 
                max="3" 
                value={speed === 'slow' ? 1 : speed === 'medium' ? 2 : 3}
                onChange={(e) => {
                  const val = e.target.value;
                  setSpeed(val === '1' ? 'slow' : val === '2' ? 'medium' : 'fast');
                }}
                className="speed-slider"
              />
              <div className="speed-labels">
                <span className={speed === 'slow' ? 'active text-muted' : 'text-muted'}>
                  <Clock size={14} /> Slow (12h)
                </span>
                <span className={speed === 'medium' ? 'active text-primary' : 'text-muted'}>
                  <ShieldCheck size={14} /> Medium (2h)
                </span>
                <span className={speed === 'fast' ? 'active text-amber' : 'text-muted'}>
                  <Zap size={14} /> Fast (10m)
                </span>
              </div>
              <div className="fee-estimate">
                Estimated Gas Fee: 
                <span className="fee-amount">
                  {speed === 'slow' ? '~0.00005 BTC' : speed === 'medium' ? '~0.00012 BTC' : '~0.00035 BTC'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <span className="warning-icon bg-red">!</span>
            {error}
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary w-full" onClick={handleWithdraw}>
            <ArrowUpRight size={18} /> Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}
