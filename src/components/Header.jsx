import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { logout, userLogout, userProfile } from "@/redux/slice/UserAuth"
import { ChevronDown, Menu, User } from "lucide-react"
import { useEffect, useState } from "react"
import { GiStarShuriken } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import logo from "../assets/logo-light.png"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import UserLogin from "./UserLogin"
import { getHoroscope } from "@/redux/slice/HoroscopesSlice"
import { AstrologerLogout, AstrologerProfile, GetAllAstrologer } from "@/redux/slice/AstroAuth"

// Move MobileNavSection outside the main component
const MobileNavSection = ({ navItems, title }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-1">
      {navItems.map((item, index) => {
        if (item.type === "btn") return null

        return (
          <div key={index}>
            <div
              className="flex items-center justify-between px-2 py-2 text-sm font-medium cursor-pointer rounded-md"
              onClick={item.hasmenu ? () => toggleMenu(index) : undefined}
            >
              {!item.hasmenu ? (
                <SheetClose asChild >
                  <Link to={item.path} className="flex items-center">
                    <GiStarShuriken className=" text-primary size-4 me-2" />
                    {item.name}
                  </Link>
                </SheetClose>
              ) : (
                <>
                  <span className="flex items-center">  <GiStarShuriken className=" text-primary size-4 me-2" />
                    {item.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </>
              )}
            </div>

            {/* Dropdown with Transition */}
            {item.hasmenu && (
              <div
                className={`overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
              >
                <div className="ml-4 mt-1 space-y-1 border-l border-accent pl-2">
                  {item.menu.map((menuItem, menuIndex) => (
                    <SheetClose asChild key={menuIndex}>
                      <Link
                        to={menuItem.path}
                        className="flex px-2 py-1.5 text-sm   rounded-md"
                      >
                        <GiStarShuriken className=" text-primary size-4 me-2" />
                        {menuItem.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const Header = () => {
  const [openMenu, setOpenMenu] = useState({ row: null, index: null });
  const [horosType, setHorosType] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.userAuth);
  const { astrologer } = useSelector((state) => state.astroAuth);
  const { horoscope, loading } = useSelector((state) => state.horoscope);
  const dispatch = useDispatch();

  // Navrow2 now uses the horosType state
  const Navrow2 = [
    {
      name: "Horoscopes",
      path: "/best-astrologers",
      type: "link",
      hasmenu: horosType.length > 0,
      menu: horosType
    },
    // { name: "Chat with Astrologer", path: "/chat-with-astrologer", type: "link", hasmenu: false },
    { name: "Talk / Call to Astrologer", path: "/talk-to-astrologer", type: "link", hasmenu: false },
    {
      name: "Shop", path: "", type: "link", hasmenu: true, menu: [
        { label: "Gemstones", path: "/astromall/gemstones" },
        { label: "Yantras", path: "/astromall/yantras" },
      ]
    },
    { name: "Blogs", path: "/blogs", type: "link", hasmenu: false },
  ]

  /* ------------------ FETCH USER WHEN TOKEN EXISTS ------------------ */
  useEffect(() => {
    const role = localStorage.getItem("role_id")
    if (token) {
      if (role == 2) {
        if (!astrologer) {
          dispatch(AstrologerProfile())
        }
      } else {
        if (!user) {
          dispatch(userProfile());
        }
      }
    }
  }, [token, dispatch, user, astrologer]);


  /* ------------------ STORAGE SYNC (MULTI TAB LOGOUT) ------------------ */
  useEffect(() => {
    const handleStorage = () => {
      if (!localStorage.getItem("token")) {
        dispatch(logout());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [dispatch]);

  /* ------------------ LOGOUT ------------------ */
  const logoutUser = async () => {
    setIsDropdownOpen(false);
    const role = localStorage.getItem("role_id")
    try {
      if (role == 2) {
        await dispatch(AstrologerLogout()).unwrap();
      } else {
        await dispatch(userLogout()).unwrap();
      }

      localStorage.removeItem("token")
      localStorage.removeItem("role_id")

      toast.success("You are logged out", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      navigate("/");

    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };


  const fatchAstrologers = async () => {
    await dispatch(GetAllAstrologer()).unwrap();
  }

  const LogoutAstro = async () => {

  }

  const getHorescopes = async () => {
    try {
      await dispatch(getHoroscope()).unwrap()
    } catch (error) {
      console.log(error.message)
    }
  }

  const getAllllTypes = () => {
    try {
      const horosSet = new Set();
      const horos = [];

      horoscope?.forEach((ele) => {
        if (ele.type && !horosSet.has(ele.type)) {
          horosSet.add(ele.type);
          horos.push({
            label: ele.type.charAt(0).toUpperCase() + ele.type.slice(1) + " Horoscope",
            path: `/horoscopes/${ele.type.toLowerCase()}`
          });
        }
      });

      setHorosType(horos);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (!horoscope) {
      getHorescopes()
    }
  }, [horoscope])

  useEffect(() => {
    if (horoscope?.length > 0) {
      getAllllTypes()
    }
  }, [horoscope])

  const mobileMenus = [...Navrow2]

  // Handle dropdown item clicks
  const handleDropdownItemClick = (callback) => {
    return () => {
      if (callback) {
        callback();
      }
      setIsDropdownOpen(false);
    };
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center space-x-6">
          {Navrow2.map((ele, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => ele.hasmenu && setOpenMenu({ row: 2, index })}
              onMouseLeave={() => ele.hasmenu && setOpenMenu({ row: null, index: null })}
            >
              {ele.hasmenu ? (
                <button className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  <span>{ele.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to={ele.path}
                  className="text-sm font-medium flex items-center transition-colors hover:text-primary"
                >
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  {ele.name}
                </Link>
              )}

              {/* DROPDOWN */}
              {ele.hasmenu && openMenu.row === 2 && openMenu.index === index && (
                <div className="absolute left-0  top-full mt-0 w-56 rounded-md border bg-popover p-1 shadow-md">
                  <ScrollArea className="max-h-96">
                    {ele.menu.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className=" px-3 py-2 text-sm rounded-sm flex items-center hover:bg-primary/70 hover:text-black"
                      >
                        <GiStarShuriken className=" size-4 me-2" /> {item.label}
                      </Link>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          ))}

          {/* AUTH SECTION */}
          <div>
            {(localStorage.getItem("token") && (user?.username || astrologer?.username)) ? (
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.avatar || astrologer?.profile_image}
                        alt={user?.username || astrologer?.username}
                      />
                      <AvatarFallback>
                        {(astrologer?.username?.charAt(0) || user?.username?.charAt(0) || 'U').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <Link
                      to="/update-user"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.username || astrologer?.username}
                        </p>
                      </div>
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />


                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleDropdownItemClick(() => navigate('/dashboard/profile'))}
                  >
                    Dashboard
                  </DropdownMenuItem>

                  {/* {localStorage.getItem("role_id") !== "2" && ( */}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleDropdownItemClick(logoutUser)}
                  >
                    Logout
                  </DropdownMenuItem>
                  {/* )} */}
                  {/* {localStorage.getItem("role_id") === "2" && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleDropdownItemClick(LogoutAstro)}
                    >
                      Astrologer Logout
                    </DropdownMenuItem>
                  )} */}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <UserLogin />
            )}
          </div>
        </nav>

        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild >
                  <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                  </Link>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
              <MobileNavSection navItems={mobileMenus} />
              {(localStorage.getItem("token") && (user?.username || astrologer?.username)) ? (
                <div className="mt-4 px-2 space-y-2">
                  <div className="flex items-center gap-3 p-2 border rounded-md">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.avatar || astrologer?.profile_image}
                        alt={user?.username || astrologer?.username}
                      />
                      <AvatarFallback>
                        {(astrologer?.username?.charAt(0) || user?.username?.charAt(0) || 'U').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user?.username || astrologer?.username}</p>
                    </div>
                  </div>
                  {localStorage.getItem("role_id") === "2" ? (
                    <>
                      <SheetClose asChild>
                        <Button
                          onClick={() => navigate('/astro/dashboard')}
                          variant="outline"
                          className="w-full"
                        >
                          Dashboard
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          onClick={LogoutAstro}
                          variant="outline"
                          className="w-full"
                        >
                          Astrologer Logout
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Button onClick={logoutUser} variant="outline" className="w-full">
                        Logout
                      </Button>
                    </SheetClose>
                  )}
                </div>
              ) : (
                <div className="mt-4 px-2">
                  <UserLogin />
                </div>
              )}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;