DROP DATABASE IF EXISTS TreeTechnology;
CREATE DATABASE IF NOT EXISTS TreeTechnology;
USE TreeTechnology;

create table Empresa(
	id int primary key auto_increment,
    nome varchar(50) not null,
    email varchar(50) not null unique key,
    senha varchar(50) not null,
    cnpj varchar(18) not null unique key
);

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
tipo 		VARCHAR(45),
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
