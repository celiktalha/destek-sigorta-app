import SiteHeader from '../components/SiteHeader'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import heroGorsel from '../assets/hero-aile.jpg'
import kampanya1Gorsel from '../assets/kampanya1.jpg'
import kampanya2Gorsel from '../assets/kampanya2.jpg'
import kampanya3Gorsel from '../assets/kampanya3.jpg'

const hizliUrunler1 = [
    { ikon: '❤️', ad: 'Tamamlayıcı Sağlık', path: '/genel-bilgiler' },
    { ikon: '💰', ad: 'Bireysel Emeklilik' },
    { ikon: '🚗', ad: 'Kasko Sigortası' },
    { ikon: '✈️', ad: 'Seyahat Sağlık' },
]

const hizliUrunler2 = [
    { ikon: '🏠', ad: 'DASK Sigortası' },
    { ikon: '🏡', ad: 'Konut Sigortası' },
    { ikon: '🩺', ad: 'Dijital Doktorum' },
    { ikon: '🚙', ad: 'Zorunlu Trafik Sigortası' },
    { ikon: '🐾', ad: 'Evcil Hayvan Sigortası' },
]

const urunKartlari = [
    { ikon: '❤️', ad: 'Sağlık', aciklama: 'Size ve ailenize uygun planlarla sağlığınızı koruyun. Kapsamlı poliçelerimizle muayene, tedavi ve hastane masraflarını düşünmeyin.' },
    { ikon: '💰', ad: 'Bireysel Emeklilik', aciklama: "Geleceğinize bugünden yatırım yapın. Destek Bireysel Emeklilik ile birikimlerinizi esnek seçeneklerle büyütün ve emekliliğinizi güvence altına alın." },
    { ikon: '🚗', ad: 'Araç', aciklama: 'Aracınıza özel çözümlerimizle yolda her zaman güvendesiniz. Kasko ve trafik sigortaları ile olası risklere karşı aracınızı koruyun.' },
    { ikon: '✈️', ad: 'Seyahat', aciklama: 'Schengen vizesi hatlerinizde de %100 yanınızdayız.' },
]

const kampanyalar = [
    { gorsel: kampanya1Gorsel, baslik: 'Destek Sigorta Kasko Motovale Kampanyası', aciklama: "Destek Sigorta 365 Dünyası'ndan Kasko Poliçesi Sahiplerine Özel, Yılda 1 Kez Ücretsiz Motovale Ayrıcalığı" },
    { gorsel: kampanya2Gorsel, baslik: 'Modüler Sağlık Yaz Kampanyası', aciklama: "Şimdi Destek Sigorta müşterileri Modüler Sağlık Sigortası'nda %25'e varan indirim kazanıyor..." },
    { gorsel: kampanya3Gorsel, baslik: 'Kasko, Yuvam ve İşyerim Sigortası\'nda %10 Sağlıklı Puan Fırsatı', aciklama: '...' },
]

function HomePage() {

    const navigate = useNavigate()

    return (
        <>
            <SiteHeader />

            {/* ─── Hero ─── */}
            <div className="hero-section">
                <img className="hero-gorsel" src={heroGorsel} alt="Mutlu aile" />
                <div className="hero-band"></div>
                <div className="hero-kutu">
                    <div className="hero-etiket">DESTEK SİGORTA</div>
                    <h1 className="hero-baslik">
                        Destek Sigorta ile Güvencenizi<br /><span className="hero-baslik-vurgu">Online Tamamlayın</span>
                    </h1>
                    <div className="hero-butonlar">
                        <button className="hero-buton-dolu">💳 Online Teklif Al</button>
                        <button className="hero-buton-cerceve">🔍 Ürünleri Keşfet</button>
                    </div>
                </div>
            </div>

            {/* ─── Hızlı ürün ikonları ─── */}
            <div className="hizli-urunler-blok">
                <h2 className="hizli-baslik">Hemen Tıkla,<br />Anında Teklif Al</h2>
                <div className="hizli-grid">
                    {[...hizliUrunler1, ...hizliUrunler2].map((u) => (
                        <div
                            key={u.ad}
                            className={`hizli-kart ${u.path ? 'tiklanabilir' : ''}`}
                            onClick={() => u.path && navigate(u.path)}
                        >
                            <div className="hizli-ikon">{u.ikon}</div>
                            <div className="hizli-ad">{u.ad}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Ürünlerimiz ─── */}
            <div className="urunlerimiz-blok">
                <div className="bolum-etiket">ÜRÜNLERİMİZ</div>
                <h2 className="bolum-baslik">İhtiyacınıza uygun ürünleri keşfedin</h2>
                <div className="urun-kart-grid">
                    {urunKartlari.map((u) => (
                        <div key={u.ad} className="urun-kart">
                            <div className="urun-kart-ikon">{u.ikon}</div>
                            <h3>{u.ad}</h3>
                            <p>{u.aciklama}</p>
                            <button className="kesfet-buton">Keşfet</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Fırsatlar ─── */}
            <div className="firsatlar-blok">
                <div className="bolum-etiket">FIRSATLAR</div>
                <h2 className="bolum-baslik">Size özel fırsatları kaçırmayın!</h2>
                <div className="kampanya-grid">
                    {kampanyalar.map((k) => (
                        <div key={k.baslik} className="kampanya-kart">
                            <img src={k.gorsel} alt={k.baslik} className="kampanya-gorsel" />
                            <h4>{k.baslik}</h4>
                            <p>{k.aciklama}</p>
                            <div className="detayli-bilgi">→ DETAYLI BİLGİ</div>
                        </div>
                    ))}
                </div>
                <button className="tum-kampanyalar-buton">Tüm Kampanyalar</button>
            </div>

            {/* ─── Alt CTA ─── */}
            <div className="alt-cta-blok">
                <h2>Ürünlerimiz Hakkında Detaylı Bilgi Almak İster Misiniz?</h2>
                <p>Bilgilerinizi Bırakın, Sizi Arayalım</p>
                <button className="bana-ulasin-buton">Bana Ulaşın</button>
            </div>
        </>
    )
}

export default HomePage