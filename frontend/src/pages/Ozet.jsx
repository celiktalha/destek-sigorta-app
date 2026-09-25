import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { usePolice } from '../context/PoliceContext'
import './Ozet.css'

// Backend'de "indirimsiz orijinal fiyat" alanı yok, Teklif sayfasıyla tutarlı mock hesaplama
const mockOrijinalFiyat = (pirim) => pirim / 0.91

function formatTL(sayi) {
    return sayi.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'
}

// Poliçe henüz oluşturulmadığı için tarihler burada sadece ÖNİZLEME amaçlı mock üretiliyor.
// Gerçek BasTarih/BitTarih, POST /api/Police çağrıldığında backend tarafından kesin olarak hesaplanır.
function tarihOnizleme() {
    const bugun = new Date()
    const birYilSonra = new Date()
    birYilSonra.setFullYear(bugun.getFullYear() + 1)
    const formatla = (d) => d.toLocaleDateString('tr-TR')
    return { baslangic: formatla(bugun), bitis: formatla(birYilSonra) }
}

function maskeliIsim(ad, soyad) {
    if (!ad || !soyad) return '-'
    return `${ad[0]}${'*'.repeat(14)}${soyad[soyad.length - 1]}`
}

function Ozet() {
    const navigate = useNavigate()
    const { policeVerisi } = usePolice()

    const [sozlesmeOnay, setSozlesmeOnay] = useState(false)
    const [bilgilendirmeOnay, setBilgilendirmeOnay] = useState(false)
    const [kartSaklamaOnay, setKartSaklamaOnay] = useState(false)

    const { baslangic, bitis } = tarihOnizleme()
    const orijinalFiyat = mockOrijinalFiyat(policeVerisi.pirim)

    const tumOnaylarTamam = sozlesmeOnay && bilgilendirmeOnay && kartSaklamaOnay

    const onlineSatinAl = () => {
        if (!tumOnaylarTamam) return
        // Bir sonraki ekran: Kişisel Veri İzinleri / Sağlık Beyanı
        // Asıl POST /api/Police çağrısı orada, sağlık beyanı onaylanınca yapılacak
        navigate('/saglik-beyani')
    }

    return (
        <>
            <Header />

            <div className="kampanya-banner">
                🎁 Hemen online satın al, 2.000 TL'ye varan hediye çeki kazan!
                <div className="kampanya-alt">(Kampanya sadece yeni poliçeler için geçerlidir)</div>
            </div>

            <div className="adim-gostergesi">
                {['Genel Bilgiler', 'Teklif', 'Destek ve Özet', 'Ödeme', 'Sonuç'].map((ad, i) => (
                    <span key={ad} className={`adim ${i === 2 ? 'aktif' : ''} ${i < 2 ? 'tamam' : ''}`}>
                        {ad}
                    </span>
                ))}
            </div>

            <div className="ozet-icerik">
                <p className="ozet-aciklama">
                    Size özel hazırladığımız teklifi ve poliçenizin kapsamını görüntüleyebilirsiniz
                </p>

                <h3 className="teklif-baslik">Size Özel Teklifimiz</h3>
                <div className="fiyat-blok">
                    <div className="eski-fiyat">{formatTL(orijinalFiyat)}</div>
                    <div className="guncel-fiyat">{formatTL(policeVerisi.pirim)}</div>
                </div>

                <div className="ozet-kart">
                    <h4 className="kart-baslik">Bilgi Özeti</h4>
                    <div className="ozet-satir">
                        <span className="ozet-label">Poliçe Sahibi:</span>
                        <span className="ozet-deger">{maskeliIsim(policeVerisi.ad, policeVerisi.soyad)}</span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Ürün Adı:</span>
                        <span className="ozet-deger">Destek Sigorta Tamamlayıcı Sağlık Sigortası</span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Network:</span>
                        <span className="ozet-deger">
                            {policeVerisi.networkKod === 'TURKUAZ' && 'Turkuaz Network'}
                            {policeVerisi.networkKod === 'TURUNCU' && 'Turuncu Network'}
                            {policeVerisi.networkKod === 'KIRMIZI' && 'Kırmızı Network'}
                        </span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Paket İsmi:</span>
                        <span className="ozet-deger">{policeVerisi.teminatAd}</span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Ek Teminat:</span>
                        <span className="ozet-deger">-</span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Poliçe Başlangıç:</span>
                        <span className="ozet-deger">{baslangic}</span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Poliçe Bitiş:</span>
                        <span className="ozet-deger">{bitis}</span>
                    </div>

                    <h4 className="kart-baslik kart-baslik-ikinci">Kişisel Bilgiler</h4>
                    <div className="ozet-satir">
                        <span className="ozet-label">Sigortalı Bilgileri</span>
                    </div>
                    <div className="ozet-satir">
                        <span className="ozet-label">Poliçe Sahibi:</span>
                        <span className="ozet-deger">{maskeliIsim(policeVerisi.ad, policeVerisi.soyad)}</span>
                    </div>
                </div>

                <button className="geri-link" onClick={() => navigate('/teklif')}>← Geri Dön</button>

                <div className="onaylar-blok">
                    <div className="onay-satiri">
                        <input type="checkbox" checked={sozlesmeOnay} onChange={(e) => setSozlesmeOnay(e.target.checked)} />
                        <span><a href="#">Mesafeli Satış Sözleşmesi'ni</a> okudum, onaylıyorum. *</span>
                    </div>
                    <div className="onay-satiri">
                        <input type="checkbox" checked={bilgilendirmeOnay} onChange={(e) => setBilgilendirmeOnay(e.target.checked)} />
                        <span><a href="#">Bilgilendirme formunu</a> okudum ve onaylıyorum. *</span>
                    </div>
                    <div className="onay-satiri">
                        <input type="checkbox" checked={kartSaklamaOnay} onChange={(e) => setKartSaklamaOnay(e.target.checked)} />
                        <span>
                            Poliçemin otomatik yenilenmesine ve yenilenecek poliçenin tahsilatı için{' '}
                            <a href="#">kredi kartı bilgilerimin saklanmasına</a> onay veriyorum. *
                        </span>
                    </div>
                </div>

                <div className="buton-grubu">
                    <button className="ara-buton">📞 Sizi Arayalım</button>
                    <button className="satin-al-buton" onClick={onlineSatinAl} disabled={!tumOnaylarTamam}>
                        💳 ONLİNE SATIN AL
                    </button>
                </div>
            </div>
        </>
    )
}

export default Ozet