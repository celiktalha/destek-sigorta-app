import { createContext, useContext, useState } from 'react'

const PoliceContext = createContext()

export function PoliceProvider({ children }) {
    const [policeVerisi, setPoliceVerisi] = useState({
        musteriNo: '',
        ad: '',
        soyad: '',
        teminatKod: '',
        teminatAd: '',
        networkKod: '',
        pirim: 0,
        policeOzet: null, // POST /api/Police sonucu (policeNo, bedel, basTarih, bitTarih burada tutulacak)
    })

    return (
        <PoliceContext.Provider value={{ policeVerisi, setPoliceVerisi }}>
            {children}
        </PoliceContext.Provider>
    )
}

export function usePolice() {
    return useContext(PoliceContext)
}