export default function admin(req, res, next) {

    if (!req.usuario) {
        return res.status(401).json({
            erro: 'Usuário não autenticado.'
        });
    }

    const perfil = req.usuario.perfil ?? req.usuario.cargo;

    if (!perfil || String(perfil).trim().toUpperCase() !== 'ADMIN') {
        return res.status(403).json({
            erro: 'Acesso permitido somente para administradores.'
        });
    }

    next();
}