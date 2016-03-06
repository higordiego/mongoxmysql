### Mongo x Mysql com performance nodejs





#### Requisito

Ter o banco de dados mysql e mongodb instalado na maquina de teste e criar um database  no mysql com o nome palestra.

#### Instalando 



```
git clone https://github.com/higordiego/mongoxmysql.git
cd mongoxmysql
npm install
node index.js
```

#### Configuração
Configurando o Banco Mysql, no arquivo mysql/mysql.js terá  que modifique senha e usuário do seu banco.

```
var conexao      =    mysql.createConnection({
	host     : 'localhost', //Host onde se encontra o banco de dados
	user     : 'root', // login do banco de dados
	password : '', // Senha do Banco de Dados
	database : 'palestra', // Banco de dados
	debug    :  false //Debug do banco de dados
});

```


Após a configuração do arquivo terá que entrar no console do Mysql, criar um banco de dados chamado "palestra"

```
mysql -u root -p

create database palestra

```

# Seja Feliz :)



### Referência para termino do projeto
https://github.com/webcaetano/mongo-mysql
