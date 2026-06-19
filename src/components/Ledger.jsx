import { ArrowDownLeft, ArrowUpRight, Cpu } from 'lucide-react';

export default function Ledger() {
  const transactions = [];

  return (
    <div className="card ledger-card">
      <div className="ledger-header">
        <h2>Recent Activity</h2>
        <button className="btn-text">View All</button>
      </div>

      <div className="table-responsive">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date / Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div className="tx-type">
                      <div className={`tx-icon ${tx.iconBg}`}>
                        {tx.icon}
                      </div>
                      <span>{tx.type}</span>
                    </div>
                  </td>
                  <td>
                    <div className={`tx-amount ${tx.amount.startsWith('+') ? 'text-green' : ''}`}>
                      {tx.amount}
                    </div>
                    <div className="tx-amount-usd text-muted">
                      {tx.amountUsd}
                    </div>
                  </td>
                  <td className="text-muted">{tx.date}</td>
                  <td>
                    <span className={`badge-${tx.status.toLowerCase()}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted" style={{ padding: '3rem 1rem' }}>
                  No transactions yet. Fund your account to start mining!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
