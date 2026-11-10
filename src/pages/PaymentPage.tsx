import { useState } from 'react'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import gcashImg from '../assets/gcash.png'
import securityBankImg from '../assets/securitybank.png'
import cashImg from '../assets/cash.png'
import gcashQrImg from '../assets/gcash_qr.jpg'
import copyImg from '../assets/copy.png'
import Toast from '../components/Toast'

type PaymentMethod = 'gcash' | 'sb' | 'cash' | null

const METHOD_LABEL: Record<NonNullable<PaymentMethod>, string> = {
  gcash: 'GCash',
  sb: 'Security Bank',
  cash: 'Cash',
}

export default function PaymentPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const amount = searchParams.get('amount')

  const [selected, setSelected] = useState<PaymentMethod>(null)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [instructionsOpen, setInstructionsOpen] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    const finish = () => {
      setToast(`${label} copied`)
      setTimeout(() => setToast(null), 1500)
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(finish).catch(() => fallbackCopy(text, finish))
    } else {
      fallbackCopy(text, finish)
    }
  }

  const fallbackCopy = (text: string, finish: () => void) => {
    const el = document.createElement('textarea')
    el.value = text
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    try { document.execCommand('copy'); finish() } catch {}
    document.body.removeChild(el)
  }

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method)
    setMobileDetailOpen(true)
  }

  if (!amount) return <Navigate to="/" replace />

  const detailContent = () => {
    if (selected === 'gcash') return (
      <>
        <div className="title">Pay via GCash</div>
        <div className="par">Scan the QR code below to pay.</div>
        <div className="imgs">
          <img src={gcashQrImg} alt="GCash QR Code" onClick={() => setQrOpen(true)} className="qr-thumb" />
        </div>
        <a href={gcashQrImg} download="gcash-qr.jpg" className="btn-download">
          ↓ Download QR
        </a>
      </>
    )
    if (selected === 'sb') return (
      <>
        <div className="title">Pay via Security Bank</div>
        <div className="data">
          <div className="copy-set">
            <div className="par" style={{ flex: 1 }}>
              <span className="data-label">Account Number</span>
              <br />0000043674748
            </div>
            <img className="iconbtn" onClick={() => copyToClipboard('0000043674748', 'Account number')} style={{ width: 18 }} src={copyImg} alt="Copy" />
          </div>
          <div className="copy-set">
            <div className="par" style={{ flex: 1 }}>
              <span className="data-label">Account Name</span>
              <br />Manuel Raphael Macayan
            </div>
            <img className="iconbtn" onClick={() => copyToClipboard('Manuel Raphael Macayan', 'Account name')} style={{ width: 18 }} src={copyImg} alt="Copy" />
          </div>
        </div>
        <div className="sub">Verify the details before sending the funds. Loss of funds due to incorrect details is not my problem anymore.</div>
      </>
    )
    if (selected === 'cash') return (
      <>
        <div className="title">Pay using Cash</div>
        <div className="par">Find Manu, then give the cash. If you can't find him, start a search operation.</div>
        <div className="sub">Note: There might be an additional handling fee when paying using cash.</div>
      </>
    )
    return null
  }

  const renderButtons = () => (
    <div className="btn-stack">
      <button className="main" onClick={() => navigate('/processing')}>I'VE PAID</button>
      <button className="secondary" onClick={() => setCancelOpen(true)}>No, I don't want to pay</button>
      <button className="tertiary change-amount-btn" onClick={() => navigate('/')}>← Change amount</button>
    </div>
  )

  return (
    <>
      <Toast message={toast} />

      {/* Cancel modal */}
      {cancelOpen && (
        <div className="modal">
          <div className="dialog">
            <div className="title">Are you sure you're not paying anymore?</div>
            <div className="par">You might have accidentally clicked it out of curiosity.</div>
            <div className="btn-hor">
              <button className="secondary" style={{ width: 'auto', padding: '10px 16px' }} onClick={() => navigate('/failed')}>
                Yes, I'm leaving
              </button>
              <button className="main" style={{ width: 'auto', padding: '10px 16px' }} onClick={() => setCancelOpen(false)}>
                GO BACK
              </button>
            </div>
          </div>
          <div className="modal-bg" onClick={() => setCancelOpen(false)} />
        </div>
      )}

      {/* QR image modal */}
      {qrOpen && (
        <div className="modal modal-qr" onClick={() => setQrOpen(false)}>
          <div className="qr-modal-img" onClick={e => e.stopPropagation()}>
            <button className="sheet-close qr-close" onClick={() => setQrOpen(false)}>✕</button>
            <img src={gcashQrImg} alt="GCash QR Code" />
          </div>
          <div className="modal-bg" />
        </div>
      )}

      {/* Mobile: payment detail bottom sheet */}
      <div className={`mobile-detail-overlay${mobileDetailOpen && selected ? ' open' : ''}`}>
        <div className="mobile-detail-sheet">
          <div className="sheet-handle" />
          <div className="sheet-header">
            <div className="title">{selected ? METHOD_LABEL[selected] : ''}</div>
            <button className="sheet-close" onClick={() => setMobileDetailOpen(false)}>✕</button>
          </div>
          {detailContent()}
        </div>
        <div className="modal-bg" onClick={() => setMobileDetailOpen(false)} />
      </div>

      <div className="section">
        {/* ── LEFT: narrow — payment info + method selection ── */}
        <div className="left">
          <div className="card">
            <div className="title">Payment Information</div>
            <div className="info-rows">
              <div className="info-row">
                <span className="info-label">Pay to</span>
                <span className="info-value">Manu</span>
              </div>
              <div className="info-row">
                <span className="info-label">Amount</span>
                <span className="info-value" style={{ color: 'var(--gold)', fontWeight: 700 }}>PHP {amount}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Method</span>
                <span className="info-value" style={{ color: selected ? 'var(--gold)' : 'var(--text-muted)' }}>
                  {selected ? METHOD_LABEL[selected] : '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="title">Select a Payment Method</div>
            <div className="button-set">
              <div onClick={() => handleSelect('gcash')} className={`btn-pm${selected === 'gcash' ? ' btn-pm--selected' : ''}`}>
                <div className="icon"><img src={gcashImg} alt="GCash" /></div>
                <div className="pm-text">
                  <div className="title">GCash</div>
                  <div className="par">Pay to a Gcash account.</div>
                  <div className="sub">Accepts all QR Ph supported QR codes.</div>
                </div>
              </div>

              <div onClick={() => handleSelect('sb')} className={`btn-pm${selected === 'sb' ? ' btn-pm--selected' : ''}`}>
                <div className="icon"><img src={securityBankImg} alt="Security Bank" /></div>
                <div className="pm-text">
                  <div className="title">Security Bank</div>
                  <div className="par">Pay to a Security Bank account.</div>
                  <div className="sub">Other banking apps can transfer to this account.</div>
                </div>
              </div>

              <div onClick={() => handleSelect('cash')} className={`btn-pm${selected === 'cash' ? ' btn-pm--selected' : ''}`}>
                <div className="icon"><img src={cashImg} alt="Cash" /></div>
                <div className="pm-text">
                  <div className="title">Cash</div>
                  <div className="par">Pay to me using real money.</div>
                  <div className="sub">Choose this and touch grass. You've been holed up in your area for quite some time already.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: wide — detail area + instructions + actions ── */}
        <div className="right">
          <div className="detail-area">
            {selected ? (
              <div className="card card-detail">{detailContent()}</div>
            ) : (
              <div className="detail-placeholder">
                <div className="placeholder-hint">Select a payment method to view details</div>
              </div>
            )}
          </div>

          <div className="instructions-actions">
            <div className="card">
              <button className="accordion-toggle" onClick={() => setInstructionsOpen(o => !o)}>
                <span className="par" style={{ fontWeight: 600 }}>Payment Instructions</span>
                <span className={`accordion-chevron${instructionsOpen ? ' open' : ''}`}>‹</span>
              </button>
              {instructionsOpen && (
                <div className="sub">
                  <ol>
                    <li>Select a payment method.</li>
                    <li>Follow the steps that open.</li>
                    <li>After payment, click the "I've Paid" button.</li>
                    <li>And, you're done with your payment.</li>
                  </ol>
                </div>
              )}
            </div>
            {renderButtons()}
          </div>
        </div>
      </div>

      {/* Mobile: fixed bottom sheet — buttons only */}
      <div className="mobile-bottom-sheet">
        {renderButtons()}
      </div>
    </>
  )
}
