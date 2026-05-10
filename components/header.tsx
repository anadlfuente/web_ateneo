"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Sobre nosotros", href: "#sobre-nosotros",
    submenu: [
      { name: "Historia", href: "/historia" },
      { name: "Junta Directiva", href: "#junta" },
      { name: "Reglamento", href: "#reglamento" },
      { name: "Estatutos", href: "#reglamento" },
    ],
   },
  {
    name: "Agrupaciones",
    href: "#agrupaciones",
    submenu: [
      { name: "Banda Sinfonica", href: "#banda-sinfonica" },
      { name: "Coral Cantares", href: "#coral" },
      { name: "Claxon Boys", href: "#claxon-boys" },
      { name: "Charanga New Paentamala", href: "#charanga" },
    ],
  },
  { name: "Noticias", href: "#noticias" },
  { name: "Contacto", href: "#contacto" },
    {
    name: "Calendario",
    href: "#calendario",
  },
]

export function Header() { //Componente React
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Estado base del menu móvil, la función setMobileMenuOpen cambia el estado
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { //Efecuta cuando el componente aparece
    const handleScroll = () => {
      setScrolled(window.scrollY > 50) //Si scroleas más de 50 px, el estado de scrolled se vuelve true, cambia estilos
    }
    window.addEventListener("scroll", handleScroll) // Controla el scroll constantemente
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return ( // Aquí empieza el JSX, parte visual del componente
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white border-b border-border" 
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className={`border-b transition-all duration-500 ${scrolled ? "border-border" : "border-white/20"}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className={`flex items-center gap-6 ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
              <a href="tel:+34681188519" className="hover:text-foreground transition-colors">
                +34 681 18 85 19
              </a>
              <a href="mailto:ateneomusicaldemieres@gmail.com" className="hover:text-foreground transition-colors">
                ateneomusicaldemieres@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className={`hover:opacity-70 transition-opacity ${scrolled ? "text-foreground" : "text-white"}`}>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
          {/*Icono*/}
            <img
              src="/logo_ateneo.png"
              alt="Ateneo Musical de Mieres"
              className={`w-10 h-10 transition-transform duration-300 group-hover:rotate-6 ${
                scrolled ? "opacity-100" : "opacity-90"
              }`}
            />
            <span className={`font-serif text-2xl tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}>
              Ateneo Musical de<span className="text-secondary"> Mieres</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-10">
            {navigation.map((item) => ( //Recorre el array de navegación
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-xs font-medium tracking-wide uppercase transition-colors underline-animation ${
                    scrolled 
                      ? "text-foreground hover:text-secondary" 
                      : "text-white hover:text-white/70"
                  }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-3 h-3" />}
                </Link>
                
                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-0.5 w-64 bg-white border border-border shadow-xl animate-in fade-in slide-in-from-top-2">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-muted hover:text-secondary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            <Button 
              className={`px-8 py-2 text-sm font-medium tracking-wide uppercase transition-all ${
                scrolled
                  ? "bg-secondary text-white hover:bg-secondary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              }`}
            >
              Hazte Socio
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-4 text-lg font-medium text-foreground hover:text-secondary transition-colors border-b border-border"
                  onClick={() => !item.submenu && setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 py-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button className="w-full mt-6 bg-secondary text-white hover:bg-secondary/90 text-sm font-medium tracking-wide uppercase">
              Hazte Socio
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
