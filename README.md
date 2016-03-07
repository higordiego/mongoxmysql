### Comparativo entre banco nosql(mongodb) e relacional(Mysql) usando nodejs


#### Requisito

Ter o banco de dados mysql e mongodb instalado na maquina de teste.

#### Instalando 

```
git clone https://github.com/higordiego/mongoxmysql.git
cd mongoxmysql
npm install
node index.js
```


#Configurando o Banco Mysql, no arquivo mysql/mysql.js terá que criar o banco de dados no mysql depois vá no arquivo e modifique senha e usuário do seu banco mysql

```
create database palestra;

var conexao      =    mysql.createConnection({
	host     : 'localhost', //Host onde se encontra o banco de dados
	user     : 'root', // login do banco de dados
	password : '', // Senha do Banco de Dados
	database : 'palestra', // Banco de dados
	debug    :  false //Debug do banco de dados
});

```

# Seja Feliz :)


### Referência para termino do projeto
https://github.com/webcaetano/mongo-mysql
