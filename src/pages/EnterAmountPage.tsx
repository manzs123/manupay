import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EnterAmountPage() {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const val = parseInt(amount, 10)
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid amount.')
      return
    }
    navigate(`/pay?amount=${val}.00`)
  }

  return (
    <div className="section enter-section">
      <div className="card enter-card">
        <div>
          <div className="enter-eyebrow">Secure Payment</div>
          <div className="heading">Manu Pay</div>
          <div className="sub" style={{ marginTop: '6px' }}>Enter the amount you need to pay.</div>
        </div>

        <form onSubmit={handleSubmit} className="enter-form">
          <div className="form-field">
            <div className="field-label">Amount</div>
            <div className="input-wrapper">
              <span className="currency-prefix">PHP</span>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="0"
                value={amount}
                onChange={e => { setAmount(e.target.value); setError('') }}
                autoFocus
                required
                className="amount-input"
              />
            </div>
            {error && <div className="sub error-text">{error}</div>}
          </div>
          <button type="submit" className="main">CONTINUE TO PAYMENT</button>
        </form>
      </div>
    </div>
  )
}
