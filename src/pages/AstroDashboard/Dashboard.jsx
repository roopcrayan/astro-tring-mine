

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AstroAuthHOC from "./UpdateAstro"
import {
  User,
  Image,
  Users,
  Settings,
  Layers,
  DollarSign,
  Rocket,
  TrendingUp,
  Edit
} from 'lucide-react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('about');

  const { astrologer } = useSelector(state => state.astroAuth)
  console.log(astrologer)

  const stats = [
    {
      icon: Layers,
      label: 'Orders',
      value: '1,587',
      increase: true,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: '46,782',
      increase: true,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      icon: Rocket,
      label: 'Product sold',
      value: '1,890',
      increase: true,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    }
  ];

  const socialLinks = [
    {
      name: 'Github',
      url: 'github.com/apruko',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    },
    {
      name: 'Twitter',
      url: 'twitter.com/apruko.me',
      color: 'text-blue-400',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Linkedin',
      url: 'linkedin.com/in/apruko',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'My Portfolio',
      url: 'apruko.com/',
      color: 'text-red-400',
      bgColor: 'bg-red-50'
    }
  ];

  const experiences = [
    {
      title: 'Lead designer / Developer',
      company: 'websitename.com',
      period: '2010-2015',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Senior Graphic Designer',
      company: 'coderthemes.com',
      period: '2007-2009',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-4">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {/* Profile Image */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" alt="Profile" />
                    <AvatarFallback>PC</AvatarFallback>
                  </Avatar>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                    <Edit className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Name and Title */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Petey Cruiser</h2>
                  <p className="text-sm text-gray-500">Web Designer</p>
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    pleasure rationally encounter but because pursue consequences that are extremely painful or which toil and pain can procure him some great pleasure..{' '}
                    <button className="text-blue-500 hover:underline">More</button>
                  </p>
                </div>


              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 ">
                    <div className="flex items-center justify-between">
                      <div className={`${stat.bgColor} p-3 rounded-full`}>
                        <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        {stat.increase && (
                          <div className="flex items-center text-xs text-green-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            increase
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs Section */}
            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b bg-gray-50">
                    <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto">
                      <TabsTrigger
                        value="about"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white px-6 py-4 text-xs font-medium"
                      >
                        <User className="w-4 h-4 mr-2" />
                        ABOUT ME
                      </TabsTrigger>
                      <TabsTrigger
                        value="gallery"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white px-6 py-4 text-xs font-medium"
                      >
                        <Image className="w-4 h-4 mr-2" />
                        GALLERY
                      </TabsTrigger>
                      <TabsTrigger
                        value="friends"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white px-6 py-4 text-xs font-medium"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        FRIENDS
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white px-6 py-4 text-xs font-medium"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        SETTINGS
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="about" className="p-6 mt-0">
                    {/* Bio Data */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-900 mb-4 text-sm">BIO DATA</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Hi I'm Petey Cruiser,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-sm">EXPERIENCE</h3>
                      <div className="space-y-6">
                        {experiences.map((exp, index) => (
                          <div key={index}>
                            <h4 className="text-blue-500 font-medium mb-1">{exp.title}</h4>
                            <p className="text-sm text-gray-900 mb-1">{exp.company}</p>
                            <p className="text-sm font-semibold text-gray-900 mb-2">{exp.period}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="p-6 mt-0">
                    <div className="text-center py-12 text-gray-500">
                      Gallery content goes here
                    </div>
                  </TabsContent>

                  <TabsContent value="friends" className="p-6 mt-0">
                    <div className="text-center py-12 text-gray-500">
                      Friends list goes here
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="p-6 mt-0">
                    <div className="text-center py-12 text-gray-500">
                      Settings panel goes here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;