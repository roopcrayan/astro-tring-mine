
import React from "react";
import { useParams, Link } from "react-router-dom";

// Sample Data (ideally backend se fetch hoga)
const blogs = [
  {
    id: 1,
    title: "How to Learn React in 2026",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    author: "anilo",
    authorImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    date: "Jan 19, 2026",
    content: "React is a JavaScript library for building interactive UI..."
  },
  {
    id: 2,
    title: "Understanding Tailwind CSS",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    author: "Jyoti Gautam",
    authorImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    date: "Jan 18, 2026",
    content: "Tailwind CSS is a utility-first CSS framework..."
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blogs" className="text-blue-500 hover:underline mb-4 inline-block">← Back to Blogs</Link>
      
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <img
          src={blog.authorImage}
          alt={blog.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">{blog.author}</p>
          <p className="text-xs text-gray-500">{blog.date}</p>
        </div>
      </div>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <p className="text-gray-700">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
