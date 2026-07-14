import pool from '../db.js';

export async function listarUsuarios() {
    const result = await pool.query(`
        SELECT u.id, u.funcionario_id,f.nome,u.login,u.perfil,u.ativo,u.ultimo_login, u.criado_em FROM usuario u
        INNER JOIN funcionario f ON f.id = u.funcionario_id ORDER BY f.nome`);
    return result.rows;
}
export async function buscarUsuariosPorId(id) {
    const result = await pool.query(`
        SELECT u.id, u.funcionario_id, f.nome,u.login,u.perfil, u.ativo, u.ultimo_login, u.criado_em FROM usuario u
        INNER JOIN funcionario f ON f.id = u.funcionario_id WHERE u.id = $1`, [id]);
    return result.rows[0];
}

export async function buscarUsuarios(login) {
    const result = await pool.query(`SELECT * FROM usuario WHERE login = $1`,[login]);
    return result.rows[0];
}

export async function buscarUsuariosPorFuncionario(funcionarioId) {
    const result = await pool.query(`SELECT * FROM usuario WHERE funcionario_id = $1`,[funcionarioId]);
    return result.rows[0];
}

export async function funcionarioExiste(funcionarioId) {
    const result = await pool.query( `SELECT id FROM funcionario WHERE id = $1`, [funcionarioId] );
    return result.rows.length > 0;
}

export async function criarUsuarios(usuario) {

    const result = await pool.query(`INSERT INTO usuario(funcionario_id,login,senha,perfil,ativo) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [usuario.funcionario_id,usuario.login,usuario.senha,usuario.perfil,usuario.ativo]);
    return result.rows[0];
}

export async function atualizarUsuarios(id, usuario){

    const result = await pool.query(`UPDATE usuario SET login=$1,senha=$2,perfil=$3,ativo=$4 WHERE id=$5 RETURNING * `,
    [usuario.login, usuario.senha,usuario.perfil,usuario.ativo,id]);
    return result.rows[0];
}

export async function deletarUsuarios(id){
    await pool.query(`DELETE FROM usuario WHERE id=$1`,[id]);
}