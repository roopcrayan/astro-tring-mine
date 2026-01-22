import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import faviconlogo from "@/assets/favicon.png";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

const items = [
    { title: "Profile", url: "/astro/dashboard", icon: Home },
    { title: "Update Profile", url: "/astro/update-astro", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
    const { open, openMobile } = useSidebar()
    return (
        <Sidebar collapsible="icon"  >
            <SidebarHeader>
                <SidebarMenu >
                    <SidebarMenuItem >
                        <NavLink to="/" end className={"flex justify-center pt-2"}>
                            <img
                                src={faviconlogo}
                                className="h-8 w-8 rounded-md"
                                alt="Logo"
                            />
                            {openMobile && <span className="ml-2 font-bold text-lg">Astrologer</span> || open && <span className="ml-2 font-bold text-lg">Astrologer</span>}
                        </NavLink>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            {/* ✅ MENU ITEMS */}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild >
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 rounded-md px-3 py-2 transition
                        ${isActive
                                                    ? "bg-sedondary text-black"
                                                    : "hover:bg-primary"
                                                }`
                                            }
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
