import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo-light.png"
import { use, useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { ChevronDown, Menu, MenuIcon, User } from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { GiStarShuriken } from "react-icons/gi";
import UserLogin from "./UserLogin"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navrow1 = [
  {
    name: "Free Kundli",
    path: "/free-kundli",
    type: "link",
    hasmenu: false,
  },
  {
    name: "Kundli Matching",
    path: "/kundli-matching",
    type: "link",
    hasmenu: false,
  },
  {
    name: "Compatibility",
    path: "/compatibility",
    type: "link",
    hasmenu: false,
  },
  {
    name: "Calculators",
    path: "/",
    type: "link",
    hasmenu: true,
    menu: [
      { label: "Love Calculator", path: "/love-calculator" },
      { label: "Atmakaraka and Darakaraka Calculator", path: "/atmakaraka-and-darakaraka-calculator" },
      { label: "Numerology Calculator", path: "/name-numerology-calculator" },
      { label: "Sun Sign Calculator", path: "/sun-sign-calculator" },
      { label: "Rising Sign Calculator / Ascendant Calculator", path: "/rising-ascendant-sign-calculator" },
      { label: "Rashi Calculator", path: "/rashi-moon-sign-calculator" },
      { label: "Dasha Calculator", path: "/dasha-calculator" },
      { label: "Nakshatra Calculator", path: "/nakshatra-birth-star-calculator" },
      { label: "Mangal Dosha Calculator", path: "/mangal-kuja-dosha-calculator" },
      { label: "Shani Sade Sati Calculator", path: "/shani-sade-sati-calculator" },
      { label: "Moon Phase Calculator", path: "/moon-phase-calculator" },
      { label: "Birth Chart Calculator / Natal Chart Calculator", path: "/birth-natal-chart-calculator" },
      { label: "Flames Calculator", path: "/flames-calculator" },
      { label: "Lucky Vehicle Number Calculator", path: "/lucky-vehicle-number-calculator" },
      { label: "Friendship Calculator", path: "/friendship-calculator" },
      { label: "Kaal Sarp Dosh Calculator", path: "/kaal-sarp-dosh-calculator" },
      { label: "Ishta Devata Calculator", path: "/ishta-devata-calculator" },
      { label: "Lo Shu Grid Calculator", path: "/lo-shu-grid-calculator" },
      { label: "Transit Chart Calculator", path: "/transit-chart-calculator" },
      { label: "Name Compatibility Calculator", path: "/name-compatibility-calculator" },
      { label: "Age Calculator", path: "/age-calculator" },
      { label: "Mulank Calculator", path: "/mulank-calculator" },
      { label: "Mobile Number Numerology Calculator", path: "/mobile-number-numerology-calculator" },
      { label: "Destiny Number Calculator", path: "/destiny-number-calculator" },
      { label: "Lucky Name Numerology Calculator", path: "/lucky-name-numerology-calculator" },
    ],
  },
  {
    name: "Horoscopes",
    path: "/",
    type: "link",
    hasmenu: true,
    menu: [
      { label: "Horoscope 2026", path: "/horoscope-2025" },
      { label: "Today's Horoscope", path: "/horoscope/todays-horoscope" },
      { label: "Weekly Horoscope", path: "/horoscope/weekly-horoscope" },
      { label: "Monthly Horoscope", path: "/horoscope/monthly-horoscope" },
      { label: "Yearly Horoscope", path: "/horoscope/yearly-horoscope" },
      { label: "Daily Horoscope", path: "/horoscope/daily-horoscope" },
      { label: "Free Kundali", path: "/freekundali" },
      { label: "Tomorrow's Horoscope", path: "/horoscope/tomorrow-horoscope" },
      { label: "Yesterday's Horoscope", path: "/horoscope/yesterday-horoscope" },
      { label: "Chinese Horoscope", path: "/chinese-astrology" },
    ],
  },

]

const IndianCityWiseAstrologers = [
  { label: "Astrologers in Delhi", path: "/astrologer/india/delhi" },
  { label: "Astrologers in Gurgaon", path: "/astrologer/india/gurgaon" },
  { label: "Astrologers in Noida", path: "/astrologer/india/noida" },
  { label: "Astrologers in Mumbai", path: "/astrologer/india/mumbai" },
  { label: "Astrologers in Kolkata", path: "/astrologer/india/kolkata" },
  { label: "Astrologers in Bangalore", path: "/astrologer/india/bangalore" },
  { label: "Astrologers in Pune", path: "/astrologer/india/pune" },
  { label: "Astrologers in Lucknow", path: "/astrologer/india/lucknow" },
  { label: "Astrologers in Chandigarh", path: "/astrologer/india/chandigarh" },
  { label: "Astrologers in Chennai", path: "/astrologer/india/chennai" },
  { label: "Astrologers in Hyderabad", path: "/astrologer/india/hyderabad" },
  { label: "Astrologers in Ahmedabad", path: "/astrologer/india/ahmedabad" },
  { label: "Astrologers in Jaipur", path: "/astrologer/india/jaipur" },
  { label: "Astrologers in Nagpur", path: "/astrologer/india/nagpur" },
  { label: "Astrologers in Patna", path: "/astrologer/india/patna" },
  { label: "Astrologers in Ludhiana", path: "/astrologer/india/ludhiana" },
  { label: "Astrologers in Jalandhar", path: "/astrologer/india/jalandhar" },
  { label: "Astrologers in Amritsar", path: "/astrologer/india/amritsar" },
  { label: "Astrologers in Guwahati", path: "/astrologer/india/guwahati" },
  { label: "Astrologers in Gujarat", path: "/astrologer/india/gujarat" },
  { label: "Astrologers in Indore", path: "/astrologer/india/indore" },
  { label: "Astrologers in Bhubaneswar", path: "/astrologer/india/bhubaneswar" },
  { label: "Astrologers in Surat", path: "/astrologer/india/surat" },
  { label: "Astrologers in Bhopal", path: "/astrologer/india/bhopal" },
  { label: "Astrologers in Varanasi", path: "/astrologer/india/varanasi" },
  { label: "Astrologers in Navi Mumbai", path: "/astrologer/india/navi-mumbai" },
  { label: "Astrologers in Allahabad", path: "/astrologer/india/allahabad" },
  { label: "Astrologers in Howrah", path: "/astrologer/india/howrah" },
  { label: "Astrologers in Ranchi", path: "/astrologer/india/ranchi" },
  { label: "Astrologers in Jodhpur", path: "/astrologer/india/jodhpur" },
  { label: "Astrologers in Madurai", path: "/astrologer/india/madurai" },
  { label: "Astrologers in Raipur", path: "/astrologer/india/raipur" },
  { label: "Astrologers in Kharagpur", path: "/astrologer/india/kharagpur" },
  { label: "Astrologers in Jamshedpur", path: "/astrologer/india/jamshedpur" },
  { label: "Astrologers in Cuttack", path: "/astrologer/india/cuttack" },
  { label: "Astrologers in Kochi", path: "/astrologer/india/kochi" },
  { label: "Astrologers in Dehradun", path: "/astrologer/india/dehradun" },
  { label: "Astrologers in Durgapur", path: "/astrologer/india/durgapur" },
  { label: "Astrologers in Asansol", path: "/astrologer/india/asansol" },
  { label: "Astrologers in Ujjain", path: "/astrologer/india/ujjain" },
  { label: "Astrologers in Siliguri", path: "/astrologer/india/siliguri" },
  { label: "Astrologers in Jammu", path: "/astrologer/india/jammu" },
  { label: "Astrologers in Udaipur", path: "/astrologer/india/udaipur" },
  { label: "Astrologers in Haridwar", path: "/astrologer/india/haridwar" },
  { label: "Astrologers in South Delhi", path: "/astrologer/india/south-delhi" },
  { label: "Astrologers in Coimbatore", path: "/astrologer/india/coimbatore" },
  { label: "Astrologers in Vijayawada", path: "/astrologer/india/vijayawada" },
  { label: "Astrologers in Panchkula", path: "/astrologer/india/panchkula" },
  { label: "Astrologers in Salem", path: "/astrologer/india/salem" },
  { label: "Astrologers in Ambala", path: "/astrologer/india/ambala" },
  { label: "Astrologers in Vellore", path: "/astrologer/india/vellore" },
  { label: "Astrologers in Shimla", path: "/astrologer/india/shimla" },
]

const Navrow2 = [
  {
    name: "Best Astrologers",
    path: "/best-astrologers",
    type: "link",
    hasmenu: true,
    menu: IndianCityWiseAstrologers
  },
  {
    name: "Chat with Astrologer",
    path: "/chat-with-astrologer",
    type: "link",
    hasmenu: false,

  },
  {
    name: "Talk to Astrologer",
    path: "/talk-to-astrologer",
    type: "link",
    hasmenu: false,

  },
  {
    name: "Astromall",
    path: "/astromall",
    type: "link",
    hasmenu: false,

  },
  {
    name: "Astrotalk Store",
    path: "/store",
    type: "link",
    hasmenu: false,
  },
]



const Header = () => {
  const [openMenu, setOpenMenu] = useState({ row: null, index: null })
  const [user, setUser] = useState(null);
  const getuser = () => {
    try {
      localStorage.getItem("user") && setUser(JSON.parse(localStorage.getItem("user")));

    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getuser();
  }, [])

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }





  return (
    <header className="py-2 shadow-sm! shadow-primary">
      <div className="container">
        <div className="flex justify-between items-center">

          <div className="logo">
            <Link to="/">
              <img src={logo} className="2xl:h-15 xl:h-12 md:h-10  h-8" alt="" />
            </Link>
          </div>

          <div className="links xl:block hidden">

            {/* ========= ROW 1 ========= */}
            {/* <ul className="flex justify-end pt-2 2xl:gap-3 gap-0">
              {Navrow1.map((ele, index) => (
                <li
                  key={ele.name}
                  className="relative xl:text-md! text-sm! font-medium me-1 px-2 py-1 group "
                  onMouseEnter={() => setOpenMenu({ row: 1, index })}
                  onMouseLeave={() => setOpenMenu({ row: null, index: null })}
                >
                  {!ele.hasmenu ? (<div className="flex items-center gap-3">
                    <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                    <NavLink to={ele.path}>  {ele.name}</NavLink>
                  </div>
                  ) : (
                    <span className="cursor-pointer flex items-center gap-1">
                      <div className="flex items-center gap-3">
                        <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                        {ele.name}
                      </div>
                      <ChevronDown className="size-5 group-hover:rotate-180 transition-all duration-75" />
                    </span>
                  )}

                  {ele.hasmenu &&
                    openMenu.row === 1 &&
                    openMenu.index === index && (
                      <div className="absolute right-0 top-full z-50 border-b-4 border-primary   overflow-hidden rounded-sm!">


                        <ScrollArea className={`h-100
                           ${ele.name === "Calculators"
                            ? "w-80"
                            : ele.name === "Horoscopes"
                              ? "w-52"
                              : "w-auto"
                          } rounded-sm border border-gray-200 bg-white shadow-md`}
                        >
                          <ul>
                            {ele.menu.map((item) => (
                              <li
                                key={item.label}
                                className="px-4 py-2 text-sm flex items-center gap-2 group  font-lighte text-primary hover:text-white hover:font-semibold hover:bg-primary "
                              >

                                <GiStarShuriken className="" />
                                <Link to={item.path}>{item.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    )}
                </li>
              ))}
            </ul> */}



            {/* ========= ROW 2 ========= */}
            <ul className="flex justify-end items-center py-2 2xl:gap-3 gap-0">
              {Navrow2.map((ele, index) => (
                <li
                  key={ele.name}
                  className="relative xl:text-md!
                   text-sm! font-medium me-1 px-2  group"
                  onMouseEnter={() => setOpenMenu({ row: 2, index })}
                  onMouseLeave={() => setOpenMenu({ row: null, index: null })}
                >
                  {!ele.hasmenu ? (
                    <div className="flex items-center gap-3">
                      <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                      <Link to={ele.path}>  {ele.name}</Link>
                    </div>
                  ) : (
                    <span className="cursor-pointer flex items-center gap-2">
                      <div className="flex items-center gap-3">
                        <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                        {ele.name}
                      </div>
                      <ChevronDown className="size-5 group-hover:rotate-180 transition-all duration-75" />
                    </span>
                  )}

                  {ele.hasmenu &&
                    openMenu.row === 2 &&
                    openMenu.index === index && (
                      <div className="absolute right-0 top-full z-50 border-b-4 border-primary   overflow-hidden rounded-sm">

                        <ScrollArea className="h-97.5 w-62.5 rounded-sm border border-gray-200 bg-white shadow-md">
                          <ul>
                            {ele.menu.map((item) => (
                              <li
                                key={item.label}
                                className="px-4 py-2 text-sm flex items-center gap-2 group  font-lighte text-primary hover:text-white hover:font-semibold hover:bg-primary "
                              >
                                <GiStarShuriken />

                                <Link to={item.path}>{item.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    )}
                </li>
              ))}

              <li>
                {
                  user?.username ?
                    <DropdownMenu className="">
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className={"border-accent  "} align="end">
                        <div className="flex flex-col items-center gap-1">
                          <Avatar className={"size-17 mb-0"}>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <DropdownMenuLabel className="text-center">
                            <span className="text-md capitalize font-bold text-secondary">   {user?.username}</span>
                            <br />
                            <span className="text-xs">{+911234567895}</span>
                          </DropdownMenuLabel>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={logout}>Logout</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    :
                    <UserLogin ele={{ name: "Login" }} getuser={getuser} />
                }
              </li>
            </ul>


          </div>
          <div className=" xl:hidden flex  items-center gap-2">

            <Sheet >
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>

              <SheetContent side="left" className={"scroll-y-auto xl:hidden"}>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-4">
                  <MobileNavSection navItems={mobileMenus} title="Quick Links" />
                </div>
              </SheetContent>
            </Sheet>
            <Button className="text-white">
              <User />
              Login
            </Button>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

const mobileMenus = [...Navrow1, ...Navrow2]

const MobileNavSection = ({ navItems, title }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="overflow-y-scroll">
      {/* {title && (
        <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
      )} */}

      {navItems.map((item, index) => {
        if (item.type === "btn") return null

        return (
          <div key={item.name} className="border-b border-gray-100">
            <div
              className={`flex items-center justify-between   px-4 py-3 ${item.hasmenu ? "cursor-pointer" : ""
                }`}
              onClick={item.hasmenu ? () => toggleMenu(index) : undefined}
            >
              {!item.hasmenu ? (
                <Link to={item.path} className="flex-1 font-semibold ">
                  <div className="flex items-center gap-3">
                    <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                    {item.name}
                  </div>
                </Link>
              ) : (
                <>
                  <span className="flex-1 font-semibold ">
                    <div className="flex items-center gap-3">
                      <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                      {item.name}
                    </div>
                  </span>
                  <ChevronDown
                    className={`size-5  transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </>
              )}
            </div>

            {/* Dropdown with Transition */}
            {item.hasmenu && (
              <div
                className={`transition-all duration-300 ease-in-out bg-gray-50 ${openIndex === index ? "max-h-100 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
              >
                <div className={`${openIndex === index ? "overflow-y-auto max-h-87.5" : ""}`}>
                  <ul className="py-2">
                    {item.menu.map((menuItem) => (
                      <li key={menuItem.label}>
                        <Link
                          to={menuItem.path}
                          className=" gap-2 px-6 py-2 text-sm flex items-center  hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <GiStarShuriken className="text-primary group-hover:rotate-45 transition-all duration-100" />
                          {menuItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

