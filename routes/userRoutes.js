import express from 'express';

const router = express.Router();

// Obtener todos los usuarios (ficticio)
router.get('/', (req, res) => {
  res.json([{ id: 1, nombre: 'Usuario de ejemplo' }]);
});

export default router;
