import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SiteHeader.css'
import logo from '../assets/destek-sigorta-logo.png'

function SiteHeader() {
    const navigate = useNavigate()
    const [urunlerAcik, setUrunlerAcik] = useState(false)
    const [saglikAcik, setSaglikAcik] = useState(false)

    const urunlereTikla = () => {
        setUrunlerAcik(!urunlerAcik)
        if (urunlerAcik) setSaglikAcik(false) // panel kapanırken alt menü de kapansın
    }

    const saglikSigortalarinaTikla = () => {
        setSaglikAcik(!saglikAcik)
    }

    const tamamlayiciyaGit = () => {
        navigate('/tamamlayici-saglik-sigortasi')
        setUrunlerAcik(false)
        setSaglikAcik(false)
    }

    return (
        <div className="site-header">
            {/* ─── Üst şerit ─── */}
            <div className="ust-serit">
                <div className="ust-serit-inner">
                    <div className="logo-blok" onClick={() => navigate('/')}>
                        <img src={logo} alt="Destek Sigorta" className="logo-gorsel" />
                        <span className="logo-yazi">Destek Sigorta</span>
                        <span className="ayrac">|</span>
                        <span className="finansal-danismanlik">Finansal Danışmanlık</span>
                    </div>
                    <div className="ust-sag">
                        <span className="ust-link">Teklif Al</span>
                        <span className="ust-link">🌐 TR ▾</span>
                        <button className="online-islemler-buton">Online İşlemler</button>
                    </div>
                </div>
            </div>

            {/* ─── Ana navigasyon ─── */}
            <div className="ana-nav">
                <div className="ana-nav-inner">
                    <span
                        className={`nav-link urunler-link ${urunlerAcik ? 'aktif' : ''}`}
                        onClick={urunlereTikla}
                    >
                        Ürünler
                    </span>
                    <span className="nav-link">Kampanyalar</span>
                    <span className="nav-link">Anlaşmalı Kurumlar</span>
                    <span className="nav-link">Hasar İşlemleri</span>
                    <span className="nav-link">Raporlar/Yatırımcı İlişkileri</span>
                    <span className="nav-link">Bize Ulaşın</span>
                    <span className="ara-link">🔍 Ara</span>
                </div>
            </div>

            {/* ─── Ürünler dropdown paneli ─── */}
            {urunlerAcik && (
                <div className="urunler-panel">
                    <div className="urunler-panel-inner">
                        <div className="kategori-satiri">
                            <span className="kategori">👤 Bireysel Emeklilik</span>
                            <span className="kategori">🚗 Araç Sigortaları</span>
                            <span
                                className={`kategori aktif-kategori ${saglikAcik ? 'secili' : ''}`}
                                onClick={saglikSigortalarinaTikla}
                            >
                                ⚕️ Özel Sağlık Sigortaları
                            </span>
                            <span className="kategori">🏠 Ev ve İşyeri Sigortaları</span>
                            <span className="kategori">❤️ Bireysel Hayat Sigortaları</span>
                        </div>
                        <div className="kategori-satiri">
                            <span className="kategori">✈️ Seyahat Sağlık Sigortası</span>
                            <span className="kategori">🐾 Evcil Hayvan Sigortası</span>
                            <span className="kategori">➕ Diğer Ürünler</span>
                        </div>

                        {/* ─── Özel Sağlık Sigortaları alt menüsü ─── */}
                        {saglikAcik && (
                            <div className="saglik-alt-panel">
                                <div className="genel-bakis-link">→ Özel Sağlık Sigortaları Genel Bakış</div>
                                <div className="alt-urun-satiri">
                                    <span className="alt-urun aktif-alt-urun" onClick={tamamlayiciyaGit}>
                                        Tamamlayıcı Sağlık Sigortası
                                    </span>
                                    <span className="alt-urun">Modüler Sağlık Sigortası</span>
                                    <span className="alt-urun">Dijital Doktorum Sigortası</span>
                                    <span className="alt-urun">Yarınlara Umut Sigortası</span>
                                    <span className="alt-urun">Yabancı Sağlık Sigortası</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SiteHeader