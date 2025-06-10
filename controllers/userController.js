import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, phone, password, role } = req.body;

    const adjustedRole = role === 'admin' ? 'administrador' : role;

    // Verificar si el usuario ya existe
    const [existingUser] = await pool.query(
      'SELECT * FROM Usuarios WHERE nombre_usuario = ? OR email = ?', 
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El usuario o email ya existe' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar nuevo usuario
    const [result] = await pool.query(
      'INSERT INTO Usuarios (nombre, nombre_usuario, email, telefono, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [name, username, email, phone, hashedPassword, adjustedRole]
    );

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      userId: result.insertId 
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};
