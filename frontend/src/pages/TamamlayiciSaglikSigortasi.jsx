import { useNavigate } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import './TamamlayiciSaglikSigortasi.css'
import tssHeroGorsel from '../assets/tss-hero-gorsel.jpg'

const ozellikler = [
    { ikon: '🏥', baslik: 'Geniş Anlaşmalı Kurum Ağı', aciklama: 'Türkiye genelinde binlerce anlaşmalı hastane ve sağlık kuruluşundan faydalanın.' },
    { ikon: '💊', baslik: 'Ayakta ve Yatarak Tedavi', aciklama: 'Muayene, tahlil, ilaç ve ameliyat masraflarınız kapsam dahilinde güvence altında.' },
    { ikon: '⚡', baslik: 'Hızlı Onay Süreci', aciklama: 'Online başvuru ile dakikalar içinde teklif alın, aynı gün poliçenizi oluşturun.' },
    { ikon: '👨‍👩‍👧', baslik: 'Aile Güvencesi', aciklama: 'Kendiniz ve çocuklarınız için esnek paket seçenekleriyle kapsamlı koruma sağlayın.' },
]

const networkler = [
    { ad: 'Turkuaz Network', aciklama: 'Temel düzeyde geniş kapsamlı sağlık güvencesi.' },
    { ad: 'Turuncu Network', aciklama: 'Orta seviye kapsam, daha yüksek limitler.' },
    { ad: 'Kırmızı Network', aciklama: 'En kapsamlı koruma, sınırsız hizmet seçenekleri.' },
]

function TamamlayiciSaglikSigortasi() {
    const navigate = useNavigate()

    return (
        <>
            <SiteHeader />

            <div className="tss-hero">
                <img
                    className="tss-hero-gorsel"
                    src={tssHeroGorsel}
                    alt="Sağlık sigortası"
                />
                <div className="tss-hero-band"></div>
                <div className="tss-hero-kutu">
                    <div className="tss-etiket">ÖZEL SAĞLIK SİGORTALARI</div>
                    <h1>Tamamlayıcı Sağlık Sigortası</h1>
                    <p>
                        SGK'lı olan herkesin özel hastanelerden düşük katkı payı ile faydalanmasını
                        sağlayan, sağlığınızı güvence altına alan kapsamlı bir sigorta ürünü.
                    </p>
                    <button className="hemen-teklif-buton" onClick={() => navigate('/genel-bilgiler')}>
                        💳 Hemen Online Teklif Al
                    </button>
                </div>
            </div>

            <div className="tss-icerik">
                <h2 className="tss-bolum-baslik">Neden Tamamlayıcı Sağlık Sigortası?</h2>
                <div className="ozellik-grid">
                    {ozellikler.map((o) => (
                        <div key={o.baslik} className="ozellik-kart">
                            <div className="ozellik-ikon">{o.ikon}</div>
                            <h3>{o.baslik}</h3>
                            <p>{o.aciklama}</p>
                        </div>
                    ))}
                </div>

                <h2 className="tss-bolum-baslik">Network Seçenekleri</h2>
                <div className="network-grid">
                    {networkler.map((n) => (
                        <div key={n.ad} className="network-kart">
                            <h3>{n.ad}</h3>
                            <p>{n.aciklama}</p>
                        </div>
                    ))}
                </div>

                <div className="alt-cta">
                    <h2>Size özel teklifinizi hemen görüntüleyin</h2>
                    <p>Sadece birkaç adımda, dakikalar içinde teklifinizi alın.</p>
                    <button className="hemen-teklif-buton" onClick={() => navigate('/genel-bilgiler')}>
                        💳 Hemen Online Teklif Al
                    </button>
                </div>
            </div>
        </>
    )
}

export default TamamlayiciSaglikSigortasi