
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Blog Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

        {/* Author & Date */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{blog.author}</p>
            <p className="text-xs text-gray-500">{blog.date}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{blog.excerpt}</p>

        {/* Read More */}
        <Link
          to={`/blog/${blog.id}`}
          className="text-blue-500 font-medium hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
