"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

const circleLinks = [{ name: "Our story", href: "/about" }, { name: "The people", href: "/team" }, { name: "In pictures", href: "/gallery" }, { name: "Meetings", href: "/events" }];
const mathLinks = [{ name: "Topics & problems", href: "/topics" }, { name: "Resources", href: "/resources" }, { name: "Math Bites", href: "/math-bites" }];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  function closeMenu() { setOpen(false); menuButton.current?.focus(); }
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
      if (event.key !== "Tab") return;
      const targets = dialog.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!targets?.length) return;
      const first = targets[0], last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", key); };
  }, [open]);

  return (
    <header className="mmc-header">
      <Link href="/" className="mmc-wordmark" aria-label="Melbourne Math Circle home"><Image src="/mmc_logo.jpg" alt="" width={64} height={64} className="wordmark-logo" priority /><span>Melbourne<br />Math Circle</span></Link>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {circleLinks.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.name}</Link>)}
        <details className="math-dropdown"><summary>Some math <ChevronDown size={15} /></summary><div>{mathLinks.map(link => <Link key={link.href} href={link.href}>{link.name}<ArrowUpRight size={17} /></Link>)}</div></details>
      </nav>
      <Link href="/join-us" className="header-join">Join the circle <ArrowUpRight size={19} /></Link>
      <button className="mobile-menu-toggle" ref={menuButton} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu size={26} /></button>
      {open && <div ref={dialog} className="mobile-navigation" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="mobile-menu-top"><span>Find your way.</span><button ref={closeButton} aria-label="Close menu" onClick={closeMenu}><X size={30} /></button></div>
        <nav aria-label="Mobile navigation">{[...circleLinks, ...mathLinks, { name: "Contact us", href: "/contact" }].map(link => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.name}<ArrowUpRight size={26} /></Link>)}<Link className="mobile-join" href="/join-us">Join the circle <ArrowUpRight size={26} /></Link></nav>
      </div>}
    </header>
  );
}
