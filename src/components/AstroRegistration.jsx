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
import { Link } from "react-router-dom";
const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "tamil", label: "Tamil" },
    { value: "punjabi", label: "Punjabi" },
    { value: "marathi", label: "Marathi" },
    { value: "gujarati", label: "Gujarati" },
    { value: "bengali", label: "Bengali" },
    { value: "french", label: "French" },
    { value: "odia", label: "Odia" },
    { value: "telugu", label: "Telugu" },
    { value: "kannada", label: "Kannada" },
    { value: "malayalam", label: "Malayalam" },
    { value: "sanskrit", label: "Sanskrit" },
    { value: "assamese", label: "Assamese" },
    { value: "german", label: "German" },
    { value: "spanish", label: "Spanish" },
    { value: "marwari", label: "Marwari" },
    { value: "manipuri", label: "Manipuri" },
    { value: "urdu", label: "Urdu" },
    { value: "sindhi", label: "Sindhi" },
    { value: "kashmiri", label: "Kashmiri" },
    { value: "bodo", label: "Bodo" },
    { value: "nepali", label: "Nepali" },
    { value: "konkani", label: "Konkani" },
    { value: "maithili", label: "Maithili" },
    { value: "arabic", label: "Arabic" },
    { value: "bhojpuri", label: "Bhojpuri" },
    { value: "dutch", label: "Dutch" },
    { value: "rajasthani", label: "Rajasthani" },
];

const categories = [
    { value: "love", label: "Love" },
    { value: "marriage", label: "Marriage" },
    { value: "health", label: "Health" },
    { value: "wealth", label: "Wealth" },
    { value: "education", label: "Education" },
    { value: "career", label: "Career" },
    { value: "legal", label: "Legal" },
    { value: "remedies", label: "Remedies" },
    { value: "finance", label: "Finance" },
    { value: "parents", label: "Parents" },
];

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
        categories: [],

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

    const handleCategorySelect = (value) => {
        if (!form.categories.includes(value)) {
            setForm((prev) => ({
                ...prev,
                categories: [...prev.categories, value],
            }));
        }
    };
    const removeCategory = (value) => {
        setForm((prev) => ({
            ...prev,
            categories: prev.categories.filter((cat) => cat !== value),
        }));
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

                categories: [],
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
                <div className=" mb-10 mx-auto p-6 border border-black rounded-lg mt-10">
                    <h2 className="text-2xl text-center mb-6">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label style={labelStyle}>Name</Label>
                                <Input name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Email</Label>
                                <Input name="email" placeholder="Enter your email" type="email" value={form.email} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Mobile</Label>
                                <Input name="mobile" placeholder="Enter your mobile number" value={form.mobile} maxLength={10} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Username</Label>
                                <Input name="username" placeholder="Enter your username" value={form.username} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Experience (Years)</Label>
                                <Input type="number" placeholder="Enter your experience in years" name="experience" value={form.experience} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Daily Available Hours</Label>
                                <Input type="number" placeholder="Enter your daily available hours" name="daily_available_hours" value={form.daily_available_hours} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Expertise</Label>
                                <Select onValueChange={handleExpertiseSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Expertise" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="signature_reading">Signature Reading</SelectItem>
                                        <SelectItem value="vedic">Vedic</SelectItem>
                                        <SelectItem value="tarot">Tarot</SelectItem>
                                        <SelectItem value="kp">KP</SelectItem>
                                        <SelectItem value="numerology">Numerology</SelectItem>
                                        <SelectItem value="lal_kitab">Lal Kitab</SelectItem>
                                        <SelectItem value="psychic">Psychic</SelectItem>
                                        <SelectItem value="palmistry">Palmistry</SelectItem>
                                        <SelectItem value="cartomancy">Cartomancy</SelectItem>
                                        <SelectItem value="prashana">Prashana</SelectItem>
                                        <SelectItem value="loshu_grid">Loshu Grid</SelectItem>
                                        <SelectItem value="nadi">Nadi</SelectItem>
                                        <SelectItem value="face_reading">Face Reading</SelectItem>
                                        <SelectItem value="horary">Horary</SelectItem>
                                        <SelectItem value="life_coach">Life Coach</SelectItem>
                                        <SelectItem value="western">Western</SelectItem>
                                        <SelectItem value="gemology">Gemology</SelectItem>
                                        <SelectItem value="vastu">Vastu</SelectItem>
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
                                        {languages.map((lang) => (
                                            <SelectItem key={lang.value} value={lang.value}>
                                                {lang.label}
                                            </SelectItem>
                                        ))}
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
                                <Label style={labelStyle}>Add Category</Label>

                                <Select onValueChange={handleCategorySelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {form.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {form.categories.map((cat) => (
                                            <span
                                                key={cat}
                                                className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                                            >
                                                {cat}
                                                <X
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => removeCategory(cat)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>



                            <div>
                                <Label style={labelStyle}>Password</Label>
                                <Input type="password" placeholder="Enter your password" name="password" value={form.password} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label style={labelStyle}>Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full "
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link to="/astro-login" className="text-black font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AstroRegister;