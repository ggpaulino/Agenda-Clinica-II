import pool from '../db.js';

export async function listarUsuarios(req, res) {
    try {
        const result = await pool.query(`SELECT u.funcionario_id, f.nome, u.login,u.perfil,u.ativo,u.ultimo_login FROM usuario u
            INNER JOIN funcionario f ON f.id = u.funcionario_id ORDER BY f.nome`);
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao listar usuários.'});
    }
}

export async function buscarUsuarios(req, res) {
    try {
        const result = await pool.query(`SELECT u.id, u.funcionario_id, f.nome,u.login,u.perfil, u.ativo, u.ultimo_login, u.criado_em FROM usuario u
            INNER JOIN funcionario f ON f.id = u.funcionario_id WHERE u.id = $1`, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    }
}
export async function buscarUsuariosPorFuncionario(req, res) {
    try {
        const result = await pool.query(`SELECT * FROM usuario WHERE funcionario_id = $1`, [req.params.funcionarioId]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar usuário por funcionário.' });
    }
}

export async function buscarUsuariosPorLogin(req, res) {
    try {
        const result = await pool.query(`SELECT * FROM usuario WHERE login = $1`, [req.params.login]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar usuário por login.' });
    }
}

export async function criarUsuarios(req, res) {
    try {
        const usuario = req.body;
        const funcionario = await pool.query(`SELECT * FROM funcionario WHERE id = $1`, [usuario.funcionario_id]);

        if (funcionario.rows.length === 0) {
            return res.status(400).json({ erro: 'Funcionário não encontrado.' });
        }

        const usuarioCriado = await pool.query(`SELECT id FROM usuario WHERE funcionario_id = $1`, [usuario.funcionario_id]);

        if (usuarioCriado.rows.length > 0) {
            return res.status(400).json({ erro: 'Usuário já existe para este funcionário.' });
        }

        const result = await pool.query
        (`INSERT INTO usuario(funcionario_id,login,senha,perfil,ativo) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [usuario.funcionario_id, usuario.login, usuario.senha, usuario.perfil, usuario.ativo]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
}

export async function atualizarUsuarios(req, res) {
    try {
        const { id } = req.params;
        const { usuario } = req.body;

        const usuarioExistente = await pool.query(`SELECT * FROM usuario WHERE id = $1`, [id]);

        if (usuarioExistente.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        
        const result = await pool.query
        (`UPDATE usuario SET login=$1,senha=$2,perfil=$3,ativo=$4 WHERE id=$5 RETURNING *`,
        [usuario.login,senhaFinal,usuario.perfil,usuario.ativo,id]);

        res.json(result.rows[0]);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
    }
}

export async function deletarUsuarios(req, res) {
    try {
        const { id } = req.params;
        await pool.query(`DELETE FROM usuario WHERE id=$1`, [id]);
        res.json({ message: 'Usuário removido' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao deletar usuário.' });
    }  
}