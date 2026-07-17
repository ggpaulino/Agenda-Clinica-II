import { verificarToken } from '../utils/jwt.js';

export default function auth(req, res, next) {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ erro: 'Token não informado.'});
    }

    const partes = authorization.split(' ');
    if (partes.length !== 2) {
        return res.status(401).json({erro: 'Formato do token inválido.' });
    }

    const [tipo, token] = partes;
    if (tipo !== 'Bearer') {
        return res.status(401).json({ erro: 'Tipo de autenticação inválido.'});
    }

    try {
        req.usuario = verificarToken(token);
        next();
    }

    catch {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
}