import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { usePolice } from '../context/PoliceContext'
import { odemeYap } from '../api/api'
import './OdemePage.css'

function formatTL(sayi) {
    return sayi.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'
}

function OdemePage() {
    const navigate = useNavigate()
    const { policeVerisi } = usePolice()

    const [kartSahibi, setKartSahibi] = useState('')
    const [kartTC, setKartTC] = useState('')
    const [kartNo, setKartNo] = useState('')
    const [ay, setAy] = useState('')
    const [yil, setYil] = useState('')
    const [cvc, setCvc] = useState('')
    const [odemeTipi, setOdemeTipi] = useState('1')
    const [kartimiKaydet, setKartimiKaydet] = useState(false)

    const [hatalar, setHatalar] = useState({})
    const [genelHata, setGenelHata] = useState('')
    const [yukleniyor, setYukleniyor] = useState(false)
    const [odemeSonucu, setOdemeSonucu] = useState(null)

    const formuDogrula = () => {
        const yeniHatalar = {}
        if (!kartSahibi.trim()) yeniHatalar.kartSahibi = 'Kart sahibi adı zorunludur.'
        if (!kartTC.trim() || kartTC.length !== 11) yeniHatalar.kartTC = 'Geçerli bir TC kimlik no giriniz.'
        if (!kartNo.trim() || kartNo.replace(/\s/g, '').length !== 16) yeniHatalar.kartNo = 'Kart numarası 16 haneli olmalıdır.'
        if (!ay || !yil) yeniHatalar.sonKullanma = 'Son kullanma tarihi zorunludur.'
        if (!cvc.trim() || cvc.length !== 3) yeniHatalar.cvc = 'Güvenlik kodu 3 haneli olmalıdır.'
        setHatalar(yeniHatalar)
        return Object.keys(yeniHatalar).length === 0
    }

    const odemeGonder = async () => {
        setGenelHata('')

        if (!formuDogrula()) return

        if (!policeVerisi.policeOzet || !policeVerisi.policeOzet.policeNo) {
            setGenelHata('Poliçe bilgisi bulunamadı, lütfen baştan başlayın.')
            return
        }

        setYukleniyor(true)
        const kulTarih = `${yil}-${ay.padStart(2, '0')}-01T00:00:00`

        try {
            const odemeOzet = await odemeYap({
                policeNo: policeVerisi.policeOzet.policeNo,
                kartNo: kartNo.replace(/\s/g, ''),
                kulTarih,
                cvc,
                taksitSayisi: Number(odemeTipi),
            })
            setOdemeSonucu(odemeOzet)
        } catch (err) {
            setGenelHata(err.message)
        } finally {
            setYukleniyor(false)
        }
    }

    // ─── Ödeme başarılıysa Sonuç ekranını göster ───
    if (odemeSonucu) {
        return (
            <>
                <Header />
                <div className="odeme-icerik">
                    <div className="sonuc-kart">
                        <h2 className="sonuc-baslik">✓ Ödeme Başarılı</h2>
                        <div className="sonuc-satir"><span>Müşteri:</span><span>{odemeSonucu.musteriAdSoyad}</span></div>
                        <div className="sonuc-satir"><span>Ürün:</span><span>{odemeSonucu.teminatAd}</span></div>
                        <div className="sonuc-satir"><span>Ödenen Tutar:</span><span>{formatTL(odemeSonucu.odenenTutar)}</span></div>
                        <div className="sonuc-satir"><span>Taksit Sayısı:</span><span>{odemeSonucu.taksitSayisi}</span></div>
                        <div className="sonuc-satir"><span>Poliçe Başlangıç:</span><span>{new Date(odemeSonucu.policeBasTarih).toLocaleDateString('tr-TR')}</span></div>
                        <div className="sonuc-satir"><span>Poliçe Bitiş:</span><span>{new Date(odemeSonucu.policeBitTarih).toLocaleDateString('tr-TR')}</span></div>
                        <button className="ana-sayfa-buton" onClick={() => navigate('/')}>Ana Sayfaya Dön</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />

            <div className="adim-gostergesi">
                {['Genel Bilgiler', 'Teklif', 'Destek ve Özet', 'Ödeme', 'Sonuç'].map((ad, i) => (
                    <span key={ad} className={`adim ${i === 3 ? 'aktif' : ''} ${i < 3 ? 'tamam' : ''}`}>
                        {ad}
                    </span>
                ))}
            </div>

            <div className="odeme-icerik">
                <p className="odenecek-tutar">
                    Ödenecek Tutar: <strong>{formatTL(policeVerisi.pirim)}</strong>
                </p>

                <div className="kart-formu">
                    <h3 className="form-baslik">Kredi Kartı Bilgileri</h3>

                    <p className="bilgi-notu">
                        ⓘ Ürünün otomatik yenileme talimatı olması sebebiyle, sigorta ettiren ve sigortalı olarak kendinize ait kredi kartı girmenizi tavsiye ederiz.
                    </p>

                    <div className="form-alan">
                        <input value={kartSahibi} onChange={(e) => setKartSahibi(e.target.value)} placeholder=" " />
                        <label>Kart Sahibi Ad Soyad</label>
                    </div>
                    {hatalar.kartSahibi && <span className="hata-mini">{hatalar.kartSahibi}</span>}

                    <div className="form-alan">
                        <input value={kartTC} onChange={(e) => setKartTC(e.target.value)} maxLength={11} placeholder=" " />
                        <label>Kart Sahibi TC Kimlik Numarası</label>
                    </div>
                    {hatalar.kartTC && <span className="hata-mini">{hatalar.kartTC}</span>}

                    <div className="form-alan">
                        <input value={kartNo} onChange={(e) => setKartNo(e.target.value)} maxLength={16} placeholder=" " />
                        <label>Kredi Kartı Numarası</label>
                    </div>
                    {hatalar.kartNo && <span className="hata-mini">{hatalar.kartNo}</span>}

                    <div className="satir-grup">
                        <div className="secim-alan">
                            <label>Ay</label>
                            <select value={ay} onChange={(e) => setAy(e.target.value)}>
                                <option value="">Ay</option>
                                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div className="secim-alan">
                            <label>Yıl</label>
                            <select value={yil} onChange={(e) => setYil(e.target.value)}>
                                <option value="">Yıl</option>
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {hatalar.sonKullanma && <span className="hata-mini">{hatalar.sonKullanma}</span>}

                    <div className="satir-grup">
                        <div className="form-alan form-alan-kucuk">
                            <input value={cvc} onChange={(e) => setCvc(e.target.value)} maxLength={3} placeholder=" " />
                            <label>Güvenlik Kodu</label>
                        </div>

                        <div className="secim-alan">
                            <label>Ödeme Tipi</label>
                            <select value={odemeTipi} onChange={(e) => setOdemeTipi(e.target.value)}>
                                <option value="1">Peşin Ödeme</option>
                                <option value="3">3 Taksit</option>
                                <option value="6">6 Taksit</option>
                                <option value="9">9 Taksit</option>
                                <option value="12">12 Taksit</option>
                            </select>
                        </div>
                    </div>
                    {hatalar.cvc && <span className="hata-mini">{hatalar.cvc}</span>}

                    <label className="kartimi-kaydet">
                        <input type="checkbox" checked={kartimiKaydet} onChange={(e) => setKartimiKaydet(e.target.checked)} />
                        <span>Kartımı Kaydet</span>
                    </label>
                    <p className="masterpass-not">
                        Masterpass <a href="#">Kullanım koşullarını</a> okudum, kart bilgilerimi MasterCard altyapısında saklamak ve kayıtlı kartlarım arasında görmek istiyorum.
                    </p>

                    <div className="masterpass-logo">Masterpass</div>

                    <p className="masterpass-guvence">
                        Kredi kartı bilgileriniz Mastercard'ın kart saklama altyapısı olan <a href="#">Masterpass</a>'te güvenle tutulmaktadır.
                    </p>

                    {genelHata && <p className="hata-mini genel">{genelHata}</p>}

                    <button className="odeme-yap-buton" onClick={odemeGonder} disabled={yukleniyor}>
                        {yukleniyor ? 'İŞLENİYOR...' : 'ÖDEME YAP'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default OdemePage