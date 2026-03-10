const express = require('express');
const cors = require('cors');
const proyectoRoutes = require('../routes/proyectoRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6500;


// Middleware
app.use(cors());
app.use(express.json());


// Rutas
app.use('/api/proyectos', proyectoRoutes);


// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API de Proyectos funcionando correctamente con PostgreSQL');
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});