const {PrismaClient} = require('@prisma/client');
const { request } = require('express');
const prisma = new PrismaClient();

//get all posts
exports.getPosts = async (req, res) => {
    try{
        const posts = await prisma.post.findMany({
            orderBy:{createdAt:'desc'},
        });
        res.json(posts);
    }catch(error){
        console.error('Error fetching posts:', error);
        res.status(500).json({error:'Server error while fetching posts'});
    }
};

exports.getPostById = async(req,res)=>{
    try{
        const { id }= req.params;

        const post = await prisma.post.findUnique({
            where:{id:parseInt(id)},
        });

        if(!post){
            return res.status(404).json({error:'Post not Found'});
        }
        res.json(post);
    }catch(error){
        console.error('Error fetching post:', error);
        res.status(500).json({error:'Server error while fetching post'})
    }
};