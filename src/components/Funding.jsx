import { useState } from 'react';

import { Copy, CheckCircle2 } from 'lucide-react';

export default function Funding() {
  const [copied, setCopied] = useState(false);
  const btcAddress = "bc1qgqfy4gdsncwdzjdyfwtp2cls04dl7mstfa8ee4";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(btcAddress);
      } else {
        // Fallback for phones accessing via local IP (non-HTTPS)
        const textArea = document.createElement("textarea");
        textArea.value = btcAddress;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error("Fallback copy failed", error);
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="card funding-card">
      <div className="funding-header">
        <h2>Fund Your Mining Account</h2>
        <p className="text-muted">Deposit Bitcoin to automatically increase your mining hashrate.</p>
      </div>

      <div className="funding-content">
        <div className="qr-container">
          <div className="qr-wrapper">
            <img src="/qr-code.jpg" alt="Bitcoin QR Code" width="160" height="160" className="qr-image" />
          </div>
        </div>

        <div className="address-section">
          <label className="input-label">Your Unique Bitcoin Deposit Address</label>
          <div className="input-group">
            <input 
              type="text" 
              readOnly 
              value={btcAddress} 
              className="address-input"
            />
            <button 
              className={`btn-copy ${copied ? 'copied' : ''}`} 
              onClick={handleCopy}
              aria-label="Copy Address"
            >
              {copied ? <CheckCircle2 size={18} className="text-green" /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy Address'}</span>
            </button>
          </div>
          <div className="funding-warning">
            <span className="warning-icon">!</span>
            Send only Bitcoin (BTC) to this address. Other assets will be lost.
          </div>
        </div>
      </div>
    </div>
  );
}
