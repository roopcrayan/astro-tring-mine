import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, Menu, User } from "lucide-react"
import { useEffect, useState } from "react"
import { GiStarShuriken } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import logo from "../assets/logo-light.png"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import UserLogin from "./UserLogin"
import { getHoroscope } from "@/redux/slice/HoroscopesSlice"
import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth"
import { userLogin, userLogout, userProfile } from "@/redux/slice/UserAuth"

// Mobile Navigation Section Component
const MobileNavSection = ({ navItems }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-1">
      {navItems.map((item, index) => (
        <div key={index}>
          <div
            className="flex items-center justify-between px-2 py-2 text-sm font-medium cursor-pointer rounded-md"
            onClick={item.hasmenu ? () => toggleMenu(index) : undefined}
          >
            {!item.hasmenu ? (
              <SheetClose asChild>
                <Link to={item.path} className="flex items-center">
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  {item.name}
                </Link>
              </SheetClose>
            ) : (
              <>
                <span className="flex items-center">
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  {item.name}
                </span>
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
                      className="flex px-2 py-1.5 text-sm rounded-md"
                    >
                      <GiStarShuriken className="text-primary size-4 me-2" />
                      {menuItem.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const Header = () => {
  const [openMenu, setOpenMenu] = useState({ row: null, index: null })
  const [horosType, setHorosType] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { astrologer } = useSelector((state) => state.astroAuth)
  const { user } = useSelector((state) => state.userAuth)
  const { horoscope } = useSelector((state) => state.horoscope)
  const [role, setRole] = useState(localStorage.getItem("role_id"))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const moveToDashboard = () => {
    setIsDropdownOpen(false)
    navigate("/dashboard/profile")
  }


  useEffect(() => {
    const storedRole = localStorage.getItem("role_id")
    setRole(storedRole)
  }, [])


  const uprofile = async () => {
    await dispatch(userProfile()).unwrap()
  }

  const astprofile = async () => {
    await dispatch(AstrologerProfile()).unwrap()
  }


  useEffect(() => {
    if (role == 2 && !astrologer) {
      dispatch(AstrologerProfile())
    }

    if (role == 3 && !user) {
      dispatch(userProfile())
    }
  }, [dispatch, role, astrologer, user])


  const logout = async () => {
    setIsDropdownOpen(false)

    try {
      if (role == 2) {
        await dispatch(AstrologerLogout()).unwrap()
      }
      if (role == 3) {
        await dispatch(userLogout()).unwrap()
      }

      localStorage.removeItem("token")
      localStorage.removeItem("role_id")

    } catch (err) {
      console.log(err)
    }
  }

  // Mock user data for design
  const mockUser = {
    username: "John Doe",
    avatar: null
  }



  // Navigation items with dynamic horoscope menu
  const navigationItems = [
    {
      name: "Horoscopes",
      path: "/best-astrologers",
      type: "link",
      hasmenu: horosType.length > 0,
      menu: horosType
    },
    {
      name: "Chat / Call to Astrologer",
      path: "/talk-to-astrologer",
      type: "link",
      hasmenu: false
    },
    {
      name: "Store",
      path: "https://store.adkrayons.com/",
      type: "link",
      hasmenu: false
    },
    {
      name: "Blogs",
      path: "/blogs",
      type: "link",
      hasmenu: false
    },
  ]

  /* ------------------ FETCH HOROSCOPES ------------------ */
  useEffect(() => {
    if (!horoscope) {
      const fetchHoroscopes = async () => {
        try {
          await dispatch(getHoroscope()).unwrap()
        } catch (error) {
          console.log(error.message)
        }
      }
      fetchHoroscopes()
    }
  }, [horoscope, dispatch])

  /* ------------------ GENERATE HOROSCOPE TYPES MENU ------------------ */
  useEffect(() => {
    if (horoscope?.length > 0) {
      try {
        const horosSet = new Set()
        const horos = []

        horoscope.forEach((ele) => {
          if (ele.type && !horosSet.has(ele.type)) {
            horosSet.add(ele.type)
            horos.push({
              label: ele.type.charAt(0).toUpperCase() + ele.type.slice(1) + " Horoscope",
              path: `/horoscopes/${ele.type.toLowerCase()}`
            })
          }
        })

        setHorosType(horos)
      } catch (error) {
        console.log(error.message)
      }
    }
  }, [horoscope])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.hasmenu && setOpenMenu({ row: 2, index })}
              onMouseLeave={() => item.hasmenu && setOpenMenu({ row: null, index: null })}
            >
              {item.hasmenu ? (
                <button className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to={item.path}
                  target={item.name === "Store" ? "_blank" : "_self"}

                  className="text-sm font-medium flex items-center transition-colors hover:text-primary"
                >
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  {item.name}
                </Link>
              )}

              {/* DROPDOWN */}
              {item.hasmenu && openMenu.row === 2 && openMenu.index === index && (
                <div className="absolute left-0 top-full mt-0 w-56 rounded-md border bg-popover p-1 shadow-md">
                  <ScrollArea className="max-h-96">
                    {item.menu.map((menuItem, idx) => (
                      <Link
                        key={idx}
                        to={menuItem.path}
                        className="px-3 py-2 text-sm rounded-sm flex items-center hover:bg-primary/70 hover:text-black"
                      >
                        <GiStarShuriken className="size-4 me-2" />
                        {menuItem.label}
                      </Link>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          ))}

          {/* AUTH SECTION - DESKTOP */}
          <div>
            {
              (astrologer?.name || user?.name) ? (
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user ? user?.profile_image : astrologer?.profile_image}
                          alt={mockUser.username}
                        />
                        <AvatarFallback>
                          {/* {mockUser.username.charAt(0).toUpperCase()} */}
                          {(astrologer?.name || user?.name)?.charAt(0).toUpperCase()}

                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">

                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {astrologer?.name || user?.name}
                        </p>
                      </div>

                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => moveToDashboard()}
                    >
                      Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => logout()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) :
                (
                  <UserLogin />
                )
            }
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
                <SheetClose asChild>
                  <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                  </Link>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
              <MobileNavSection navItems={navigationItems} />

              {/* USER SECTION - MOBILE */}
              <div className="mt-4 px-2 space-y-2">
                <div className="flex items-center gap-3 p-2 border rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user ? user?.profile_image : astrologer?.profile_image}
                      alt={mockUser.username}
                    />
                    <AvatarFallback>
                      {(astrologer?.name || user?.name)?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium"> {astrologer?.name || user?.name}</p>
                  </div>
                </div>

                <SheetClose asChild>
                  <Button variant="outline" onClick={() => moveToDashboard()} className="w-full bg-primary rounded-full">
                    Dashboard
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="destructive" className="w-full rounded-2xl">
                    Logout
                  </Button>
                </SheetClose>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div >
    </header >
  )
}

export default Header