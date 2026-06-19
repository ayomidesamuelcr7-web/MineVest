import { useState } from 'react';
import Header from '../components/Header';
import Metrics from '../components/Metrics';
import Funding from '../components/Funding';
import WithdrawalModal from '../components/WithdrawalModal';
import Ledger from '../components/Ledger';

export default function Dashboard() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Header />
      
      <main className="container">
        <Metrics />

        <div className="main-content">
          <div className="left-column">
            <Ledger />
          </div>
          
          <div className="right-column">
            <Funding />
            
            <div className="action-area card">
              <h2>Ready to cash out?</h2>
              <p className="text-muted mb-4">Transfer your mining earnings to your external Bitcoin wallet safely and securely.</p>
              <button 
                className="btn-primary btn-lg w-full"
                onClick={() => setIsWithdrawModalOpen(true)}
              >
                Withdraw Earnings
              </button>
            </div>
          </div>
        </div>
      </main>

      <WithdrawalModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
      />
    </div>
  );
}
