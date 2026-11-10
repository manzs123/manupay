import adImg from '../assets/ad.jpg'

export default function ProcessingPage() {
  const handleReturn = () => {
    window.location.href = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1yPSauJ-G6uOTTPc3jFOTeyPtJHIZal7hg&s'
  }

  return (
    <>
      <div id="ld" className="loader">
        <img className="ad" src={adImg} alt="Advertisement" />
        <div className="sub" style={{ textAlign: 'center', maxWidth: 480 }}>
          We understand that ads can sometimes be a bit intrusive, but they play a crucial role in supporting the content and services we provide.
          <br /><br />Your support means the world to us. Thank you for your understanding and support! Please wait while we process your payment.
        </div>
        <div className="loading-container">
          <div className="loading-bar" />
        </div>
      </div>

      <div className="section">
        <div className="status">
          <div className="enter-eyebrow">Payment Received</div>
          <div className="heading">Your payment is being verified.</div>
          <div className="par" style={{ color: 'var(--text-secondary)' }}>
            Thank you for your payment. Your payment, paid to Manu, is currently being verified by Manu. If you have other questions please keep it to yourself. We assure you that your funds are safe.
          </div>
          <button onClick={handleReturn} className="main" style={{ marginTop: '8px', maxWidth: 320 }}>
            RETURN TO WHENCE YOU CAME
          </button>
        </div>
      </div>
    </>
  )
}
