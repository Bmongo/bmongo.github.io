import React from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Tags",
    href: "/tags",
  },
  {
    component: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={24}
        height={24}
      >
        <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z"></path>
        <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z"></path>
        <circle cx="6" cy="18" r="2"></circle>
      </svg>
    ),
    name: "Rss",
    href: "/rss.xml",
    target: "_blank",
  },
  {
    component: <ThemeSwitcher />,
    name: "Theme",
  },
];

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-8">
        <Link href="/">
          <Image
            aria-hidden
            width={40}
            height={35}
            src="/logo.svg"
            alt="logo"
          />
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            {LINKS.map((link) => (
              <li key={link.name} className="hover:text-theme-600">
                {link.href ? (
                  <Link
                    key={link.name}
                    aria-label={link.name}
                    href={link.href}
                    target={link.target}
                  >
                    {link.component || link.name}
                  </Link>
                ) : (
                  link.component || link.name
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
