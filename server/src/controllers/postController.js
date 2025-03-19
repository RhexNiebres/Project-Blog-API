const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const prisma = new PrismaClient();

//get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not Found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Server error while fetching post" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ error: "Title,content and author are required" });
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: parseInt(authorId),
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "server error while creating post" });
  }
};

exports.updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const existingPost = await prisma.post.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: {
          title: title || existingPost.title,
          content: content || existingPost.content,
        },
      });
  
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Server error while updating post" });
    }
  };