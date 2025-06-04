import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta de citas funcionando');
});

export default router;
