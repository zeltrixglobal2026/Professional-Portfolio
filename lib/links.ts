export type LinkItem = {
  id: string;
  name: string;
  href: string;
  sub: string;
  color: string;    // tailwind gradient
  glow: string;     // rgb for shadow
  icon: React.ReactNode;
};

export const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];