const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const {
  obtenerPosts,
  publicarPost,
  eliminarPost,
  incrementarLike,
} = require("./consultas");

// PostgreSQL connection setup Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const { titulo, img, descripcion } = req.body;
    if (!titulo || !img || !descripcion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const likes = 0;
    const nuevoPost = await publicarPost(titulo, img, descripcion, likes);

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res
        .status(400)
        .json({ error: "ID del post es requerido y debe ser un número" });
    }

    const postActualizado = await incrementarLike(id);
    if (!postActualizado) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(200).json({
      message: "Like registrado correctamente",
      post: postActualizado,
    });
  } catch (error) {
    console.error("Error al registrar el like:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID del post es requerido" });
    }
    const rows = await eliminarPost(id);
    if (!rows) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Post eliminado correctamente", post: rows });
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
