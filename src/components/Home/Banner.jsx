import { Button } from "../ui/button"
import outer from "@/assets/outercircle.png"
import inner from "@/assets/innercircle.png"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoveRight, Phone } from "lucide-react"
import { IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom"


const Banner = () => {
  return (
    <section className="">
      <div className="container">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">

          {/* Left content */}
          <div className="space-y-5 self-center">
            <h1 className=" font-bold leading-tight">
              UNPACK THE  MYSTERIES OF   <br /> THE UNIVERSE!
            </h1>

            <p className="text-muted-foreground">
              Learn about astrology, zodiac signs, retrogrades, and more!
              Your world becomes clear once you understand how the universe influences it.
            </p>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <Card className={"active:scale-97"}>
                <Link>

                  <CardHeader className="flex flex-row items-iten   justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <Phone className="h-5 w-5 " />
                      </span>
                      <span className="text-base font-semibold">
                        Talk
                      </span>
                    </CardTitle>
                    <CardAction className={"self-center"}>
                      <MoveRight className=" " />
                    </CardAction>
                  </CardHeader>
                </Link>
              </Card>
              <Card className={"active:scale-97"}>
                <Link>

                  <CardHeader className="flex flex-row items-iten  justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <IoIosChatbubbles className="h-5 w-5  " />
                      </span>
                      <span className="text-base font-semibold">
                        Chat


                      </span>
                    </CardTitle>
                    <CardAction className={"self-center"}>
                      <MoveRight className=" " />
                    </CardAction>
                  </CardHeader>
                </Link>
              </Card>
              <Card className={"active:scale-97"}>
                <Link>

                  <CardHeader className="flex flex-row items-iten  justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <Phone className="h-5 w-5  " />
                      </span>
                      <span className="text-base font-semibold">
                        Talk
                      </span>
                    </CardTitle>
                    <CardAction className={"self-center"}>
                      <MoveRight className=" " />
                    </CardAction>
                  </CardHeader>
                </Link>
              </Card>
              <Card className={"active:scale-97"}>
                <Link>
                  <CardHeader className="flex flex-row items-iten  justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <Phone className="h-5 w-5  " />
                      </span>
                      <span className="text-base font-semibold">
                        Talk
                      </span>
                    </CardTitle>
                    <CardAction className={"self-center"}>
                      <MoveRight className=" " />
                    </CardAction>
                  </CardHeader>
                </Link>
              </Card>



            </div>

            {/* <Button>Chat now</Button> */}
          </div>

          {/* Right animation */}
          <div className="relative flex items-center justify-center">

            {/* Outer rotating circle */}
            <img
              src={outer}
              alt=""
              className="
                w-[80%]
                animate-spin
                
              motion-safe:animation-duration-[20s]
              "
            />

            {/* Inner reverse rotating circle */}
            <img
              src={inner}
              alt=""
              className="
                absolute
                w-[85%]
              "
            />

          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner
