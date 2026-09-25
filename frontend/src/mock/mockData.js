export const tedaviDetaylari = [
    {
        baslik: 'AYAKTA TEDAVİ', satirlar: [
            { label: 'Ayakta Tedaviler (defalık Limit)', v1: '4 Defa (%100)', v2: '10 Defa (%100)', v3: 'Limitsiz (%100)' },
            { label: 'Fizik Tedavi (yıllık Limit)', v1: '15 Defa (%100)', v2: '30 Defa (%100)', v3: '30 Defa (%100)' },
        ]
    },
    {
        baslik: 'YATARAK TEDAVİ', satirlar: [
            { label: 'Yatarak Tedaviler', v1: 'Limitsiz (%100)', v2: 'Limitsiz (%100)', v3: 'Limitsiz (%100)' },
            { label: 'Evde Bakım ve Tedavi (8 Hafta)', v1: '225.000 TL (%100)', v2: '225.000 TL (%100)', v3: '225.000 TL (%100)' },
            { label: 'Yatış Sonrası Fizik Tedavi ve Rehabilitasyon', v1: '15 Defa (%100)', v2: '15 Defa (%100)', v3: '15 Defa (%100)' },
            { label: 'Suni Uzuv', v1: '225.000 TL (%100)', v2: '225.000 TL (%100)', v3: '225.000 TL (%100)' },
            { label: 'Tıbbi Malzemeler', v1: '30.000 TL (%100)', v2: '30.000 TL (%100)', v3: '30.000 TL (%100)' },
        ]
    },
]

export const anlasmaliKurumlar = [
    { ad: 'Ilgın Hastanesi', turkuaz: true, turuncu: true, kirmizi: true },
    { ad: 'Şile Hastanesi', turkuaz: true, turuncu: true, kirmizi: true },
    { ad: 'Konya Hastanesi', turkuaz: true, turuncu: true, kirmizi: true },
    { ad: 'İstanbul Hastanesi', turkuaz: true, turuncu: true, kirmizi: true },
    { ad: 'Ankara Hastanesi', turkuaz: true, turuncu: true, kirmizi: true },
]

// Taksit önizlemesi — backend'de hesaplama endpoint'i yok, sabit oranlarla mock gösterim
export const taksitOranlari = [
    { sayi: 1, oran: 0 },
    { sayi: 3, oran: 0.027 },
    { sayi: 6, oran: 0.0707 },
    { sayi: 9, oran: 0.1036 },
    { sayi: 12, oran: 0.1487 },
]