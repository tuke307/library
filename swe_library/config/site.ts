export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Library",
	description: "Library Management System",
	siteUrl: "https://software-engineering-library.vercel.app",
	navItems: [
	{
		label: "Home",
		href: "/",
	}
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
};
