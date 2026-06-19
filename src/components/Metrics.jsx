import { TrendingUp, Activity, DollarSign, Bitcoin } from 'lucide-react';

export default function Metrics() {
  return (
    <div className="dashboard-grid">
      {/* Card A: Total Funded */}
      <div className="card metric-card">
        <div className="metric-header">
          <div className="metric-icon-wrapper">
            <DollarSign size={20} className="text-primary" />
          </div>
          <h3 className="metric-title">Total Funded</h3>
        </div>
        <div className="metric-content">
          <div className="metric-value">$0.00</div>
          <div className="metric-subvalue">
            <Bitcoin size={14} /> 0.0000 BTC
          </div>
        </div>
      </div>

      {/* Card B: Mining Earnings */}
      <div className="card metric-card">
        <div className="metric-header">
          <div className="metric-icon-wrapper bg-green-light">
            <TrendingUp size={20} className="text-green" />
          </div>
          <h3 className="metric-title">Mining Earnings</h3>
        </div>
        <div className="metric-content">
          <div className="metric-value text-green">$0.00</div>
          <div className="metric-badges">
            <span className="badge-success">
              <TrendingUp size={12} /> +0.0% today
            </span>
          </div>
        </div>
      </div>

      {/* Card C: Active Hashrate */}
      <div className="card metric-card">
        <div className="metric-header">
          <div className="metric-icon-wrapper bg-amber-light">
            <Activity size={20} className="text-amber" />
          </div>
          <h3 className="metric-title">Active Hashrate</h3>
        </div>
        <div className="metric-content">
          <div className="metric-value">0.0 TH/s</div>
          <div className="metric-status text-muted">
            <span className="status-dot"></span>
            Pending Deposit
          </div>
        </div>
      </div>
    </div>
  );
}
