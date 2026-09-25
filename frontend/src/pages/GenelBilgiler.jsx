import { useState } from 'react'
import Header from '../components/Header'
import { musteriGirisYap } from '../api/api'
import { usePolice } from '../context/PoliceContext'
import './GenelBilgiler.css'
import { useNavigate } from 'react-router-dom'

function GenelBilgiler() {
    const navigate = useNavigate()
    const { setPoliceVerisi } = usePolice()

    const [kimIcin, setKimIcin] = useState('kendisi')

    const [tckn, setTckn] = useState('')
    const [dogumTarihi, setDogumTarihi] = useState('')
    const [telefon, setTelefon] = useState('')
    const [email, setEmail] = useState('')
    const [ad, setAd] = useState('')
    const [soyad, setSoyad] = useState('')

    const [kvkkOnay, setKvkkOnay] = useState(false)
    const [ticariIleti, setTicariIleti] = useState(false)
    const [sozlesmeOnay, setSozlesmeOnay] = useState(false)

    const tumunuIsaretle = () => {
        const yeniDurum = !(kvkkOnay && ticariIleti && sozlesmeOnay)
        setKvkkOnay(yeniDurum)
        setTicariIleti(yeniDurum)
        setSozlesmeOnay(yeniDurum)
    }

    const [adim, setAdim] = useState('form')
    const [otpKod, setOtpKod] = useState('')
    const [otpUretilen, setOtpUretilen] = useState('')
    const [hataMesaji, setHataMesaji] = useState('')
    const [yukleniyor, setYukleniyor] = useState(false)

    const devamEt = async () => {
        setHataMesaji('')

        if (kimIcin !== 'kendisi') {
            setHataMesaji('Bu seçenek şu anda demo kapsamında desteklenmiyor. Lütfen "Yalnızca kendim" seçin.')
            return
        }

        if (!tckn || !dogumTarihi || !telefon || !email || !ad || !soyad) {
            setHataMesaji('Lütfen tüm zorunlu alanları doldurun.')
            return
        }
        if (!email.includes('@') || !email.includes('.')) {
            setHataMesaji('Lütfen geçerli bir email adresi giriniz.')
            return
        }
        if (!kvkkOnay || !sozlesmeOnay) {
            setHataMesaji('Devam etmek için zorunlu onay kutularını işaretlemelisiniz.')
            return
        }

        setYukleniyor(true)
        try {
            const [gun, ay, yil] = dogumTarihi.split('/')
            const isoTarih = `${yil}-${ay}-${gun}`

            await musteriGirisYap({
                musteriNo: tckn,
                ad,
                soyad,
                dogumTarih: isoTarih,
                cepTel: telefon,
                email,
            })
            const yeniKod = Math.floor(100000 + Math.random() * 900000).toString()
            setOtpUretilen(yeniKod)
            alert(`Doğrulama kodunuz: ${yeniKod}\n(Gerçek SMS sistemi yok, bu sadece simülasyon amaçlı gösteriliyor.)`)
            setAdim('otp')
        } catch (err) {
            setHataMesaji(err.message)
        } finally {
            setYukleniyor(false)
        }
    }

    const otpDogrula = () => {
        if (otpKod.length !== 6) {
            setHataMesaji('6 haneli kodu girin.')
            return
        }
        if (otpKod !== otpUretilen) {
            setHataMesaji('Girdiğiniz kod hatalı. Lütfen tekrar deneyin.')
            return
        }
        setPoliceVerisi((onceki) => ({ ...onceki, musteriNo: tckn, ad, soyad }))
        navigate('/teklif')
    }

    return (
        <>
            <Header />
            <div className="genel-bilgiler">

                {adim === 'otp' ? (
                    <div className="otp-ekrani">
                        <h3 className="baslik">Doğrulama Kodu</h3>
                        <p>Telefonunuza gönderilen 6 haneli kodu girin. (Şimdilik simülasyon — herhangi bir 6 haneli kod kabul edilir.)</p>
                        <div className="form-alan floating">
                            <input
                                id="otp"
                                value={otpKod}
                                onChange={(e) => setOtpKod(e.target.value)}
                                placeholder=" "
                                maxLength={6}
                            />
                            <label htmlFor="otp">Doğrulama Kodu</label>
                        </div>
                        {hataMesaji && <p className="hata">{hataMesaji}</p>}
                        <button className="devam-buton" onClick={otpDogrula}>DOĞRULA</button>
                    </div>
                ) : (
                    <>
                        <div className="secim-kartlari">
                            <label className={`secim-kart ${kimIcin === 'kendisi' ? 'aktif' : ''}`}>
                                <input
                                    type="radio"
                                    name="kimIcin"
                                    checked={kimIcin === 'kendisi'}
                                    onChange={() => setKimIcin('kendisi')}
                                />
                                Yalnızca kendim
                            </label>

                            <label className={`secim-kart ${kimIcin === 'ikisi' ? 'aktif' : ''}`}>
                                <input
                                    type="radio"
                                    name="kimIcin"
                                    checked={kimIcin === 'ikisi'}
                                    onChange={() => setKimIcin('ikisi')}
                                />
                                Kendime ve Çocuğuma/Çocuklarıma
                            </label>

                            <label className={`secim-kart ${kimIcin === 'cocuk' ? 'aktif' : ''}`}>
                                <input
                                    type="radio"
                                    name="kimIcin"
                                    checked={kimIcin === 'cocuk'}
                                    onChange={() => setKimIcin('cocuk')}
                                />
                                Yalnızca Çocuğuma/Çocuklarıma
                            </label>
                        </div>

                        <h3 className="baslik">Sigortalı Bilgileri</h3>

                        <div className="form-alan floating">
                            <input
                                id="ad"
                                value={ad}
                                onChange={(e) => {
                                    const temiz = e.target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ ]/g, '').slice(0, 45)
                                    setAd(temiz)
                                }}
                                placeholder=" "
                            />
                            <label htmlFor="ad">Adınız *</label>
                        </div>

                        <div className="form-alan floating">
                            <input
                                id="soyad"
                                value={soyad}
                                onChange={(e) => {
                                    const temiz = e.target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ ]/g, '').slice(0, 45)
                                    setSoyad(temiz)
                                }}
                                placeholder=" "
                            />
                            <label htmlFor="soyad">Soyadınız *</label>
                        </div>

                        <div className="form-alan floating">
                            <input
                                id="tckn"
                                value={tckn}
                                onChange={(e) => {
                                    const temiz = e.target.value.replace(/\D/g, '').slice(0, 11)
                                    setTckn(temiz)
                                }}
                                placeholder=" "
                            />
                            <label htmlFor="tckn">TCKN/YKN *</label>
                        </div>

                        <div className="form-alan floating tarih-alani">
                            <input
                                id="dogumTarihi"
                                value={dogumTarihi}
                                onChange={(e) => {
                                    let raw = e.target.value.replace(/\D/g, '').slice(0, 8)
                                    let formatli = raw
                                    if (raw.length > 4) formatli = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`
                                    else if (raw.length > 2) formatli = `${raw.slice(0, 2)}/${raw.slice(2)}`
                                    setDogumTarihi(formatli)
                                }}
                                placeholder=" "
                            />
                            <label htmlFor="dogumTarihi">Doğum Tarihiniz *</label>
                            <span className="tarih-format">GG/AA/YYYY</span>
                        </div>

                        <div className="form-alan floating">
                            <input
                                id="telefon"
                                value={telefon}
                                onChange={(e) => {
                                    const rakamlar = e.target.value.replace(/\D/g, '').slice(0, 10)
                                    const gruplar = []
                                    if (rakamlar.length > 0) gruplar.push(rakamlar.slice(0, 3))
                                    if (rakamlar.length > 3) gruplar.push(rakamlar.slice(3, 6))
                                    if (rakamlar.length > 6) gruplar.push(rakamlar.slice(6, 8))
                                    if (rakamlar.length > 8) gruplar.push(rakamlar.slice(8))
                                    setTelefon(gruplar.join(' '))
                                }}
                                placeholder=" "
                            />
                            <label htmlFor="telefon">+90 Telefon Numaranız *</label>
                        </div>

                        <div className="form-alan floating">
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " />
                            <label htmlFor="email">Email Adresiniz *</label>
                        </div>

                        <div className="onay-satiri">
                            <input type="checkbox" checked={kvkkOnay && ticariIleti && sozlesmeOnay} onChange={tumunuIsaretle} />
                            <span>Tümünü İşaretle.</span>
                        </div>

                        <div className="onay-satiri">
                            <input type="checkbox" checked={kvkkOnay} onChange={(e) => setKvkkOnay(e.target.checked)} />
                            <span>
                                <a href="#">Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metnini</a> okudum.*
                            </span>
                        </div>

                        <div className="onay-satiri">
                            <input type="checkbox" checked={ticariIleti} onChange={(e) => setTicariIleti(e.target.checked)} />
                            <span><a href="#">Ticari elektronik ileti</a> gönderilmesini kabul ediyorum.</span>
                        </div>

                        <div className="onay-satiri">
                            <input type="checkbox" checked={sozlesmeOnay} onChange={(e) => setSozlesmeOnay(e.target.checked)} />
                            <span><a href="#">Kullanıcı Sözleşmesi ve Gizlilik Politikasını</a> okudum ve onaylıyorum.*</span>
                        </div>

                        {hataMesaji && <p className="hata">{hataMesaji}</p>}

                        <button className="devam-buton" onClick={devamEt} disabled={yukleniyor}>
                            {yukleniyor ? 'YÜKLENİYOR...' : 'DEVAM ET'}
                        </button>
                    </>
                )}
            </div>
        </>
    )
}

export default GenelBilgiler 