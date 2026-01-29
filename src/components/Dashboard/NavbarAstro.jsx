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
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from '../ui/sidebar';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth";
import { toast } from "react-toastify";
import { userProfile } from "@/redux/slice/UserAuth";



const NavbarAstro = () => {
    const { toggleSidebar } = useSidebar();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { astrologer, loading } = useSelector(
        (state) => state.astroAuth
    );
    const { token, user } = useSelector((state) => state.userAuth);
    const hasFetched = useRef(false);

    const role = localStorage.getItem("role_id")

    useEffect(() => {
        if (!token) return;
        if (role == 2) {
            dispatch(AstrologerProfile());
        } else {
            dispatch(userProfile());
        }
    }, [token, role, dispatch]);

    const LogoutAstro = async () => {
        toast.success('Astrologer logged out', {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
        await dispatch(AstrologerLogout()).unwrap();
        navigate("/")
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        // await fatchAstrologers();
    }

    return (
        <nav className="  bg-yellow-50 sticky   top-0 z-50">
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
                                        <AvatarImage src={user?.avatar || astrologer?.avatar} alt={user?.username} />
                                        <AvatarFallback className="bg-purple-600 text-white">
                                            {astrologer?.username.charAt(0).toUpperCase() || user?.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-auto">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user?.username || astrologer?.username}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {user?.email || astrologer?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard/settings" className="flex items-center cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Back to Home
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {astrologer?.role_id === 2 && <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={LogoutAstro}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </nav >
    );
};

export default NavbarAstro;