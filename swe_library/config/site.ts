export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Library",
	description: "Library Management System",
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
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
};
