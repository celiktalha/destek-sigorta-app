const BASE_URL = 'http://localhost:5238/api'

export async function musteriGirisYap(musteri) {
    const res = await fetch(`${BASE_URL}/Musteri/Giris`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(musteri),
    })
    if (!res.ok) throw new Error('Müşteri girişi sırasında hata oluştu')
    return res.json()
}

export async function teminatListele(networkKod) {
    const res = await fetch(`${BASE_URL}/Teminat/${networkKod}`)
    if (!res.ok) throw new Error('Paketler getirilirken hata oluştu')
    return res.json()
}

export async function policeOlustur(policeVerisi) {
    const res = await fetch(`${BASE_URL}/Police`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policeVerisi),
    })
    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Poliçe oluşturulurken hata oluştu')
    }
    return res.json()
}

export async function odemeYap(odemeVerisi) {
    const res = await fetch(`${BASE_URL}/Odeme`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(odemeVerisi),
    })
    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Ödeme işlenirken hata oluştu')
    }
    return res.json()
}