import pool from '../db.js';
import bcrypt from 'bcryptjs';
import { gerarToken } from '../utils/jwt.js';


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

<<<<<<< HEAD
    const funcionarioResult = await pool.query(`SELECT id, nome FROM funcionario WHERE id = $1`, [usuario.funcionario_id]);
=======
    const funcionarioResult = await pool.query(`SELECT nome, id FROM funcionario WHERE id = $1`, [usuario.funcionario_id]);
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9

    if (funcionarioResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Funcionário não encontrado'
      });
    }

    const funcionario = funcionarioResult.rows[0];
<<<<<<< HEAD
    const token = gerarToken({ id: funcionario.id, usuario_id: usuario.id, nome: funcionario.nome, cargo: usuario.perfil});
    return res.json({
      token,
=======
    return res.json({
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
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
<<<<<<< HEAD
 });
   } catch (err) {
=======
});
  } catch (err) {
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ error: 'Erro interno' });
  }
}