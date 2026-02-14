import React from 'react'
import { Link } from 'react-router-dom'
import blogService from '../appwrite/blog'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-yellow-300 p-4 w-full hover:shadow-2xl duration-200 rounded-xl hover:-translate-y-2 min-h-full flex flex-col justify-around">
        <img src={blogService.getFileView(featuredImage)} alt={title} className="w-full mb-4 rounded-xl object-cover h-64" />
        <h1 className="text-2xl font-bold text-blue-950">{title}</h1>
      </div>
    </Link>
  )
}

export default PostCard