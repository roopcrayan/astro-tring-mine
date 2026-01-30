import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userProfile, userRegister } from "@/redux/slice/UserAuth";
import { toast } from "react-toastify";
import { PhoneInput } from "./ui/phone-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { AstrologerProfile } from "@/redux/slice/AstroAuth";

/* ---------------- ZOD SCHEMAS ---------------- */

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(10, "Mobile must be at least 10 digits"),
    country_code: z.string().min(1, "Country code is required"),
    username: z.string().min(3, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ---------------- COMPONENT ---------------- */

const UserLogin = ({ ele }) => {
  const dispatch = useDispatch();
  const { user, error, loading, isLoggedIn } = useSelector((state) => state.userAuth);

  const [mode, setMode] = useState("login");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country_code: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });


  const [errors, setErrors] = useState({
    fields: {},
    form: "",
  });

  /* ---------------- EFFECT ---------------- */

  useEffect(() => {
    if (user) {
      setOpen(false);
      setForm({
        name: "",
        email: "",
        mobile: "",
        country_code: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: undefined },
      form: "",
    }));
  };




  const handleLogin = async (e) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse({
      username: form.username,
      password: form.password,
    });

    if (!parsed.success) {
      setErrors({
        fields: parsed.error.flatten().fieldErrors,
        form: "Please fix the errors below",
      });
      return;
    }

    try {
      await dispatch(userLogin(parsed.data)).unwrap();
      if (isLoggedIn) {
        toast.success("You are logged in");
      }
      setOpen(false);
      await dispatch(userProfile()).unwrap()
    } catch (err) {
      setErrors({
        fields: {},
        form: typeof err === "string" ? err : "Something went wrong",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const parsed = signupSchema.safeParse(form);

    if (!parsed.success) {
      setErrors({
        fields: parsed.error.flatten().fieldErrors,
        form: "Please fix the errors below",
      });
      return;
    }

    // Prepare data without confirmPassword
    const { confirmPassword, ...submitData } = parsed.data;

    console.log("Signup Data:", submitData);

    try {
      await dispatch(userRegister(submitData)).unwrap();
      toast.success("Register successful, please login");
      setMode("login");
    } catch (err) {
      setErrors({
        fields: {},
        form: typeof err === "string" ? err : "Something went wrong",
      });
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" flex gap-2">
          <User />
          {ele?.name || "Account"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center ">
            <h2 className="text-2xl text-black">
              {mode === "login" ? "Login" : "Create Account"}
            </h2>
          </DialogTitle>

          <DialogDescription className="sr-only">
            {mode === "login"
              ? "Enter your username and password to login"
              : "Fill the form to create a new account"}
          </DialogDescription>
        </DialogHeader>

        {(errors.form || error) && (
          <p className="text-red-600 text-sm text-center">
            {errors.form || error}
          </p>
        )}

        {/* ---------------- LOGIN ---------------- */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <Label className="mb-2">Username</Label>
              <Input name="username" onChange={handleChange} />
              {errors.fields.username && (
                <p className="text-red-600 text-sm">
                  {errors.fields.username[0]}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2">Password</Label>
              <Input type="password" name="password" onChange={handleChange} />
              {errors.fields.password && (
                <p className="text-red-600 text-sm">
                  {errors.fields.password[0]}
                </p>
              )}
            </div>

            <Button className="w-full  text-black" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <span
                className="text-black underline  cursor-pointer"
                onClick={() => {
                  setMode("signup");
                  setErrors({ fields: {}, form: "" });
                }}
              >
                Sign up
              </span>
            </p>
          </form>
        )}

        {/* ---------------- SIGNUP ---------------- */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <Label className="mb-2">Name</Label>
                <Input name="name" value={form.name} onChange={handleChange} />
                {errors.fields.name && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.name[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Email</Label>
                <Input name="email" value={form.email} onChange={handleChange} />
                {errors.fields.email && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.email[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Mobile</Label>
                <div className="flex">

                  <Input
                    type={"text"}
                    name="country_code"
                    value={form.country_code}
                    className={"w-[30%]"}
                    onChange={handleChange}
                  />
                  <Input
                    type={"text"}
                    name="mobile"
                    value={form.mobile}
                    className={"w-[70%]"}
                    onChange={handleChange}
                  />
                </div>
                {(errors.fields.mobile || errors.fields.country_code) && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.mobile?.[0] || errors.fields.country_code?.[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Username</Label>
                <Input name="username" value={form.username} onChange={handleChange} />
                {errors.fields.username && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.username[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Password</Label>
                <Input type="password" name="password" value={form.password} onChange={handleChange} />
                {errors.fields.password && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.password[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.fields.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.confirmPassword[0]}
                  </p>
                )}
              </div>
            </div>

            <Button className="w-full  " disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span
                className=" text-black underline font-semibold cursor-pointer"
                onClick={() => {
                  setMode("login");
                  setErrors({ fields: {}, form: "" });
                }}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserLogin;