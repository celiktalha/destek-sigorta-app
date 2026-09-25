import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PoliceProvider } from './context/PoliceContext'
import HomePage from './pages/HomePage'
import TamamlayiciSaglikSigortasi from './pages/TamamlayiciSaglikSigortasi'
import GenelBilgiler from './pages/GenelBilgiler'
import Teklif from './pages/Teklif'
import Ozet from './pages/Ozet'
import SaglikBeyani from './pages/SaglikBeyani'
import OdemePage from './pages/OdemePage'

function App() {
  return (
    <BrowserRouter>
      <PoliceProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tamamlayici-saglik-sigortasi" element={<TamamlayiciSaglikSigortasi />} />
          <Route path="/genel-bilgiler" element={<GenelBilgiler />} />
          <Route path="/teklif" element={<Teklif />} />
          <Route path="/ozet" element={<Ozet />} />
          <Route path="/saglik-beyani" element={<SaglikBeyani />} />
          <Route path="/odeme" element={<OdemePage />} />
        </Routes>
      </PoliceProvider>
    </BrowserRouter>
  )
}

export default App