DROP DATABASE IF EXISTS TreeTechnology;
CREATE DATABASE IF NOT EXISTS TreeTechnology;
USE TreeTechnology;

CREATE TABLE IF NOT EXISTS empresa (
id 			 	INT AUTO_INCREMENT,
razao_social 	VARCHAR(100) NOT NULL UNIQUE,
nome_fantasia 	VARCHAR(45) NOT NULL,
email 			VARCHAR(345) NOT NULL UNIQUE,
cnpj 			VARCHAR(18) NOT NULL UNIQUE,
senha 			VARCHAR(16) NOT NULL,

PRIMARY KEY pk_empresa (id)
);

CREATE TABLE IF NOT EXISTS veiculo (
placa 		VARCHAR(7),
fkEmpresa 	INT NOT NULL,

PRIMARY KEY pk_placa (placa),
FOREIGN KEY ForeignKey_fkEmpresa (fkEmpresa) REFERENCES empresa (id)
);

CREATE TABLE IF NOT EXISTS rota (
id 				INT NOT NULL AUTO_INCREMENT,
ponto_partida 	VARCHAR(100) NOT NULL,
ponto_destino 	VARCHAR(100) NOT NULL,

PRIMARY KEY pk_rota (id)
);

CREATE TABLE IF NOT EXISTS rotas_has_veiculo (
fkRota 	INT NOT NULL,
fkPlaca VARCHAR(7) NOT NULL,

PRIMARY KEY pk_rotas_has_veiculo (fkRota, fkPlaca),
FOREIGN KEY ForeignKey_fkRota (fkRota) REFERENCES rota (id),
FOREIGN KEY ForeignKey_fkPlaca (fkPlaca) REFERENCES veiculo (placa)
);

CREATE TABLE IF NOT EXISTS ruas_intermediarias (
id 		INT NOT NULL AUTO_INCREMENT,
rua 	VARCHAR(100) NOT NULL,
ordem 	INT NOT NULL,
fkRota 	INT NOT NULL,

PRIMARY KEY pk_ruas_intermediarias (id),
FOREIGN KEY ForeignKey_fkRota_ruas (fkRota) REFERENCES rota (id)
);

CREATE TABLE IF NOT EXISTS acidente_transito (
id 						INT,
data 					DATE NOT NULL,
dia_semana				VARCHAR(45) NOT NULL,
horario 				TIME NOT NULL,
uf 						CHAR(2) NOT NULL,
municipio 				VARCHAR(100) NOT NULL,
causa_acidente 			VARCHAR(100) NOT NULL,
fase_dia 				VARCHAR(45) NOT NULL,
condicao_metereologica 	VARCHAR(45) NOT NULL,
qtd_veiculos_envolvidos INT NOT NULL,

PRIMARY KEY pk_evento_transito (id),
CONSTRAINT CHECK (fase_dia IN ('Plena Noite', 'Amanhecer', 'Pleno dia', 'Anoitecer')),
CONSTRAINT CHECK (condicao_metereologica IN ('Ceu Claro', 'Chuva', 'Sol', 'Nublado', 'Garoa/Chuvisco'))
);

CREATE TABLE IF NOT EXISTS log (
id 						INT NOT NULL AUTO_INCREMENT,
data_hora 				TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'Data e hora da leitura com milissegundos',
status 					VARCHAR(45) NOT NULL,
arquivo_lido 			VARCHAR(45),
titulo 					TEXT NOT NULL,
descricao 				TEXT NOT NULL,

PRIMARY KEY pk_log (id)
);

SELECT fase_dia, COUNT(*) AS total_fase_dia
FROM acidente_transito
GROUP BY fase_dia;

SELECT condicao_metereologica, COUNT(*) AS total_fase_dia
FROM acidente_transito
GROUP BY condicao_metereologica;