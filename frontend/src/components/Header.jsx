import { useNavigate } from 'react-router-dom'
import logo from '../assets/destek-sigorta-logo.png'
import './Header.css'

function Header() {
    const navigate = useNavigate()

    return (
        <header className="header">
            <div className="header-logo" onClick={() => navigate('/')}>
                <img src={logo} alt="Destek Sigorta" className="logo-gorsel" />
                <span className="logo-yazi">Destek Sigorta</span>
            </div>
        </header>
    )
}

export default Header