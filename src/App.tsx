import { Routes, Route } from 'react-router-dom'
import EnterAmountPage from './pages/EnterAmountPage'
import PaymentPage from './pages/PaymentPage'
import ProcessingPage from './pages/ProcessingPage'
import InvoicePage from './pages/InvoicePage'
import FailedPage from './pages/FailedPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EnterAmountPage />} />
      <Route path="/pay" element={<PaymentPage />} />
      <Route path="/processing" element={<ProcessingPage />} />
      <Route path="/invoice" element={<InvoicePage />} />
      <Route path="/failed" element={<FailedPage />} />
    </Routes>
  )
}
