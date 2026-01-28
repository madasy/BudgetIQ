export interface NavItem {
    title: string;
    href?: string;
    items?: NavItem[];
}

export const docNavItems: NavItem[] = [
    {
        title: "Introduction",
        href: "/docs/introduction",
    },
    {
        title: "Installation",
        href: "/docs/installation",
    },
    {
        title: "Configuration",
        items: [
            {
                title: "Overview",
                href: "/docs/configuration",
            },
            {
                title: "Theme & Customization",
                href: "/docs/configuration/theme-config",
            },
        ],
    },
    {
        title: "Components",
        href: "/docs/components",
    },
    {
        title: "Routing",
        href: "/docs/routing",
    },
    {
        title: "Release",
        href: "/docs/release",
    },
];
