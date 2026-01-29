import React, { useEffect } from 'react';
import { Calendar, User, Tag, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const blogData = {
    img: "https://example.com/images/mythological-tales.jpg",
    title: "Mythological Tales and Their Astrological Meaning",
    description: "Explore ancient mythological stories and their deep connection with astrology.",
    date: "2026-01-17",
    slug: "mythological-tales-astrological-meaning",
    category: "Mythological Tales",
    author: "Dr. Sarah Williams",
    readTime: "8 min read"
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  const param = useParams()
  useEffect(() => {
    console.log(param)
  }, [param])
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="container   ">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-slate-100"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Category Badge */}
        <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
          <Tag className="w-3 h-3 mr-1" />
          {blogData.category}
        </Badge>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          {blogData.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-600 mb-6">
          {blogData.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-8">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{blogData.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blogData.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏱️ {blogData.readTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-10 shadow-xl">
          <img
            src={blogData.img}
            alt={blogData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='800' height='500' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='24'%3EMythological Tales%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            Throughout human history, mythology and astrology have been intertwined, creating a rich tapestry of stories that explain the cosmos and our place within it. Ancient civilizations looked to the stars not just for guidance, but for meaning, weaving celestial observations into their most sacred tales.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-4">
            The Connection Between Myths and Stars
          </h2>
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            The zodiac itself is a collection of mythological narratives. Each constellation carries stories passed down through generations, from Greek heroes to Babylonian gods. These tales weren't merely entertainment; they were educational tools that taught astronomical cycles, seasonal changes, and moral lessons.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-4">
            Ancient Wisdom in Modern Times
          </h2>
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            Today's astrology practitioners continue to draw upon these mythological foundations. The archetypes represented by planetary deities—Mars the warrior, Venus the lover, Mercury the messenger—provide psychological frameworks for understanding human behavior and cosmic influences.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-xl text-slate-600 my-8">
            "The stars are the ancient storytellers, and astrology is the language through which they speak to us across millennia."
          </blockquote>

          <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-4">
            Practical Applications
          </h2>
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            Understanding the mythological context of astrological symbols deepens our interpretation of birth charts and planetary transits. When we know that Saturn represents Chronos, the titan of time and discipline, we better understand why Saturn returns bring periods of maturity and responsibility.
          </p>

          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            Similarly, knowing that Jupiter embodies Zeus, the king of gods associated with expansion and abundance, helps us interpret Jupiter transits as times of growth and opportunity. These mythological frameworks aren't just poetic—they're practical tools for self-understanding.
          </p>
        </article>

        <Separator className="my-10" />

        {/* Author Bio */}
        <div className="bg-slate-50 rounded-lg p-6 mt-10">
          <h3 className="text-xl font-bold text-slate-900 mb-2">About the Author</h3>
          <p className="text-slate-700">
            <strong>{blogData.author}</strong> is an astrologer and mythologist with over 15 years of experience studying ancient cultures and celestial wisdom. She specializes in connecting historical mythological narratives with contemporary astrological practice.
          </p>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <h4 className="font-semibold text-slate-900 mb-2">The Twelve Zodiac Signs Explained</h4>
              <p className="text-sm text-slate-600">Discover the origins and meanings behind each zodiac constellation.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <h4 className="font-semibold text-slate-900 mb-2">Planetary Deities in Astrology</h4>
              <p className="text-sm text-slate-600">Learn how ancient gods influence modern astrological interpretation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;