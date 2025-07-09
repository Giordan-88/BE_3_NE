
const { Pool } = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',
    password: 'asdf1234',
    port: 5433,
    allowExitOnIdle: true, // Permite que el pool se cierre correctamente al finalizar
});


const obtenerPosts = async () => { 
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        return rows;
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        throw error;
    }
}

const publicarPost = async (titulo, img, descripcion, likes) => {
  try {
    const query = `
      INSERT INTO posts (titulo, img, descripcion, likes)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [titulo, img, descripcion, likes];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Devuelve solo el post insertado
  } catch (error) {
    console.error('Error al publicar el post:', error);
    throw error;
  }
}
module.exports = { obtenerPosts, publicarPost };    