-- Criação da tabela
CREATE TABLE registro (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ra VARCHAR(10) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf CHAR(11) NOT NULL,
    educacao VARCHAR(100) DEFAULT NULL
);

-- Inserção dos registros
INSERT INTO registro (nome, ra, data_nascimento, cpf, educacao) VALUES
('Antônio Carlos', '074632184', '2007-12-26', '07188310122', NULL),
('Priscila Fernanda', '745299725', '2004-07-01', '02568936211', NULL),
('Maria Flor', '835183990', '1957-12-31', '03468925372', NULL),
('Gabriel Gomes', '962519940', '2007-06-16', '07352835196', NULL),
('Vitor Mello', '073652865', '1989-12-03', '12580341739', NULL),
('Andressa Maria', '072674881', '2004-12-14', '02518359057', NULL),
('Fernanda Aquino', '528299151', '2001-04-01', '07725395293', NULL),
('Jéssica Andrade', '538282893', '2005-10-08', '55627834522', NULL),
('André Gustavo', '625251617', '1998-11-10', '07921566829', NULL),
('Bruna Eduarda', '836143400', '2007-06-02', '20333456489', NULL);
