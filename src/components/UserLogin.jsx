import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import z, { email } from "zod"

const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
})

const UserLogin = ({ ele }) => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault();
        const { data, error } = emailSchema.safeParse({ email });
        console.log({ data, error })
        if (error) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setEmail("");
        console.log("Email submitted:", data);
    };

    return (
        <>
            <Dialog   >
                <DialogTrigger asChild>
                    <Button className="text-white">
                        <User />
                        {ele.name}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"text-center   leading-tight! text-secondary rounded-sm"}>Continue with Email</DialogTitle>
                        <DialogDescription className={"text-center font-bold"}>
                            You will receive a 4 digit code
                            for verification
                        </DialogDescription>
                    </DialogHeader>
                    {step === 1 &&
                        <form  >
                        <div className="mt-4 flex flex-col gap-4">
                            <Label htmlFor="email">Your Email Address <span className="text-red-700">*</span></Label>
                            <Input
                                id="email"
                                placeholder="john@gmail.com"
                                defaultCountry="IN"   // 🇮🇳 India default
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {error && <p className="text-red-600 text-sm!">{error}</p>}

                            <Button onClick={handleSubmit} type="submit" className="w-full bg-secondary rounded-full text-white">
                                Get OTP
                            </Button>
                        </div>
                    </form>}
                  {step === 2 && <form  >
                        <div className="mt-4 flex flex-col gap-4">
                            <Label htmlFor="email">Your Email Address <span className="text-red-700">*</span></Label>
                            <Input
                                id="email"
                                placeholder="john@gmail.com"
                                defaultCountry="IN"   // 🇮🇳 India default
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {error && <p className="text-red-600 text-sm!">{error}</p>}

                            <Button onClick={handleSubmit} type="submit" className="w-full bg-secondary rounded-full text-white">
                                Get OTP
                            </Button>
                        </div>
                    </form>}
                </DialogContent>
            </Dialog>

        </>
    )
}

export default UserLogin
