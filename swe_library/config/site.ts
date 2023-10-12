export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Library",
  description: "Library Management System",
  siteUrl: "http://localhost:3000",
  navItems: [
    {
      label: "Mitarbeiterlogin",
      href: "/employee-login",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  navMenuItems: [
    {
      label: "Mitarbeiterlogin",
      href: "/employee-login",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
