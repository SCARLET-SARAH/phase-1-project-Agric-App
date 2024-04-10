const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const dbPath = './db.json';

let blogPosts = [];

// Load blog posts from db.json

function loadBlogPosts() {
  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);
  blogPosts = data.blogposts;
}

// Save blog posts to db.json

function saveBlogPosts() {
  const data = { blogposts: blogPosts };
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dbPath, jsonData);
}

// Get all blog posts

app.get('/blogposts', (req, res) => {
  res.json(blogPosts);
});

// Get a single blog post by id

app.get('/blogposts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: 'Blog post not found' });
  } else {
    res.json(post);
  }
});

// Create a new blog post

app.post('/blogposts', (req, res) => {
  const post = req.body;
  blogPosts.push(post);
  saveBlogPosts();
  res.status(201).json(post);
});

// Update a blog post by id

app.put('/blogposts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = req.body;
  const index = blogPosts.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Blog post not found' });
  } else {
    blogPosts[index] = post;
    saveBlogPosts();
    res.json(post);
  }
});

// Delete a blog post by id

app.delete('/blogposts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogPosts.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Blog post not found' });
  } else {
    blogPosts.splice(index, 1);
    saveBlogPosts();
    res.status(204).send();
  }
});

// Load blog posts when the server starts

loadBlogPosts();

app.listen(3000, () => {
  console.log('Server started on port 3000');
});