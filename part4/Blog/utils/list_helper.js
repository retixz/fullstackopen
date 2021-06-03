

const totalLikes = (blogs) => {
  const results = blogs.map(blog => blog.likes)
  return results
}

const favoriteBlog = (blogs) => {
  const results = blogs.map(blog => blog.likes)
  const max_likes = Math.max(...results)
  const max_likes_blog = blogs.find((blog) => blog.likes === max_likes )
  return { title: max_likes_blog.title, author: max_likes_blog.author, likes: max_likes_blog.likes }
  
}

module.exports = {
  totalLikes,
  favoriteBlog
}