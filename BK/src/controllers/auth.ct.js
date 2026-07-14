import pool from '../db.js';
import bcrypt from 'bcryptjs';

export async function login(req, res) {
  const { login, senha } = req.body;

  try {
    const usuarioResult = await pool.query(
      'SELECT * FROM usuario WHERE login = $1',  [login]
    );

    if (usuarioResult.rows.length === 0) {
      return res.status(401).json({ error: 'Login ou senha inválidos' });
    }

    const usuario = usuarioResult.rows[0];

    if (!usuario.ativo) {
      return res.status(403).json({ error: 'Usuário inativo' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({
        error: 'Login ou senha inválidos'
      });
    }

    await pool.query(`UPDATE usuario SET ultimo_login = NOW() WHERE id = $1`, [usuario.id] );

    const funcionarioResult = await pool.query(`SELECT nome, id FROM funcionario WHERE id = $1`, [usuario.funcionario_id]);

    if (funcionarioResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Funcionário não encontrado'
      });
    }

    const funcionario = funcionarioResult.rows[0];
    return res.json({
      usuario: {
        id: usuario.id,
        login: usuario.login,
        perfil: usuario.perfil,
        ativo: usuario.ativo,
        ultimo_login: usuario.ultimo_login,
        funcionario: {
            id: funcionario.id,
            nome: funcionario.nome
        }
    }
 });
   } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ error: 'Erro interno' });
  }
}