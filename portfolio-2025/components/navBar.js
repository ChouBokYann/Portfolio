'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function NavBar() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Check if current theme is dark
        const checkTheme = () => {
            const html = document.documentElement
            const currentTheme = html.getAttribute('data-theme')
            
            // List of known dark themes in DaisyUI
            const darkThemes = [
                'dark', 'halloween', 'forest', 'aqua', 'synthwave', 
                'retro', 'cyberpunk', 'valentine', 'dracula', 'business',
                'night', 'coffee', 'dim', 'sunset'
            ]
            
            const isDarkTheme = darkThemes.includes(currentTheme)
            setIsDark(isDarkTheme)
        }

        checkTheme()

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
            childList: false,
            subtree: false
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="navbar bg-[#454545] shadow-lg border-b border-[#454545]">
            <div className="flex-1">
                <div className="logo">
                    <Image 
                        src={isDark ? "/images/namelogo-dark.png" : "/images/namelogo-light.png"} 
                        alt="logo" 
                        width={200} 
                        height={200} 
                        className="h-12 w-auto" 
                    />
                </div>
            </div>
            <div className="flex-none">
                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Link href="/pages/home" className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link href="/pages/about" className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                    <Link href="/pages/projects" className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
                    <Link href="/pages/resume" className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium">Resume</Link>
                    <Link href="/pages/contact" className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                </div>
                
                {/* Mobile Navigation - Hidden on desktop */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-square btn-ghost text-[#FFE6C7] hover:text-[#FF6000] hover:bg-[#FFA559]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> 
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#454545] rounded-box w-52 border border-[#FF6000]">
                        <li><Link href="/pages/home" className="text-[#FFE6C7] hover:text-[#FF6000] hover:bg-[#FFA559] transition-colors">Home</Link></li>
                        <li><Link href="/pages/about" className="text-[#FFE6C7] hover:text-[#FF6000] hover:bg-[#FFA559] transition-colors">About</Link></li>
                        <li><Link href="/pages/projects" className="text-[#FFE6C7] hover:text-[#FF6000] hover:bg-[#FFA559] transition-colors">Projects</Link></li>
                        <li><Link href="/pages/resume" className="text-[#FFE6C7] hover:text-[#FF6000] hover:bg-[#FFA559] transition-colors">Resume</Link></li>
                        <li><Link href="/pages/contact" className="text-[#FFE6C7] hover:text-[#FF6000] hover:bg-[#FFA559] transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
