import express from 'express';

const router = express.Router();

// Ejemplo de ruta para login
router.post('/login', (req, res) => {
  res.json({ message: 'Login exitoso (ficticio)' });
});

export default router;
