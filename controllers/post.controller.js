import sql from '../db/index.js'

export  const getAllPost = async(req, res) => {
    try {
        const {id} =   req.user
        const  rows  = await sql `SELECT * FROM posts WHERE user_id = ${id} ` ;
        res.status(200).json(rows);
    }catch (err){
        res.status(500).json({error: 'dkkasdk'});
    }
}

export  const getPostById = async(req, res) => {
    try{
        const {postId} = req.params;
        const query = await sql `SELECT * FROM POSTS WHERE id = ${postId} `;
        const {rows} = await sql `${query}`;
        res.status(201).json(rows[0]);
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

export const createPost = async (req, res) => {

    try {

        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        const { title, body } = req.body;
        const {id } =   req.user;

        const { rows } = await sql`
            INSERT INTO posts (user_id, title, body)
            VALUES (${id}, ${title}, ${body})
            RETURNING *
        `;

        res.status(201).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

};
