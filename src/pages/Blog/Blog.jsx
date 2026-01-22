import BlogCard from "@/components/Blog/BlogCard"
import HeadWithLogo from "@/components/HeadWithLogo";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";



const blogs = [
  {
    img: "https://example.com/images/home-astrology.jpg",
    title: "Astrology: A Complete Guide for Beginners",
    description: "Learn how astrology influences human life, destiny, and daily decision-making from an ancient perspective.",
    date: "2026-01-01",
    slug: "astrology-complete-guide-beginners",
    category: "Home"
  },
  {
    img: "https://example.com/images/tarot-reading.jpg",
    title: "Tarot Reading: Unlock Hidden Messages of the Cards",
    description: "Understand how tarot cards help reveal emotional insights, future possibilities, and life guidance.",
    date: "2026-01-02",
    slug: "tarot-reading-hidden-messages",
    category: "Tarot"
  },
  {
    img: "https://example.com/images/vastu-tips.jpg",
    title: "Vastu Shastra Tips for Peace and Prosperity",
    description: "Simple and effective vastu tips to improve harmony, wealth, and positive energy in your home.",
    date: "2026-01-03",
    slug: "vastu-shastra-tips-prosperity",
    category: "Vastu"
  },
  {
    img: "https://example.com/images/vedic-astrology.jpg",
    title: "Vedic Astrology and Its Impact on Life",
    description: "Explore the power of Vedic astrology, planets, dashas, and houses that shape your destiny.",
    date: "2026-01-04",
    slug: "vedic-astrology-impact-life",
    category: "Vedic"
  },
  {
    img: "https://example.com/images/kundli-analysis.jpg",
    title: "Kundli Analysis: What Your Birth Chart Reveals",
    description: "A deep dive into kundli analysis and how planetary placements affect career, love, and health.",
    date: "2026-01-05",
    slug: "kundli-analysis-birth-chart",
    category: "Kundli"
  },
  {
    img: "https://example.com/images/sports-astrology.jpg",
    title: "Sports Astrology: Can Stars Predict Victory?",
    description: "Discover how planetary movements influence sports outcomes, players, and major tournaments.",
    date: "2026-01-06",
    slug: "sports-astrology-stars-predict-victory",
    category: "Sports"
  },
  {
    img: "https://example.com/images/planetary-transits.jpg",
    title: "Major Planetary Transits and Their Effects",
    description: "Understand upcoming planetary transits and how they impact different zodiac signs.",
    date: "2026-01-07",
    slug: "major-planetary-transits-effects",
    category: "Transits"
  },
  {
    img: "https://example.com/images/festivals-astrology.jpg",
    title: "Astrological Significance of Indian Festivals",
    description: "Learn how major festivals align with planetary positions and cosmic energy.",
    date: "2026-01-08",
    slug: "astrological-significance-indian-festivals",
    category: "Festivals"
  },
  {
    img: "https://example.com/images/business-astrology.jpg",
    title: "Business Astrology: Choosing the Right Time for Success",
    description: "Find auspicious timings and planetary support for business growth and investments.",
    date: "2026-01-09",
    slug: "business-astrology-right-time-success",
    category: "Business"
  },
  {
    img: "https://example.com/images/gemstones-astrology.jpg",
    title: "Astrological Gemstones and Their Powerful Benefits",
    description: "Know which gemstones strengthen planets and bring balance, success, and protection.",
    date: "2026-01-10",
    slug: "astrological-gemstones-powerful-benefits",
    category: "Gemstones"
  },
  {
    img: "https://example.com/images/numerology.jpg",
    title: "Numerology: The Power of Numbers in Your Life",
    description: "Discover how numbers influence personality, destiny, and important life decisions.",
    date: "2026-01-11",
    slug: "numerology-power-of-numbers",
    category: "Numerology"
  },
  {
    img: "https://example.com/images/zodiac-signs.jpg",
    title: "Zodiac Signs Explained: Traits and Characteristics",
    description: "Explore all zodiac signs, their personality traits, strengths, and weaknesses.",
    date: "2026-01-12",
    slug: "zodiac-signs-traits-characteristics",
    category: "Zodiac Signs"
  },
  {
    img: "https://example.com/images/compatibility.jpg",
    title: "Love Compatibility According to Astrology",
    description: "Understand zodiac compatibility and how planetary alignment affects relationships.",
    date: "2026-01-13",
    slug: "love-compatibility-according-astrology",
    category: "Compatibility"
  },
  {
    img: "https://example.com/images/entertainment-astrology.jpg",
    title: "Astrology in Entertainment and Celebrity Lives",
    description: "A look at how astrology influences celebrities, movies, and entertainment trends.",
    date: "2026-01-14",
    slug: "astrology-entertainment-celebrity-lives",
    category: "Entertainment"
  },
  {
    img: "https://example.com/images/current-affairs-astrology.jpg",
    title: "Current Affairs Through an Astrological Lens",
    description: "Analyze global events and current affairs using planetary movements.",
    date: "2026-01-15",
    slug: "current-affairs-astrology-analysis",
    category: "Current Affairs"
  },
  {
    img: "https://example.com/images/daily-horoscope.jpg",
    title: "Daily Horoscope: What the Stars Say Today",
    description: "Check your daily horoscope and plan your day according to planetary guidance.",
    date: "2026-01-16",
    slug: "daily-horoscope-stars-today",
    category: "Daily Horoscope"
  },
  {
    img: "https://example.com/images/mythological-tales.jpg",
    title: "Mythological Tales and Their Astrological Meaning",
    description: "Explore ancient mythological stories and their deep connection with astrology.",
    date: "2026-01-17",
    slug: "mythological-tales-astrological-meaning",
    category: "Mythological Tales"
  }
]


const Blog = () => {
  const [search, setSearch] = useState("");
  const [searchedBlog, setSearchBlog] = useState(blogs);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const uniqueCategories = ["All", ...new Set(blogs.map(blog => blog.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredBlogs = blogs;

      // category filter
      if (category) {
        filteredBlogs = filteredBlogs.filter(
          blog => blog.category === category || category === "All"
        );
      }

      // search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        filteredBlogs = filteredBlogs.filter(
          blog =>
            blog.title.toLowerCase().includes(query) ||
            blog.category.toLowerCase().includes(query)
        );
      }

      setSearchBlog(filteredBlogs);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <section className="pt-0">
      <div className="container">
        <HeadWithLogo clsassName="mb-3!" title={"Blog Articles"} />
        <h3 className=" mb-5" >Search with Category </h3>
        <div className="grid md:grid-cols-4 gap-3">

          {/* Categories */}
          <div clsassName="md:col-span-1 p-4 border rounded-lg h-fit">
            <ScrollArea className="h-[500px]  rounded-md border  border-gray-300 p-4">

              <ul>

                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={` cursor-pointer rounded-md px-2 py-1 hover:bg-primary/50
                    ${category === cat ? "bg-gray-200 font-semibold" : ""}
                  `}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>

          {/* Blogs */}
          <div className="md:col-span-3">
            <div className="mb-3">
              <Input
                placeholder="Search blogs..."
                className="border-b rounded-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-3 md:grid-cols-2 gap-4">
              {searchedBlog.length > 0 ? (
                searchedBlog.map(blog => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))
              ) : (
                <p>No blogs found</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Blog
