DROP DATABASE IF EXISTS TreeTechnology;
CREATE DATABASE IF NOT EXISTS TreeTechnology;
USE TreeTechnology;

CREATE TABLE IF NOT EXISTS empresa (
id 			 	INT AUTO_INCREMENT, -- PRIMARY KEY 
razao_social 	VARCHAR(100) NOT NULL UNIQUE,
nome_fantasia 	VARCHAR(45) NOT NULL,
email 			VARCHAR(345) NOT NULL UNIQUE,
cnpj 			VARCHAR(18) NOT NULL UNIQUE,
senha 			VARCHAR(45) NOT NULL,

PRIMARY KEY pk_empresa (id)
);

CREATE TABLE IF NOT EXISTS veiculo (
placa 		VARCHAR(7), -- PRIMARY KEY
fkEmpresa 	INT NOT NULL,

PRIMARY KEY pk_placa (placa),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (id)
);

CREATE TABLE IF NOT EXISTS rota (
id 				INT NOT NULL AUTO_INCREMENT,
data_hora 		DATETIME,
ponto_partida 	VARCHAR(100),
ponto_destino 	VARCHAR(100),
tempo_estimado 	TIME,

PRIMARY KEY pk_rota (id)
);

CREATE TABLE IF NOT EXISTS rotas_has_veiculo (
fkRota 	INT NOT NULL,
fkPlaca VARCHAR(7) NOT NULL,

PRIMARY KEY pk_rotas_has_veiculo (fkRota, fkPlaca),
FOREIGN KEY ForeignKey_fkRota (fkRota) REFERENCES rota (id),
FOREIGN KEY ForeignKey_fkPlaca (fkPlaca) REFERENCES veiculo (placa)
);

CREATE TABLE IF NOT EXISTS evento_transito (
id INT AUTO_INCREMENT,
data DATE NOT NULL,
hora TIME NOT NULL,
descricao VARCHAR(100) NOT NULL,
ponto_inicial VARCHAR(100) NOT NULL,
ponto_final VARCHAR(100) NOT NULL,
tipo VARCHAR(45) NOT NULL,
nome_regiao VARCHAR(45) NOT NULL,

PRIMARY KEY pk_evento_transito (id),
CONSTRAINT CHECK (tipo IN ('Lentidão', 'Chuva', 'Acidentes')),
CONSTRAINT CHECK (nome_regiao IN ('Norte', 'Sul', 'Leste', 'Oeste', 'Centro'))
);

