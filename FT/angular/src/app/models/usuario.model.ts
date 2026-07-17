export interface Usuario {
    id?: number;
    funcionario_id: number;
    nome?: string;
    login: string;
    senha: string;
    perfil?: string;
    ativo?: boolean;
    ultimo_login?: Date;
    criado_em?: Date;
}
