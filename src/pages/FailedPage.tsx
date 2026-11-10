export default function FailedPage() {
  const handleReturn = () => {
    window.location.href = 'https://i.pinimg.com/736x/a0/c6/20/a0c6206ea63e02d2c2ab3264acebd6f3.jpg'
  }

  return (
    <div className="section">
      <div className="status">
        <div className="heading">Are you happy?</div>
        <div className="par" style={{ color: 'var(--text-secondary)' }}>
          You came all the way here... and now, at this moment of truth, you choose not to pay anymore? What reason do you have? I implore you, share with me the torment behind this decision. Is it truly not enough for you? Or... is he not enough? Speak to me, I beg of you, unravel the agony that holds you. Don't leave me in this abyss of uncertainty! Why now, when we stand on the precipice of what could be? Is the weight of our journey too much for you to bear? Are his efforts, his sacrifices, lost on your heart?
          <br /><br />
          Please, don't condemn me to this silence. Pour out your soul, let the pain flow through your words. Is it the fear of the unknown, or the shadows of the past that have led you here? I am desperate to understand, to grasp the strands of your reasoning. Tell me, I beg you, why must this end in torment?
        </div>
        <button onClick={handleReturn} className="main" style={{ marginTop: '8px', maxWidth: 320 }}>
          RETURN TO WHENCE YOU CAME
        </button>
      </div>
    </div>
  )
}
