import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta de usuarios funcionando');
});

// Nueva ruta para obtener usuarios desde la base de datos
router.get('/all', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, apellido, email, rol FROM Usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

export default router;
