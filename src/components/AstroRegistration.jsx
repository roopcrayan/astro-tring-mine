import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";

const AstroRegister = () => {
    const [form, setForm] = useState({
        name: "",
        dob: "",
        gender: "",
        language: "",
        skills: "",
        phone: "",
        email: "",
        mobile: "",
        hours: "",
        username: "",
        password: "",
        confirmPassword: "",
        image: null,
        imagePreview: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelect = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setForm((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log("Form Data:", form);
        alert("Registration Successful!");
    };

    const labelStyle = {
        color: "var(--secondary)",
        marginBottom: "6px",
        display: "block",
    };

    return (
        <div className="max-w-3xl mb-10 mx-auto p-6 border rounded-lg mt-10">
            <h2 className="text-2xl text-center mb-6">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Image */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden">
                        {form.imagePreview ? (
                            <img
                                src={form.imagePreview}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-10 h-10 text-gray-400" />
                        )}
                    </div>
                    <Input type="file" accept="image/*" onChange={handleImage} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label style={labelStyle}>Name</Label>
                        <Input name="name" onChange={handleChange} />
                    </div>

                    <div>
                        <Label style={labelStyle}>Date of Birth</Label>
                        <Input type="date" name="dob" onChange={handleChange} />
                    </div>

                    <div>
                        <Label style={labelStyle}>Gender</Label>
                        <div className="flex gap-3 mt-1">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        onChange={handleChange}
                                    />
                                    {g}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label style={labelStyle}>Language</Label>
                        <Select onValueChange={(v) => handleSelect("language", v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Hindi">Hindi</SelectItem>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Hindi, English">
                                    Hindi, English
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label style={labelStyle}>Skills</Label>
                        <Select onValueChange={(v) => handleSelect("skills", v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Tarot">Tarot</SelectItem>
                                <SelectItem value="Vedic">Vedic</SelectItem>
                                <SelectItem value="Numerology">Numerology</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label style={labelStyle}>Phone Type</Label>
                        <Select onValueChange={(v) => handleSelect("phone", v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Android">Android</SelectItem>
                                <SelectItem value="iPhone">iPhone</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label style={labelStyle}>Email</Label>
                        <Input name="email" onChange={handleChange} />
                    </div>

                    <div>
                        <Label style={labelStyle}>Mobile</Label>
                        <Input name="mobile" maxLength={10} onChange={handleChange} />
                    </div>

                    <div>
                        <Label style={labelStyle}>Working Hours</Label>
                        <Select onValueChange={(v) => handleSelect("hours", v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="2-4 Hours">2-4 Hours</SelectItem>
                                <SelectItem value="4-6 Hours">4-6 Hours</SelectItem>
                                <SelectItem value="6+ Hours">6+ Hours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label style={labelStyle}>Username</Label>
                        <Input name="username" onChange={handleChange} />
                    </div>

                    <div>
                        <Label style={labelStyle}>Password</Label>
                        <Input type="password" name="password" onChange={handleChange} />
                    </div>

                    <div>
                        <Label style={labelStyle}>Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <Button className="w-full bg-secondary text-white">Register</Button>
            </form>
        </div>
    );
};

export default AstroRegister;
