import sql from "../db/index.js";


 export const getAllForPost = async (req, res) => {
    // Post Id
    try{
        const {postId} = req.params;
        const rows = await sql `SELECT c.*,  u.username
                FROM comments c 
                LEFT JOIN users u 
                ON c.user_id = u.id 
                WHERE post_id = ${postId}; ORDER BY created_at`
        res.json(rows);
    }catch(err){
        res.status(400).send({error:err});
    }

}

export const createForPost = async (req, res) => {
   try {
       const {postId} = req.params;
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { userId, body } = req.body;
    const response = await sql `INSERT INTO comments (post_id, user_id, body) 
VALUES (${postId},${user.id},${body}) RETURNING *`;

    res.status(201).json(response);
} catch (err) {
    res.status(500).json({ error: err });
}
}
