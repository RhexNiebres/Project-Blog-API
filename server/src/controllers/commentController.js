const { PrismaClient } = "@prisma/client";
const prisma = new PrismaClient();

exports.getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comments.findMany({
      where: { postId: parseInt(postId) },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error fetching comments" });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
      where: { postId: parseInt(id) },
    });
    if (!comments) {
      console.error("Error comment does not exist", error);
    }
    res.json(comment);
  } catch (error) {
    console.error('Error fetching comment', error)
    res.status(500).json({error:'Server error while fetching comment'})
  }
};


