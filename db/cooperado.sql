CREATE DATABASE IF NOT EXISTS railway_cadastro_cooperados;
USE railway_cadastro_cooperados;

CREATE TABLE IF NOT EXISTS cooperados (
   id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  whatsapp VARCHAR(20),
  endereco VARCHAR(150),
  cep VARCHAR(9),
  cidade VARCHAR(80),
  estado VARCHAR(2),
  profissao VARCHAR(80),
  usuario VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reset_token VARCHAR(100),
  reset_token_expira DATETIME
);