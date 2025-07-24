# Descripción

Este proyecto consiste en una aplicación full stack que permite visualizar y publicar posts. En el frontend, se utiliza React para capturar datos desde un formulario y mostrar los posts existentes. En el backend, un servidor Node.js con Express maneja las rutas GET y POST, conectándose a una base de datos PostgreSQL donde se almacenan los datos. Cada post contiene un título, una imagen, una descripción y un contador de "likes".

Nueva update al trabajo.

Ruta PUT para registrar likes:
Se agregó una nueva ruta PUT /posts/like/:id que permite incrementar en 1 el número de likes de un post específico en la base de datos PostgreSQL. Esta ruta actualiza el campo likes utilizando una consulta SQL con UPDATE.

Ruta DELETE para eliminar posts:
Se implementó la ruta DELETE /posts/:id, que elimina un post según su ID. Devuelve el post eliminado y maneja errores en caso de ID no existente o problemas de conexión.

Manejo de errores con try-catch:
Todas las operaciones con la base de datos (GET, POST, PUT, DELETE) están encapsuladas en bloques try-catch, lo que permite capturar y responder adecuadamente ante errores en las consultas SQL.