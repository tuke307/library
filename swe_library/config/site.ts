export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Library",
	description: "Library Management System",
	siteUrl: "http://localhost:3000",
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
