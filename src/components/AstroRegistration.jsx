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
import { User, X } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AstrologerRegister } from "@/redux/slice/AstroAuth";

const AstroRegister = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.astroAuth);

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: "",
        experience: "",
        daily_available_hours: "",
        expertise: [],
        languages: [],
        chat_price: "",
        call_price: "",
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

    // Handle expertise selection
    const handleExpertiseSelect = (value) => {
        if (!form.expertise.includes(value)) {
            setForm((prev) => ({
                ...prev,
                expertise: [...prev.expertise, value],
            }));
        }
    };

    const removeExpertise = (value) => {
        setForm((prev) => ({
            ...prev,
            expertise: prev.expertise.filter((item) => item !== value),
        }));
    };

    // Handle language selection
    const handleLanguageSelect = (value) => {
        if (!form.languages.includes(value)) {
            setForm((prev) => ({
                ...prev,
                languages: [...prev.languages, value],
            }));
        }
    };

    const removeLanguage = (value) => {
        setForm((prev) => ({
            ...prev,
            languages: prev.languages.filter((item) => item !== value),
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.expertise.length === 0) {
            toast.error("Please select at least one expertise");
            return;
        }

        if (form.languages.length === 0) {
            toast.error("Please select at least one language");
            return;
        }

        // Prepare data matching the required JSON structure
        const submitData = {
            name: form.name,
            email: form.email,
            mobile: form.mobile,
            username: form.username,
            password: form.password,
            experience: Number(form.experience),
            daily_available_hours: Number(form.daily_available_hours),
            expertise: form.expertise,
            languages: form.languages,
            chat_price: Number(form.chat_price),
            call_price: Number(form.call_price),
        };

        console.log("Form Data:", submitData);

        try {
            const response = await dispatch(AstrologerRegister(submitData)).unwrap();
            toast.success("Registration successful!");
            
            // Reset form after successful registration
            setForm({
                name: "",
                email: "",
                mobile: "",
                username: "",
                password: "",
                confirmPassword: "",
                experience: "",
                daily_available_hours: "",
                expertise: [],
                languages: [],
                chat_price: "",
                call_price: "",
                image: null,
                imagePreview: "",
            });
        } catch (error) {
            // Handle different types of errors
            if (error?.message) {
                toast.error(error.message);
            } else if (error?.error) {
                toast.error(error.error);
            } else if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("Registration failed. Please try again.");
            }
            console.error("Registration error:", error);
        }
    };

    const labelStyle = {
        color: "var(--secondary)",
        marginBottom: "6px",
        display: "block",
    };

    return (
        <section>
            <div className="container">
                <div className=" mb-10 mx-auto p-6 border border-primary rounded-lg mt-10">
                    <h2 className="text-2xl text-center mb-6">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label style={labelStyle}>Name</Label>
                                <Input name="name" value={form.name} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Email</Label>
                                <Input name="email" type="email" value={form.email} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Mobile</Label>
                                <Input name="mobile" value={form.mobile} maxLength={10} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Username</Label>
                                <Input name="username" value={form.username} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Experience (Years)</Label>
                                <Input type="number" name="experience" value={form.experience} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Daily Available Hours</Label>
                                <Input type="number" name="daily_available_hours" value={form.daily_available_hours} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Expertise</Label>
                                <Select onValueChange={handleExpertiseSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Expertise" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Tarot">Tarot</SelectItem>
                                        <SelectItem value="Vedic">Vedic</SelectItem>
                                        <SelectItem value="Numerology">Numerology</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.expertise.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {form.expertise.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill}
                                                <X
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => removeExpertise(skill)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label style={labelStyle}>Languages</Label>
                                <Select onValueChange={handleLanguageSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Hindi">Hindi</SelectItem>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Bengali">Bengali</SelectItem>
                                        <SelectItem value="Tamil">Tamil</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.languages.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {form.languages.map((lang) => (
                                            <span
                                                key={lang}
                                                className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                                            >
                                                {lang}
                                                <X
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => removeLanguage(lang)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label style={labelStyle}>Chat Price (₹/min)</Label>
                                <Input type="number" name="chat_price" value={form.chat_price} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Call Price (₹/min)</Label>
                                <Input type="number" name="call_price" value={form.call_price} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Password</Label>
                                <Input type="password" name="password" value={form.password} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-secondary text-white"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AstroRegister;