import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { usePolice } from '../context/PoliceContext'
import { policeOlustur } from '../api/api'
import './SaglikBeyani.css'

function SaglikBeyani() {
    const navigate = useNavigate()
    const { policeVerisi, setPoliceVerisi } = usePolice()

    const [secim, setSecim] = useState('saglikli') // 'saglikli' | 'aranmak'
    const [hataMesaji, setHataMesaji] = useState('')
    const [yukleniyor, setYukleniyor] = useState(false)

    const onaylama = () => {
        navigate('/teklif')
    }

    const onayla = async () => {
        setHataMesaji('')
        setYukleniyor(true)
        try {
            const requestBody = {
                sigortaNo: policeVerisi.musteriNo,
                sigEttirenNo: policeVerisi.musteriNo,
                teminatKod: policeVerisi.teminatKod,
                beyanOnay: true,
            }
            const response = await policeOlustur(requestBody)

            // Poliçe sonucunu Context'e yazıyoruz, Ödeme sayfası buradan okuyacak
            setPoliceVerisi((onceki) => ({ ...onceki, policeOzet: response }))

            navigate('/odeme')
        } catch (err) {
            setHataMesaji(err.message)
        } finally {
            setYukleniyor(false)
        }
    }

    return (
        <>
            <Header />

            <div className="adim-gostergesi">
                {['Genel Bilgiler', 'Teklif', 'Destek ve Özet', 'Ödeme', 'Sonuç'].map((ad, i) => (
                    <span key={ad} className={`adim ${i === 2 ? 'aktif' : ''} ${i < 2 ? 'tamam' : ''}`}>
                        {ad}
                    </span>
                ))}
            </div>

            <div className="beyan-icerik">
                <div className="beyan-baslik-blok">
                    <h3>Kişisel Veri İzinleri</h3>
                </div>

                <div className="beyan-kart">
                    <h4>Sağlık Beyanı</h4>

                    <label className="beyan-secenek">
                        <input
                            type="radio"
                            name="saglikBeyani"
                            checked={secim === 'saglikli'}
                            onChange={() => setSecim('saglikli')}
                        />
                        <span>
                            <strong>Sağlıklı olduğumu beyan ederim:</strong> Daha önce bir sağlık şikayetim/rahatsızlığım olmadı.
                            Şu anda bir sağlık şikayetim/rahatsızlığım bulunmuyor. Sonucunda takip ya da kontrol önerilen bir tetkikim olmadı.
                        </span>
                    </label>

                    <label className="beyan-secenek">
                        <input
                            type="radio"
                            name="saglikBeyani"
                            checked={secim === 'aranmak'}
                            onChange={() => setSecim('aranmak')}
                        />
                        <span>
                            <strong>Sağlık beyanı için aranmak istiyorum:</strong> Daha önce bir sağlık şikayetim/rahatsızlığım oldu.
                            Şu anda bir sağlık şikayetim/rahatsızlığım devam ediyor. Bir sağlık şikayetimin olup olmadığından emin değilim.
                        </span>
                    </label>

                    {hataMesaji && <p className="hata-mesaji">{hataMesaji}</p>}

                    <div className="beyan-buton-grubu">
                        <button className="onaylamiyorum-buton" onClick={onaylama} disabled={yukleniyor}>
                            ONAYLAMIYORUM
                        </button>
                        <button className="onayliyorum-buton" onClick={onayla} disabled={yukleniyor}>
                            {yukleniyor ? 'İŞLENİYOR...' : 'ONAYLIYORUM'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaglikBeyani