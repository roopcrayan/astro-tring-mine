import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LogOut,
    MenuIcon,
    Settings,
    User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSidebar } from '../ui/sidebar';
import { useSelector } from "react-redux";



const NavbarAstro = () => {
    const { toggleSidebar } = useSidebar();

   

    return (
        <nav className="border-b bg-white sticky   top-0 z-50">
            <div className="container mx-auto  px-4">
                <div className="flex h-14   items-center justify-between">
                    {/* Logo */}
                    <div className="flex  items-center gap-8">

                        <Button
                            variant="ghost"
                            size="icon"
                            className="    mr-2"
                            onClick={toggleSidebar}
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>

                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    {notifications > 0 && (
                                        <Badge 
                                            variant="destructive" 
                                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                        >
                                            {notifications}
                                        </Badge>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="max-h-96 overflow-y-auto">
                                    <DropdownMenuItem>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">New booking request</p>
                                            <p className="text-xs text-muted-foreground">
                                                Sharvan Rajput has a new appointment
                                            </p>
                                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">Payment received</p>
                                            <p className="text-xs text-muted-foreground">
                                                ₹120 from customer consultation
                                            </p>
                                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">New review posted</p>
                                            <p className="text-xs text-muted-foreground">
                                                5-star review from satisfied customer
                                            </p>
                                            <p className="text-xs text-muted-foreground">3 hours ago</p>
                                        </div>
                                    </DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="justify-center">
                                    View all notifications
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}

                        {/* User Profile */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="" alt="User" />
                                        <AvatarFallback className="bg-purple-600 text-white">
                                            AD
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">Admin User</p>
                                        <p className="text-xs text-muted-foreground">
                                            admin@astrodash.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard/profile" className="flex items-center cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard/settings" className="flex items-center cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarAstro;