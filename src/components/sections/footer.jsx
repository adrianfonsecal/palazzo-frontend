'use client'
import Image from 'next/image'
import logo from '../../../public/WebsiteLogoDark.png';
import { Link } from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-carbonblack text-gray-400 py-10 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-2 items-center mb-6">
                    <Image src={logo} alt="Palazzo Invites Logo" width={0} height={0} className='website-logo' />
                </div>
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="#" className="hover:text-coolsteel transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
                    <a href="#" className="hover:text-coolsteel transition-colors"><i className="fa-brands fa-facebook text-xl"></i></a>
                    <a href="#" className="hover:text-coolsteel transition-colors"><i className="fa-brands fa-whatsapp text-xl"></i></a>
                </div>
                <p className="text-xs tracking-widest">&copy; 2025 Palazzo Invites. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
