import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'

const METHOD_LABEL: Record<string, string> = {
  gcash: 'GCash',
  sb: 'Security Bank',
  cash: 'Cash',
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function refNumber() {
  return 'MNU-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

const ref = refNumber()
const issuedAt = formatDate(new Date())

export default function InvoicePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const amount = searchParams.get('amount')
  const method = searchParams.get('method')

  if (!amount || !method || !METHOD_LABEL[method]) return <Navigate to="/" replace />

  return (
    <div className="section">
      <div className="invoice">
        <div className="invoice-header">
          <div className="invoice-eyebrow">Receipt</div>
          <div className="invoice-ref">{ref}</div>
        </div>

        <div className="invoice-status">
          <div className="invoice-status-dot" />
          <span>Payment Submitted</span>
        </div>

        <div className="invoice-rows">
          <div className="invoice-row">
            <span className="invoice-label">Pay to</span>
            <span className="invoice-value">Manu</span>
          </div>
          <div className="invoice-row">
            <span className="invoice-label">Payment Method</span>
            <span className="invoice-value">{METHOD_LABEL[method]}</span>
          </div>
          <div className="invoice-row">
            <span className="invoice-label">Issued</span>
            <span className="invoice-value">{issuedAt}</span>
          </div>
          <div className="invoice-divider" />
          <div className="invoice-row invoice-row--total">
            <span className="invoice-label">Amount</span>
            <span className="invoice-total">PHP {amount}</span>
          </div>
        </div>

        <div className="invoice-note">
          Manu will verify your payment shortly. Keep this reference number for your records.
        </div>

        <button className="main" style={{ marginTop: 8 }} onClick={() => navigate('/')}>
          Done
        </button>
      </div>
    </div>
  )
}
