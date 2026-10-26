"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Facebook, Instagram, Mail, Menu, Twitter, X, Youtube } from "lucide-react"

const navigation = [
  {
    name: "Agrupaciones",
    href: "/#agrupaciones",
    submenu: [
      { name: "Banda Sinfónica", href: "/banda/historia", children: [{ name: "Directores", href: "/banda/directores" }] },
      { name: "Coral Cantares", href: "/coral/historia", children: [{ name: "Director", href: "/coral/director" }] },
      { name: "Claxon Boys", href: "/claxon" },
      { name: "Charanga New Paentamala", href: "/charanga" },
      { name: "Ver todas las agrupaciones", href: "/agrupaciones" },
    ],
  },
  { name: "Calendario", href: "/calendar" },
  { name: "Noticias", href: "/noticias" },
  {
    name: "Sobre nosotros",
    href: "/historia",
    submenu: [
      { name: "Quiénes somos / Historia", href: "/historia" },
      { name: "Galería", href: "/galeria" },
      { name: "Transparencia", href: "/transparencia" },
    ],
  },
  { name: "Contacto", href: "/contacto" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/bandademieres/", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/Bandaateneomieres/", Icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCurQwXp65WecwlLX-keRS0g", Icon: Youtube },
  { name: "X", href: "https://x.com/BandaMusMieres", Icon: Twitter },
]

function currentPage(pathname: string, href: string) {
  const path = href.split(/[?#]/)[0]
  return path === pathname
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (!mobileMenuOpen && activeDropdown === null) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [mobileMenuOpen, activeDropdown])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const renderNav = (mobile = false) => (
    <ul className={mobile ? "space-y-1" : "flex items-center gap-5"}>
      {navigation.map((item) => {
        const isActive = currentPage(pathname, item.href)
        const isOpen = activeDropdown === item.name
        return (
          <li key={item.name} className={mobile ? "border-b border-primary-blue/30" : "relative"}>
            <div className={mobile ? "flex items-center" : "flex items-center gap-1"}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setMobileMenuOpen(false)
                  setActiveDropdown(null)
                }}
                className={`nav-link ${mobile ? "flex-1 py-3 text-base" : "py-2 text-[0.9375rem]"} ${isActive ? "nav-link-active" : ""}`}
              >
                {item.name}
              </Link>
              {item.submenu && (
                <button
                  type="button"
                  aria-label={`${isOpen ? "Cerrar" : "Abrir"} menú ${item.name}`}
                  aria-expanded={isOpen}
                  aria-controls={`submenu-${mobile ? "mobile-" : ""}${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setActiveDropdown(isOpen ? null : item.name)}
                  className="flex min-h-11 min-w-11 items-center justify-center text-foreground hover:bg-primary-blue/15 focus-visible:outline"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
            {item.submenu && isOpen && (
              <ul
                id={`submenu-${mobile ? "mobile-" : ""}${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                className={mobile
                  ? "mb-3 ml-3 border-l-2 border-blue-border pl-3"
                  : "absolute left-0 top-full z-50 mt-1 min-w-64 border-2 border-blue-border bg-background p-2 shadow-lg"}
              >
                {item.submenu.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.href}
                      aria-current={currentPage(pathname, subItem.href) ? "page" : undefined}
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setActiveDropdown(null)
                      }}
                      className="nav-link block min-h-11 px-3 py-2 text-sm"
                    >
                      {subItem.name}
                    </Link>
                    {"children" in subItem && subItem.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        aria-current={currentPage(pathname, child.href) ? "page" : undefined}
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setActiveDropdown(null)
                        }}
                        className="nav-link ml-3 block min-h-11 border-l-2 border-blue-border px-3 py-2 text-sm"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <header className="site-header fixed top-0 z-50 border-b border-blue-border bg-background text-foreground">
      <div className="bg-primary-blue text-foreground">
        <div className="home-container flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 text-xs">
          <div className="flex items-center gap-3">
            <a href="tel:+34681188519" className="header-contact text-link text-link-on-blue">
              <span className="hidden sm:inline">+34 681 18 85 19</span>
              <span className="sm:hidden" aria-label="Llamar al Ateneo">+34 681 18 85 19</span>
            </a>
            <a
              href="mailto:ateneomusicaldemieres@gmail.com"
              aria-label="Enviar correo a ateneomusicaldemieres@gmail.com"
              className="flex min-h-9 min-w-9 items-center justify-center text-foreground hover:bg-foreground/10 focus-visible:outline sm:hidden"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="mailto:ateneomusicaldemieres@gmail.com" className="header-contact text-link text-link-on-blue hidden sm:inline-flex">
              ateneomusicaldemieres@gmail.com
            </a>
          </div>
          <nav aria-label="Redes sociales" className="flex items-center gap-3">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex min-h-8 min-w-8 items-center justify-center hover:bg-foreground/10 focus-visible:outline"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="home-container">
        <div className="flex min-h-16 items-center gap-2 xl:min-h-20 xl:justify-between">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
              setActiveDropdown(null)
            }}
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md hover:bg-primary-blue/10 xl:hidden"
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <Link href="/" aria-label="Ateneo Musical de Mieres, inicio" aria-current={currentPage(pathname, "/") ? "page" : undefined} className="flex min-w-0 shrink items-center gap-2 xl:gap-3">
            <Image src="/logo_ateneo.png" alt="" width={44} height={44} className="h-9 w-9 shrink-0 object-contain xl:h-10 xl:w-10" priority />
            <span className="hidden text-xs font-bold min-[24rem]:inline sm:hidden">Ateneo</span>
            <span className="hidden text-base font-semibold leading-tight sm:inline xl:text-lg">
              Ateneo Musical de Mieres
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden xl:block">
            {renderNav()}
          </nav>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            <Link href="/contrata" aria-current={currentPage(pathname, "/contrata") ? "page" : undefined} className="cta-primary header-cta">Contrátanos</Link>
            <Link href="/join" aria-current={currentPage(pathname, "/join") ? "page" : undefined} className="cta-secondary header-cta">Hazte socio</Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1 xl:hidden">
            <Link href="/contrata" aria-current={currentPage(pathname, "/contrata") ? "page" : undefined} className="cta-primary header-cta">Contrátanos</Link>
            <Link href="/join" aria-current={currentPage(pathname, "/join") ? "page" : undefined} className="cta-secondary header-cta">Hazte socio</Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-nav-backdrop absolute inset-x-0 top-full z-40 h-[calc(100dvh-9rem)] bg-dark/40 xl:hidden"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            tabIndex={-1}
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default"
          />
          <div className="mobile-nav-drawer absolute inset-y-0 left-0 w-[min(88vw,22rem)] overflow-y-auto border-r border-blue-border bg-background px-5 py-6 shadow-xl">
            <nav aria-label="Navegación principal móvil">{renderNav(true)}</nav>
          </div>
        </div>
      )}
    </header>
  )
}
