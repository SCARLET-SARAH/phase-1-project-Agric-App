// Get blog posts from the server
async function getBlogPosts() {
    const response = await fetch('http://localhost:3000/blogposts');
    const data = await response.json();
    return data;
  }
  
  // Display blog posts
  function displayBlogPosts(blogPosts) {

    // Implement display logic here

  }
  
  // View a blog post
  function viewPost(id) {

    // Implement view logic here

  }
  
  // Create a new blog post

  async function createPost(title, content, image) {
    const response = await fetch('http://localhost:3000/blogposts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        image,
      }),
    });
    const data = await response.json();
    return data;
  }
  
  // Update a blog post

  async function updatePost(id, title, content, image) {
    const response = await fetch(`http://localhost:3000/blogposts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        image,
      }),
    });
    const data = await response.json();
    return data;
  }
  
  // Delete a blog post

  async function deletePost(id) {
    const response = await fetch(`http://localhost:3000/blogposts/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
  
  // Event listener for creating a new blog post

  document.getElementById('create-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;
  
    const newPost = await createPost(title, content, image);
    console.log('New post created:', newPost);
  });
  
  // Load blog posts when the page loads
  
  getBlogPosts().then(displayBlogPosts);