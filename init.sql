CREATE DATABASE clinica;

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    idade INT,
    cliente_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
        ON DELETE CASCADE
);

CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    salario NUMERIC(10,2) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servico (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    duracao_minutos INT,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE agendamento (
    id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'AGENDADO', -- AGENDADO, REALIZADO, CANCELADO
    observacoes TEXT,

    CONSTRAINT fk_animal
        FOREIGN KEY (animal_id) REFERENCES animal(id),

    CONSTRAINT fk_funcionario
        FOREIGN KEY (funcionario_id) REFERENCES funcionario(id),

    CONSTRAINT fk_servico
        FOREIGN KEY (servico_id) REFERENCES servico(id)
);

CREATE TABLE historico_clinico (
    id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    funcionario_id INT,
    data_atendimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    tratamento TEXT,
    observacoes TEXT,

    CONSTRAINT fk_animal_hist
        FOREIGN KEY (animal_id) REFERENCES animal(id),

    CONSTRAINT fk_func_hist
        FOREIGN KEY (funcionario_id) REFERENCES funcionario(id)
);

CREATE TABLE fornecedor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    funcionario_id INT NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) DEFAULT 'FUNCIONARIO',
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_login TIMESTAMP,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_funcionario
        FOREIGN KEY(funcionario_id)
        REFERENCES funcionario(id)
        ON DELETE CASCADE

);