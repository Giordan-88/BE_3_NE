const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { obtenerPosts, publicarPost } = require("./consultas");


// PostgreSQL connection setup Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  const posts = await obtenerPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  try {
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


