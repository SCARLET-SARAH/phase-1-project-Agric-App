// Get blog posts from the server
async function getBlogPosts() {
    const response = await fetch('http://localhost:3000/blogposts');
    const data = await response.json();
    return data;
  }
  
  // Display blog posts
  function displayBlogPosts(blogPosts) {

    const blogPostsContainer = document.getElementById('blog-posts-container');

    if (blogPostsContainer) {
      blogPostsContainer.innerHTML = '';
  
      blogPosts.forEach(blogPost => {
        const blogPostElement = document.createElement('div');
        blogPostElement.classList.add('blog-post');
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = blogPost.title;
        blogPostElement.appendChild(titleElement);
  
        const contentElement = document.createElement('p');
        contentElement.textContent = blogPost.content;
        blogPostElement.appendChild(contentElement);
  
        const imageElement = document.createElement('img');
        imageElement.src = blogPost.image;
        blogPostElement.appendChild(imageElement);
  
        blogPostsContainer.appendChild(blogPostElement);
      });
    }
  

  }
  
  // View a blog post
  function viewPost(id) {
    fetch(`http://localhost:3000/posts/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(post => {
      // Call a function to display the specific blog post

      displaySinglePost(post);
    })
    .catch(error => console.error('Error fetching blog post:', error));
  }
  function displaySinglePost(post) {
    const postContainer = document.getElementById('post-container');
  
    if (postContainer) {
      postContainer.innerHTML = '';
  
      const postElement = document.createElement('div');
      postElement.classList.add('single-post');
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;
      postElement.appendChild(titleElement);
  
      const contentElement = document.createElement('p');
      contentElement.textContent = post.content;
      postElement.appendChild(contentElement);
  
      postContainer.appendChild(postElement);
    }
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
  // Get the recent posts from the server
fetch('https://example.com/api/posts/recent')
.then(response => response.json())
.then(data => {
  // Create a list of recent posts
  const recentPostsList = document.getElementById('recent-posts');
  data.forEach(post => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="/post/${post.id}">${post.title}</a>`;
    recentPostsList.appendChild(listItem);
  });
});

// Add a search function 

document.getElementById('search-form').addEventListener('submit', event => {
event.preventDefault();
const searchTerm = document.getElementById('search-input').value;

// Search for the term on the server

fetch(`https://example.com/api/posts/search?q=${searchTerm}`)
  .then(response => response.json())
  .then(data => {

    // Display the search results
    
    console.log(data);
  });
});
  
  // Load blog posts when the page loads
  
  getBlogPosts().then(displayBlogPosts);