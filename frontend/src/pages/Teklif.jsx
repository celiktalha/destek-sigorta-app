import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { teminatListele } from '../api/api'
import { usePolice } from '../context/PoliceContext'
import { tedaviDetaylari, anlasmaliKurumlar, taksitOranlari } from '../mock/mockData'
import './Teklif.css'

const NETWORKLER = [
    { kod: 'TURKUAZ', ad: 'Turkuaz Network', alt: '(Temel)' },
    { kod: 'TURUNCU', ad: 'Turuncu Network', alt: '(Orta)' },
    { kod: 'KIRMIZI', ad: 'Kırmızı Network', alt: '(Kapsamlı)' },
]

// Backend'in gerçek "paketTipi" alanına göre etiketliyoruz (metin tahminine göre değil)
const PAKET_ETIKET = {
    Adet4: 'Yatarak + Ayakta (4 adet)',
    Adet10: 'Yatarak + Ayakta (10 adet)',
    AdetLimitsiz: 'Yatarak + Ayakta (Limitsiz)',
}

const mockOrijinalFiyat = (pirim) => pirim / 0.91

function formatTL(sayi) {
    return sayi.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'
}

function Teklif() {
    const navigate = useNavigate()
    const { policeVerisi, setPoliceVerisi } = usePolice()

    const [network, setNetwork] = useState('TURUNCU')
    const [paketler, setPaketler] = useState([])
    const [yukleniyor, setYukleniyor] = useState(false)
    const [secilenPaket, setSecilenPaket] = useState(null)
    const [taksit, setTaksit] = useState(1)
    const [hataMesaji, setHataMesaji] = useState('')

    useEffect(() => {
        async function paketleriGetir() {
            setYukleniyor(true)
            setHataMesaji('')
            try {
                const data = await teminatListele(network)
                setPaketler(data)
                setSecilenPaket(null)
            } catch (err) {
                setHataMesaji(err.message)
                setPaketler([])
            } finally {
                setYukleniyor(false)
            }
        }
        paketleriGetir()
    }, [network])

    const toplamTutar = () => {
        if (!secilenPaket) return 0
        const oran = taksitOranlari.find((t) => t.sayi === taksit)?.oran || 0
        return secilenPaket.pirim * (1 + oran)
    }

    const devamEt = () => {
        if (!secilenPaket) {
            setHataMesaji('Lütfen bir paket seçin.')
            return
        }

        // Seçilen paket bilgisini ortak Context'e yazıyoruz, bir sonraki sayfa (Özet) buradan okuyacak
        setPoliceVerisi((onceki) => ({
            ...onceki,
            teminatKod: secilenPaket.teminatKod,
            teminatAd: secilenPaket.teminatAd,
            networkKod: secilenPaket.networkKod,
            pirim: secilenPaket.pirim,
        }))
        navigate('/ozet')
    }

    return (
        <>
            <Header />

            <div className="kampanya-banner">
                🎁 Hemen online satın al, 2.000 TL'ye varan hediye çeki kazan!
            </div>

            <div className="adim-gostergesi">
                {['Genel Bilgiler', 'Teklif', 'Destek ve Özet', 'Ödeme', 'Sonuç'].map((ad, i) => (
                    <span key={ad} className={`adim ${i === 1 ? 'aktif' : ''} ${i < 1 ? 'tamam' : ''}`}>
                        {ad}
                    </span>
                ))}
            </div>

            <div className="teklif-icerik">
                <div className="network-sekmeler">
                    {NETWORKLER.map((n) => (
                        <div
                            key={n.kod}
                            className={`network-sekme ${network === n.kod ? 'aktif' : ''}`}
                            onClick={() => setNetwork(n.kod)}
                        >
                            <strong>{n.ad}</strong>
                            <div>{n.alt}</div>
                        </div>
                    ))}
                </div>

                {yukleniyor ? (
                    <p>Paketler yükleniyor...</p>
                ) : (
                    <div className="paket-kartlari">
                        {paketler.map((p) => {
                            const orijinal = mockOrijinalFiyat(p.pirim)
                            const secili = secilenPaket?.teminatKod === p.teminatKod
                            return (
                                <div key={p.teminatKod} className={`paket-kart ${secili ? 'secili' : ''}`}>
                                    <div className="paket-ad">{PAKET_ETIKET[p.paketTipi] || p.teminatAd}</div>
                                    <div className="orijinal-fiyat">{formatTL(orijinal)}</div>
                                    <div className="guncel-fiyat">{formatTL(p.pirim)}</div>
                                    <div className="indirim">%9 İndirim</div>
                                    <button onClick={() => setSecilenPaket(secili ? null : p)}>
                                        {secili ? '✓ Seçildi' : 'Seç'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}

                {tedaviDetaylari.map((blok) => (
                    <div key={blok.baslik} className="tedavi-blok">
                        <div className="tedavi-baslik">{blok.baslik}</div>
                        {blok.satirlar.map((s) => (
                            <div key={s.label} className="tedavi-satir">
                                <span className="tedavi-label">{s.label}</span>
                                <span>{s.v1}</span>
                                <span>{s.v2}</span>
                                <span>{s.v3}</span>
                            </div>
                        ))}
                    </div>
                ))}

                <h3 className="baslik">Anlaşmalı Kurumlar</h3>
                <input className="kurum-arama" placeholder="Aramak istediğiniz bir kurum adı yazın.." disabled />
                <table className="kurum-tablo">
                    <thead>
                        <tr>
                            <th>Anlaşmalı Kurum</th>
                            <th>Turkuaz Network</th>
                            <th>Turuncu Network</th>
                            <th>Kırmızı Network</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anlasmaliKurumlar.map((k) => (
                            <tr key={k.ad}>
                                <td className="kurum-link">{k.ad}</td>
                                <td>{k.turkuaz && '✓'}</td>
                                <td>{k.turuncu && '✓'}</td>
                                <td>{k.kirmizi && '✓'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="sayfalama">
                    <button disabled>|←</button>
                    <button disabled>←</button>
                    <span className="sayfa-no aktif">1</span>
                    <span className="sayfa-no">2</span>
                    <span className="sayfa-no">3</span>
                    <button disabled>→</button>
                    <button disabled>→|</button>
                </div>

                {secilenPaket && (
                    <>
                        <h3 className="baslik">Ödeme Bilgileri</h3>
                        <table className="taksit-tablo">
                            <thead>
                                <tr><th></th><th>Taksit</th><th>Taksit Tutarı</th><th>Toplam Tutar</th></tr>
                            </thead>
                            <tbody>
                                {taksitOranlari.map((t) => {
                                    const toplam = secilenPaket.pirim * (1 + t.oran)
                                    return (
                                        <tr key={t.sayi} onClick={() => setTaksit(t.sayi)}>
                                            <td><input type="radio" checked={taksit === t.sayi} onChange={() => setTaksit(t.sayi)} /></td>
                                            <td>{t.sayi === 1 ? 'Tek Çekim' : `${t.sayi} Taksit`}</td>
                                            <td>{t.sayi === 1 ? '-' : formatTL(toplam / t.sayi)}</td>
                                            <td>{formatTL(toplam)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </>
                )}

                {hataMesaji && <p className="hata">{hataMesaji}</p>}
            </div>

            <div className="alt-bar">
                <div className="alt-bar-inner">
                    <div>
                        <div className="alt-bar-baslik">Toplam Tutar</div>
                        <div className="alt-bar-tutar">{secilenPaket ? formatTL(toplamTutar()) : '-'}</div>
                    </div>
                    <button className="devam-buton" onClick={devamEt} disabled={!secilenPaket}>DEVAM ET</button>
                </div>
            </div>
        </>
    )
}

export default Teklif