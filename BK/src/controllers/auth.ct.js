import pool from '../db.js';
import bcrypt from 'bcryptjs';

export async function login(req, res) {
  const { login, senha } = req.body;

  try {
    const funcionarioResult = await pool.query(
      'SELECT * FROM funcionario WHERE login = $1',  [login]
    );

    if (funcionarioResult.rows.length === 0) {
      return res.status(401).json({ error: 'Login ou senha inválidos' });
    }

    const funcionario = funcionarioResult.rows[0];

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Login ou senha inválidos' });
    }
    // Retorno dos dados do funcionário
    return res.json({
      funcionario: { id: funcionario.id, nome: funcionario.nome, login: funcionario.login }
    });

  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ error: 'Erro interno' });
  }
}

