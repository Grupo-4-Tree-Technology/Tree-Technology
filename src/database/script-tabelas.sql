create database TreeTechnology;
use TreeTechnology;

create table Empresa(
	id int primary key auto_increment,
    nome varchar(50) not null,
    email varchar(50) not null unique key,
    senha varchar(50) not null,
    cnpj varchar(18) not null unique key
);