import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import z from "zod";
import axios from "axios";

/* ---------------- ZOD SCHEMAS ---------------- */

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    username: z.string().min(3, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ---------------- COMPONENT ---------------- */

const UserLogin = ({ ele, getuser }) => {
  const [mode, setMode] = useState("login"); // login | signup

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fields: {},
    form: "",
  });

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: undefined },
      form: "",
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { success, data, error } = loginSchema.safeParse(form);

    if (!success) {
      setErrors({
        fields: error.flatten().fieldErrors,
        form: "Please fix the errors below",
      });
      return;
    }

    setErrors({ fields: {}, form: "" });
    localStorage.setItem("user", JSON.stringify({ token: "token", ...data }));
    getuser()
    console.log("LOGIN DATA 👉", data);
  };

  const handleSignup =   (e) => {
    e.preventDefault();

    const { success, data, error } = signupSchema.safeParse(form);

    if (!success) {
      setErrors({
        fields: error.flatten().fieldErrors,
        form: "Please fix the errors below",
      });
      return;
    }

    setErrors({ fields: {}, form: "" });
    
    console.log("SIGNUP DATA 👉", data);
  };

  /* ---------------- UI ---------------- */

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white">
          <User />
          {ele.name}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-secondary">
            {mode === "login" ? "Login" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        {/* ---------- GLOBAL ERROR ---------- */}
        {errors.form && (
          <p className="text-red-600 text-sm text-center">{errors.form}</p>
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

            <Button className="w-full bg-secondary text-white">
              Login
            </Button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <span
                className="text-secondary cursor-pointer"
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
                <Input name="name" onChange={handleChange} />
                {errors.fields.name && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.name[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Email</Label>
                <Input name="email" onChange={handleChange} />
                {errors.fields.email && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.email[0]}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Phone</Label>
                <Input name="phone" onChange={handleChange} />
                {errors.fields.phone && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.phone[0]}
                  </p>
                )}
              </div>

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
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
                {errors.fields.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {errors.fields.confirmPassword[0]}
                  </p>
                )}
              </div>
            </div>

            <Button className="w-full bg-secondary text-white">
              Sign Up
            </Button>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span
                className="text-secondary cursor-pointer"
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
