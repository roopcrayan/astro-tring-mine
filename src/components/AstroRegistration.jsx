import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AstrologerRegister } from "@/redux/slice/AstroAuth";
import { Link, useNavigate } from "react-router-dom";

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

const expertiseOptions = [
    { value: "signature_reading", label: "Signature Reading" },
    { value: "vedic", label: "Vedic" },
    { value: "tarot", label: "Tarot" },
    { value: "kp", label: "KP" },
    { value: "numerology", label: "Numerology" },
    { value: "lal_kitab", label: "Lal Kitab" },
    { value: "psychic", label: "Psychic" },
    { value: "palmistry", label: "Palmistry" },
    { value: "cartomancy", label: "Cartomancy" },
    { value: "prashana", label: "Prashana" },
    { value: "loshu_grid", label: "Loshu Grid" },
    { value: "nadi", label: "Nadi" },
    { value: "face_reading", label: "Face Reading" },
    { value: "horary", label: "Horary" },
    { value: "life_coach", label: "Life Coach" },
    { value: "western", label: "Western" },
    { value: "gemology", label: "Gemology" },
    { value: "vastu", label: "Vastu" },
];

const steps = [
    { id: 1, title: "Personal Info", description: "Basic details" },
    { id: 2, title: "Professional", description: "Your expertise" },
    { id: 3, title: "Pricing & Details", description: "Service rates & info" },
];

const AstroRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.astroAuth);
    const [currentStep, setCurrentStep] = useState(1);
    const [countryCodes, setCountryCodes] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        country_code: "+91",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: "",
        experience: "",
        daily_available_hours: "",
        expertise: [],
        languages: [],
        categories: [],
        chat_price: "",
        call_price: "",
        is_family_astrologer: "0",
        family_astrology_details: "",
        about: "",
        pincode: "",
        address: "",
        city_id: "",
        state_id: "",
        country_id: "",
        pincode_id: "",
        image: null,
        imagePreview: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2');
                const data = await response.json();

                const codes = data
                    .filter(country => country.idd?.root && country.idd?.suffixes)
                    .map(country => {
                        const root = country.idd.root;
                        const suffixes = country.idd.suffixes;

                        if (suffixes.length === 1 && suffixes[0] === '') {
                            return {
                                value: root,
                                label: `${root} (${country.name.common})`,
                                country: country.name.common,
                                code: country.cca2
                            };
                        }

                        return {
                            value: `${root}${suffixes[0]}`,
                            label: `${root}${suffixes[0]} (${country.name.common})`,
                            country: country.name.common,
                            code: country.cca2
                        };
                    })
                    .sort((a, b) => a.country.localeCompare(b.country));

                const uniqueCodes = codes.filter((code, index, self) =>
                    index === self.findIndex((c) => c.value === code.value)
                );

                setCountryCodes(uniqueCodes);
                setLoadingCountries(false);
            } catch (error) {
                console.error('Error fetching country codes:', error);
                toast.error('Failed to load country codes');
                setLoadingCountries(false);
            }
        };

        fetchCountryCodes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSelect = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleMultiSelect = (field, value) => {
        if (!form[field].includes(value)) {
            setForm((prev) => ({
                ...prev,
                [field]: [...prev[field], value],
            }));
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: "" }));
            }
        }
    };

    const removeMultiSelect = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((item) => item !== value),
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file");
            return;
        }

        setForm((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!form.name.trim()) newErrors.name = "Name is required";
            if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
            if (!form.mobile.trim() || form.mobile.length !== 10) newErrors.mobile = "Valid 10-digit mobile number is required";
            if (!form.username.trim()) newErrors.username = "Username is required";
            if (!form.password || form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
            if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        }

        if (step === 2) {
            if (!form.experience || Number(form.experience) < 0) newErrors.experience = "Valid experience is required";
            if (!form.daily_available_hours || Number(form.daily_available_hours) < 1 || Number(form.daily_available_hours) > 24) {
                newErrors.daily_available_hours = "Hours must be between 1 and 24";
            }
            if (form.expertise.length === 0) newErrors.expertise = "Select at least one expertise";
            if (form.categories.length === 0) newErrors.categories = "Select at least one category";
            if (form.languages.length === 0) newErrors.languages = "Select at least one language";
        }

        if (step === 3) {
            if (!form.chat_price || Number(form.chat_price) < 0) newErrors.chat_price = "Valid chat price is required";
            if (!form.call_price || Number(form.call_price) < 0) newErrors.call_price = "Valid call price is required";
            if (!["0", "1"].includes(form.is_family_astrologer)) newErrors.is_family_astrologer = "Please select an option";
            if (form.is_family_astrologer === "1" && !form.family_astrology_details.trim()) {
                newErrors.family_astrology_details = "Family astrology details are required";
            }
            if (form.family_astrology_details && form.family_astrology_details.length > 1000) {
                newErrors.family_astrology_details = "Details must not exceed 1000 characters";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            toast.error("Please fix all errors before submitting");
            return;
        }

        const submitData = {
            name: form.name,
            email: form.email,
            country_code: form.country_code,
            mobile: form.mobile,
            username: form.username,
            password: form.password,
            password_confirmation: form.confirmPassword,
            experience: Number(form.experience),
            daily_available_hours: Number(form.daily_available_hours),
            expertise: form.expertise,
            languages: form.languages,
            category: form.categories,
            chat_price: Number(form.chat_price),
            call_price: Number(form.call_price),
            is_family_astrologer: Number(form.is_family_astrologer),
            family_astrology_details: form.is_family_astrologer === "1" ? form.family_astrology_details : null,
            about: form.about || null,
            pincode: form.pincode || null,
            address: form.address || null,
            city_id: form.city_id || null,
            state_id: form.state_id || null,
            country_id: form.country_id || null,
            pincode_id: form.pincode_id || null,
        };

        try {
            await dispatch(AstrologerRegister(submitData)).unwrap();
            toast.success("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/astro-login");
            }, 2000);
        } catch (error) {
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

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-5 grid md:grid-cols-2 grid-cols-1">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username *</Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Choose a unique username"
                                value={form.username}
                                onChange={handleChange}
                                className={errors.username ? "border-red-500" : ""}
                            />
                            {errors.username && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={handleChange}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Mobile Number *</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={form.country_code}
                                    onValueChange={(value) => handleSelect("country_code", value)}
                                    disabled={loadingCountries}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countryCodes.map((code) => (
                                            <SelectItem key={code.code} value={code.value}>
                                                {code.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    name="mobile"
                                    placeholder="1234567890"
                                    value={form.mobile}
                                    maxLength={10}
                                    onChange={handleChange}
                                    className={`flex-1 ${errors.mobile ? "border-red-500" : ""}`}
                                />
                            </div>
                            {errors.mobile && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.mobile}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Min 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? "border-red-500" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="experience">Experience (Years) *</Label>
                                <Input
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    min="0"
                                    placeholder="5"
                                    value={form.experience}
                                    onChange={handleChange}
                                    className={errors.experience ? "border-red-500" : ""}
                                />
                                {errors.experience && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.experience}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="daily_available_hours">Daily Hours *</Label>
                                <Input
                                    id="daily_available_hours"
                                    name="daily_available_hours"
                                    type="number"
                                    min="1"
                                    max="24"
                                    placeholder="8"
                                    value={form.daily_available_hours}
                                    onChange={handleChange}
                                    className={errors.daily_available_hours ? "border-red-500" : ""}
                                />
                                {errors.daily_available_hours && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.daily_available_hours}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Expertise *</Label>
                            <Select onValueChange={(value) => handleMultiSelect("expertise", value)}>
                                <SelectTrigger className={errors.expertise ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select your areas of expertise" />
                                </SelectTrigger>
                                <SelectContent>
                                    {expertiseOptions.map((exp) => (
                                        <SelectItem key={exp.value} value={exp.value}>
                                            {exp.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.expertise && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.expertise}
                                </p>
                            )}
                            {form.expertise.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.expertise.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200"
                                        >
                                            {expertiseOptions.find(e => e.value === skill)?.label || skill}
                                            <X
                                                className="w-3.5 h-3.5 ml-2 cursor-pointer"
                                                onClick={() => removeMultiSelect("expertise", skill)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Languages *</Label>
                            <Select onValueChange={(value) => handleMultiSelect("languages", value)}>
                                <SelectTrigger className={errors.languages ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select languages you speak" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.languages && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.languages}
                                </p>
                            )}
                            {form.languages.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.languages.map((lang) => (
                                        <Badge
                                            key={lang}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200"
                                        >
                                            {languages.find(l => l.value === lang)?.label || lang}
                                            <X
                                                className="w-3.5 h-3.5 ml-2 cursor-pointer"
                                                onClick={() => removeMultiSelect("languages", lang)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Categories *</Label>
                            <Select onValueChange={(value) => handleMultiSelect("categories", value)}>
                                <SelectTrigger className={errors.categories ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select consultation categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.categories && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.categories}
                                </p>
                            )}
                            {form.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.categories.map((cat) => (
                                        <Badge
                                            key={cat}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200"
                                        >
                                            {categories.find(c => c.value === cat)?.label || cat}
                                            <X
                                                className="w-3.5 h-3.5 ml-2 cursor-pointer"
                                                onClick={() => removeMultiSelect("categories", cat)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="chat_price">Chat Price (per min) *</Label>
                                <Input
                                    id="chat_price"
                                    name="chat_price"
                                    type="number"
                                    min="0"
                                    placeholder="10"
                                    value={form.chat_price}
                                    onChange={handleChange}
                                    className={errors.chat_price ? "border-red-500" : ""}
                                />
                                {errors.chat_price && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.chat_price}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="call_price">Call Price (per min) *</Label>
                                <Input
                                    id="call_price"
                                    name="call_price"
                                    type="number"
                                    min="0"
                                    placeholder="20"
                                    value={form.call_price}
                                    onChange={handleChange}
                                    className={errors.call_price ? "border-red-500" : ""}
                                />
                                {errors.call_price && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.call_price}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Are you a Family Astrologer? *</Label>
                            <Select
                                value={form.is_family_astrologer}
                                onValueChange={(value) => handleSelect("is_family_astrologer", value)}
                            >
                                <SelectTrigger className={errors.is_family_astrologer ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Yes</SelectItem>
                                    <SelectItem value="0">No</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.is_family_astrologer && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.is_family_astrologer}
                                </p>
                            )}
                        </div>

                        {form.is_family_astrologer === "1" && (
                            <div className="space-y-2">
                                <Label htmlFor="family_astrology_details">Family Astrology Details *</Label>
                                <Textarea
                                    id="family_astrology_details"
                                    name="family_astrology_details"
                                    placeholder="Describe your experience and expertise in family astrology..."
                                    value={form.family_astrology_details}
                                    onChange={handleChange}
                                    maxLength={1000}
                                    rows={4}
                                    className={`resize-none ${errors.family_astrology_details ? "border-red-500" : ""}`}
                                />
                                {errors.family_astrology_details && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.family_astrology_details}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 text-right">
                                    {form.family_astrology_details.length}/1000 characters
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="about">About You</Label>
                            <Textarea
                                id="about"
                                name="about"
                                placeholder="Tell clients about your expertise, approach, and what makes you unique..."
                                value={form.about}
                                onChange={handleChange}
                                maxLength={2000}
                                rows={6}
                                className="resize-none"
                            />
                            <p className="text-xs text-gray-500 text-right">
                                {form.about.length}/2000 characters
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Full Address</Label>
                            <Textarea
                                id="address"
                                name="address"
                                placeholder="Enter your complete address"
                                value={form.address}
                                onChange={handleChange}
                                maxLength={2000}
                                rows={3}
                                className="resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                                id="pincode"
                                name="pincode"
                                placeholder="110001"
                                value={form.pincode}
                                maxLength={10}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <section>
            <div className="container">
                <div className="min-h-screen border  rounded-2xl py-12 ">
                    <div className="  mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="  text-gray-900 mb-2">
                                Astrologer Registration
                            </h2>
                        </div>

                        <Card className="p-8   border-0">
                            <div className="mb-8">
                                <div className="flex justify-between mb-4">
                                    {steps.map((step) => (
                                        <div key={step.id} className="flex flex-col items-center flex-1">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step.id < currentStep
                                                    ? "bg-green-500 text-white"
                                                    : step.id === currentStep
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-sm font-medium ${step.id <= currentStep ? "text-gray-900" : "text-gray-500"
                                                    }`}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-gray-500">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                    {steps[currentStep - 1].title}
                                </h2>
                                <p className="text-gray-600">
                                    Step {currentStep} of {steps.length}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="  mb-8">
                                    {renderStepContent()}
                                </div>

                                <div className="flex justify-between gap-4 pt-6 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        className="min-w-[120px]"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Previous
                                    </Button>

                                    {currentStep < steps.length ? (
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="min-w-[120px] bg-yellow-500 hover:bg-yellow-700"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="min-w-[120px] bg-green-600 hover:bg-green-700"
                                        >
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Submitting...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Check className="w-4 h-4" />
                                                    Submit
                                                </span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <p className="text-center text-sm text-gray-600 mt-6 pt-6 border-t">
                                Already have an account?{" "}
                                <Link to="/astro-login" className="text-black font-semibold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AstroRegister;
