
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Link to={`/blogs/${blog.slug}`}>
        <Card className="w-full border-gray-400   overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative  overflow-hidden">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='16'%3EAstrology Guide%3C/text%3E%3C/svg%3E";
              }}
            />
            <Badge className="absolute top-3 right-3 bg-white/90 text-slate-800 hover:bg-white">
              {blog.category}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-md font-bold line-clamp-2 hover:text-primary transition-colors cursor-pointer">
              {blog.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.date)}
            </CardDescription>
          </CardHeader>

          {/* <CardContent>
          <p className="text-slate-600 line-clamp-3">
            {blog.description}
          </p>
        </CardContent> */}

          <CardFooter>
            <Button
              className={"w-full"}

            >
              Read More
            </Button>
          </CardFooter>
        </Card>
      </Link>

    </>
  );
}