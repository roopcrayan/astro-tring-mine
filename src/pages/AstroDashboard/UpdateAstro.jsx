import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Star, Languages, Award, Clock, Shield, Globe, Save, X, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AstrologerProfile, AstrologerUpdate } from '@/redux/slice/AstroAuth';

// Move FormField component OUTSIDE
const FormField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, className = '', value, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="flex items-center gap-2 text-sm font-medium text-slate-700">
      {Icon && <Icon className="w-4 h-4 text-slate-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={type !== "date" ? value : new Date().toISOString().split("T")[0]}
      onChange={onChange}
      lang="en-GB"
      className={cn("border-slate-200 focus:border-indigo-400 focus:ring-indigo-200", className)}
    />
  </div>
);

// Move MultiSelect component OUTSIDE with maxSelection limit
const MultiSelect = ({ options, selected, setSelected, label, icon: Icon, maxSelection = null }) => {
  const handleToggle = (option) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        // Remove if already selected
        return prev.filter((i) => i !== option);
      } else {
        // Add only if under max limit
        if (maxSelection && prev.length >= maxSelection) {
          return prev; // Don't add if limit reached
        }
        return [...prev, option];
      }
    });
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        {label}
        {maxSelection && (
          <span className="text-xs text-slate-500 font-normal">
            ({selected.length}/{maxSelection} selected)
          </span>
        )}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const isDisabled = !isSelected && maxSelection && selected.length >= maxSelection;

          return (
            <Badge
              key={option}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "capitalize transition-all",
                isSelected
                  ? "bg-primary text-black hover:bg-orange-400 cursor-pointer hover:scale-105"
                  : isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:border-primary hover:bg-indigo-50 cursor-pointer hover:scale-105"
              )}
              onClick={() => !isDisabled && handleToggle(option)}
            >
              {option}
              {isSelected && <Sparkles className="ml-1 w-3 h-3" />}
            </Badge>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 italic">
        {maxSelection ? `Select up to ${maxSelection} options` : 'Click to select / deselect'}
      </p>
    </div>
  );
};

function UpdateAstro() {
  const { astrologer, loading } = useSelector((state) => state.astroAuth);
  const role = localStorage.getItem("role_id")
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    countryCode: '+91',
    gender: '',
    dob: '',
    birthPlace: '',
    birthTime: '',
    about: '',
    address: '',
    pincode: '',
    experience: '',
    chatPrice: '',
    callPrice: '',
  });

  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const expertiseOptions = ['tarot', 'vastu', 'numerology', 'palmistry', 'vedic', 'astrology', 'horoscope'];
  const languageOptions = ['english', 'hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati'];
  const categoryOptions = ['love', 'marriage', 'health', 'career', 'finance', 'family', 'education'];

  useEffect(() => {
    if (astrologer) {
      setFormData({
        name: astrologer.name || '',
        username: astrologer.username || '',
        email: astrologer.email || '',
        mobile: astrologer.mobile || '',
        countryCode: astrologer.country_code || '+91',
        gender: astrologer.gender || '',
        dob: astrologer.dob || '',
        birthPlace: astrologer.birth_place || '',
        birthTime: astrologer.birth_time || '',
        about: astrologer.about || '',
        address: astrologer.address || '',
        pincode: astrologer.pincode || '',
        experience: astrologer.experience?.toString() || '',
        chatPrice: astrologer.chat_price || '',
        callPrice: astrologer.call_price || '',
      });
      setSelectedExpertise(astrologer.expertise || []);
      setSelectedLanguages(astrologer.languages || []);
      setSelectedCategories(astrologer.category || []);
      console.log(formData?.dob)
      console.log(role)
    }
  }, [astrologer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const updatedData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      mobile: formData.mobile,
      country_code: formData.countryCode,
      gender: formData.gender,
      dob: formData.dob,
      birth_place: formData.birthPlace,
      birth_time: formData.birthTime,
      about: formData.about,
      address: formData.address,
      pincode: formData.pincode,
      experience: parseInt(formData.experience) || 0,
      chat_price: parseFloat(formData.chatPrice) || 0,
      call_price: parseFloat(formData.callPrice) || 0,
      expertise: selectedExpertise,
      languages: selectedLanguages,
      category: selectedCategories,
    };

    try {
      await dispatch(AstrologerUpdate(updatedData)).unwrap()
      await dispatch(AstrologerProfile()).unwrap()
      console.log(updatedData);
    } catch (error) {
    }


  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to discard changes?')) {
      window.history.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-1  items-center justify-center">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (!astrologer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">No astrologer data found</div>
      </div>
    );
  }

  useEffect(() => {
    console.log(formData.dob)
  }, [astrologer])

  return (
    <div className="min-h-screen   pb-24">
      <div className="   px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Update Your Profile
          </h1>
          <p className="text-slate-600">Keep your professional & cosmic details up to date</p>
        </div>

        <div className="mb-8 flex  ">
          <Card className="w-full  max-w-md  border-0  ">
            <CardContent className="pt-6 p-0">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage src={astrologer?.profile_image } />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-orange-500 text-white text-2xl">
                    {formData.name.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{formData.name}</h2>
                  <p className="text-slate-500 text-md!">@{formData.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
            <CardHeader className="  bg-primary/70 py-2">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary-forground" />
                Personal
              </CardTitle>
              <CardDescription>Your core identity and cosmic entry information</CardDescription>
            </CardHeader>
            <CardContent className="  space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Full Name"
                  name="name"
                  placeholder="Enter full name"
                  icon={User}
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                  icon={User}
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <User className="w-4 h-4 text-slate-500" />
                    Gender
                  </Label>
                  <Select value={formData.gender}  onValueChange={(v) => setFormData((p) => ({ ...p, gender: v }))}>
                    <SelectTrigger className="border-slate-200 w-full focus:border-indigo-400 focus:ring-indigo-200">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
 


              {/* {role != 2 && */}
                <div className="grid hidden grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    icon={Calendar}
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Birth Place"
                    name="birthPlace"
                    placeholder="City, State"
                    icon={MapPin}
                    value={formData.birthPlace}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Birth Time"
                    name="birthTime"
                    type="time"
                    icon={Clock}
                    value={formData.birthTime}
                    onChange={handleInputChange}
                  />
                </div>
              {/* } */}
            </CardContent>
          </Card>

          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
            <CardHeader className="  bg-primary/70 py-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5  " />
                Contact Information
              </CardTitle>
              <CardDescription>How clients can reach you</CardDescription>
            </CardHeader>
            <CardContent className="  space-y-4">
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                icon={Mail}
                required
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Phone className="w-4 h-4 text-slate-500" />
                  Mobile Number
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.countryCode}
                    onChange={(e) => setFormData((p) => ({ ...p, countryCode: e.target.value }))}
                    className="w-24 border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
                  />
                  <Input
                    name="mobile"
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="flex-1 border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Address"
                  name="address"
                  placeholder="Full address"
                  icon={MapPin}
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Pincode"
                  name="pincode"
                  placeholder="123456"
                  icon={MapPin}
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
            <CardHeader className="  bg-primary/70 py-2">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5  " />
                Professional & Pricing
              </CardTitle>
              <CardDescription>Your expertise and consultation rates</CardDescription>
            </CardHeader>
            <CardContent className=" space-y-4">
              <FormField
                label="Years of Experience"
                name="experience"
                type="number"
                placeholder="5"
                icon={Award}
                value={formData.experience}
                onChange={handleInputChange}
              />

              

              <MultiSelect
                options={expertiseOptions}
                selected={selectedExpertise}
                setSelected={setSelectedExpertise}
                label="Areas of Expertise"
                icon={Star}
                maxSelection={3}
              />

              <MultiSelect
                options={languageOptions}
                selected={selectedLanguages}
                setSelected={setSelectedLanguages}
                label="Languages Known"
                icon={Languages}
                maxSelection={3}
              />

              <MultiSelect
                options={categoryOptions}
                selected={selectedCategories}
                setSelected={setSelectedCategories}
                label="Consultation Categories"
                icon={Globe}
                maxSelection={3}
              />
            </CardContent>
          </Card>

          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
            <CardHeader className="  bg-primary/70 py-2">
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5  " />
                About You
              </CardTitle>
              <CardDescription>Introduce yourself to your clients</CardDescription>
            </CardHeader>
            <CardContent className=" ">
              <div className="space-y-2">
                <Label htmlFor="about" className="text-sm font-medium text-slate-700">
                  Professional Bio & Approach
                  <p className="text-xs text-slate-500 italic">
                    Appears on your public profile — make it warm and authentic
                  </p>
                </Label>
                <Textarea
                  id="about"
                  name="about"
                  rows={6}
                  placeholder="Share your journey, philosophy, and what makes your practice special..."
                  value={formData.about}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-200 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-t border-gray-200 shadow-2xl py-4 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto flex justify-end gap-4">
            <Button variant="outline" onClick={handleCancel} className="min-w-32 hover:bg-slate-50">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="min-w-32 bg-primary text-black hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200/40"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default UpdateAstro;