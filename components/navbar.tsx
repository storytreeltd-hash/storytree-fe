/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

import { AnimatedLink } from "@/components/motion";
import { scrollToHash } from "@/lib/scroll-to-hash";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/who-is-it-for", label: "Who is it for" },
  { href: "/programs", label: "Programs" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/#how-it-works", label: "How it works" },
];

const dropdownLinks = {
  about: [
    { href: "/about#about-us", label: "About Us" },
    { href: "/about#mission", label: "Mission" },
    { href: "/about#team", label: "Team" },
    { href: "/about#advisory-board", label: "Advisory Board" },
    { href: "/about#ambassadors", label: "Ambassadors" },
    { href: "/about#partners", label: "Partners" },
    { href: "/about#contact", label: "Contact" },
  ],
  programs: [
    { href: "/programs#programs", label: "Programs" },
    { href: "/programs#script-to-screen", label: "Script to Screen" },
    {
      href: "/programs#project-development-workroom",
      label: "Project Development Workroom",
    },
    { href: "/programs#focus-group", label: "Focus Group" },
    { href: "/programs#screenings", label: "Screenings" },
    { href: "/programs#trainings", label: "Trainings" },
  ],
  events: [
    { href: "/events#events", label: "Events" },
    { href: "/events#storytree-connect", label: "StoryTree Connects" },
    { href: "/events#upcoming-events", label: "Up-coming Events" },
  ],
  community: [
    { href: "/community#community", label: "Community" },
    { href: "/community#filmtalk-africa", label: "FilmTalk Africa" },
    { href: "/community#film-club", label: "Film Club" },
    { href: "/community#magazine", label: "Magazine" },
    { href: "/community#store", label: "Store" },
    { href: "/events#storytree-connect", label: "Community Connect" },
    { href: "/join", label: "Join The Chat" },
  ],
} as const;

type DropdownKey = keyof typeof dropdownLinks;

const dropdownNavConfig: Record<
  string,
  { key: DropdownKey; width: string }
> = {
  "/about": { key: "about", width: "w-[180px]" },
  "/programs": { key: "programs", width: "w-[320px]" },
  "/community": { key: "community", width: "w-[220px]" },
  "/events": { key: "events", width: "w-[220px]" },
};

function MenuIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className ?? "text-white"}
    >
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M4 7H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 17H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function ChevronDownSmall({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavDropdown({
  label,
  dropdownKey,
  widthClass,
  isOpen,
  onOpen,
  onClose,
  onToggle,
  triggerClassName,
  onItemClick,
}: {
  label: string;
  dropdownKey: DropdownKey;
  widthClass: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  triggerClassName: string;
  onItemClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={triggerClassName}
      >
        {label}
        <ChevronDownSmall className="opacity-80" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key={`${dropdownKey}-dropdown`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className={`absolute left-0 top-full mt-4 ${widthClass} rounded-[10px] border border-black/10 bg-[#FDFBF7] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.18)]`}
            role="menu"
          >
            {dropdownLinks[dropdownKey].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => onItemClick(event, item.href)}
                className="block rounded-[8px] px-4 py-2.5 text-sm text-[#171717] transition-colors hover:bg-black/5"
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Navbar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const isHome = pathname === "/";
  const isLight =
    (isHome && scrolled) || (!isHome && variant !== "dark");
  const navText = isLight ? "text-[#171717]" : "text-white";
  const menuIconClass = isLight ? "text-[#171717]" : "text-white";
  const logoSrc = isLight ? "/logoB.svg" : "/storyTreeLogo.svg";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    requestAnimationFrame(() => scrollToHash(hash));
  }, [pathname]);

  const handleNavLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMenuOpen(false);

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const path = href.slice(0, hashIndex) || "/";
    const id = href.slice(hashIndex + 1);

    if (pathname === path) {
      event.preventDefault();
      scrollToHash(id);
      window.history.pushState(null, "", href);
    }
  };

  const linkClass = (href: string) => {
    const isActive =
      href === "/"
        ? pathname === "/"
        : href.includes("#")
          ? false
          : pathname.startsWith(href);

    return `text-base transition-opacity hover:opacity-80 ${
      isActive ? "font-bold" : "font-normal"
    }`;
  };

  const desktopDropdownTriggerClass = (href: string) =>
    `text-sm ${navText} ${linkClass(href)} inline-flex items-center gap-1.5`;

  const handleDropdownLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setOpenDropdown(null);
    handleNavLinkClick(event, href);
  };

  const menuLinks = [
    ...navLinks.map(({ href, label }) => ({ href, label, type: "link" as const })),
    { href: "/contact", label: "Contact", type: "link" as const },
    { href: "/join", label: "Join The Community", type: "cta" as const },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
        scrolled
          ? "bg-[#FDFBF7]/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="relative z-50 mx-auto flex max-w-[1440px] items-center gap-10 px-4 py-4 font-sans md:px-6 lg:px-8 lg:py-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={logoSrc}
              alt="Story Tree"
              width={120}
              height={80}
              priority
              className="h-[62px] w-auto lg:h-[70px]"
            />
          </Link>
        </motion.div>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ href, label }, index) => {
            const dropdown = dropdownNavConfig[href];

            return (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                {dropdown ? (
                  <NavDropdown
                    label={label}
                    dropdownKey={dropdown.key}
                    widthClass={dropdown.width}
                    isOpen={openDropdown === dropdown.key}
                    onOpen={() => setOpenDropdown(dropdown.key)}
                    onClose={() => setOpenDropdown(null)}
                    onToggle={() =>
                      setOpenDropdown((current) =>
                        current === dropdown.key ? null : dropdown.key
                      )
                    }
                    triggerClassName={desktopDropdownTriggerClass(href)}
                    onItemClick={handleDropdownLinkClick}
                  />
                ) : (
                  <Link
                    href={href}
                    onClick={(event) => handleNavLinkClick(event, href)}
                    className={`text-sm ${navText} ${linkClass(href)}`}
                  >
                    {label}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="ml-auto hidden items-center gap-8 lg:flex"
        >
          <Link
            href="/contact"
            className={`text-sm font-normal ${navText} transition-opacity hover:opacity-80`}
          >
            Contact
          </Link>
          <AnimatedLink
            href="/join"
            className="rounded-[6px] border-2 border-[#0D0D0D] bg-white px-5 py-2.5 text-sm font-medium text-[#171717]"
          >
            Join The Community
          </AnimatedLink>
        </motion.div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <MenuIcon open={menuOpen} className={menuIconClass} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-black/95 backdrop-blur-sm lg:hidden"
          >
            <div className="flex min-h-full flex-col items-center justify-start gap-6 px-8 py-24">
              {menuLinks.map(({ href, label, type }, index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {type === "cta" ? (
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="mt-2 inline-block rounded-[6px] border border-[#E2B45F] bg-white px-6 py-3 text-sm font-medium text-[#171717] transition-opacity hover:opacity-90"
                    >
                      {label}
                    </Link>
                  ) : (
                    <Link
                      href={href}
                      onClick={(event) => handleNavLinkClick(event, href)}
                      className={`text-white ${linkClass(href)}`}
                    >
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
