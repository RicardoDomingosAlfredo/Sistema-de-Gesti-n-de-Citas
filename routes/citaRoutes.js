import express from 'express';

const router = express.Router();

// Obtener todas las citas
router.get('/', (req, res) => {
  res.json([{ id: 1, fecha: '2025-06-04', paciente: 'Juan Pérez' }]);
});

export default router;
