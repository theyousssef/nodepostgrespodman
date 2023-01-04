var express = require('express');
var router = express.Router();
const { Client } = require('pg')

const cnt ={
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  //database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: 5432,
}

console.log("dbhost is " + cnt.host + "\n dbname is " + process.env.DBNAME)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/createDB',async (req,res)=>{
	const client = new Client(cnt)
        await client.connect()
	const result = await client.query('CREATE DATABASE '+ process.env.DBNAME)
	await client.end()
	console.log(result)
        res.send({"status":"created"});
});

router.get('/showDBs', async (req,res)=>{
	const client = new Client(cnt)
        await client.connect()
        const result = await client.query('SELECT datname FROM pg_database;')
	await client.end()
        res.send(result.rows);
});


const cnt2 ={
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: 5432,
}


router.get('/createTable',async (req,res)=>{
	const client2 = new Client(cnt2)
	await client2.connect()
	 const result = await client2.query(`
         CREATE TABLE USERS(
         ID INT PRIMARY KEY NOT NULL,
         NAME CHAR(50) NOT NULL);`)
	await client2.end()

	res.send({"status":"created"});
});



router.get('/createUsers',async (req,res)=>{
	const client2 = new Client(cnt2)
        await client2.connect()
         const result = await client2.query(`
         insert into users (id, name) values (11111, 'ucf'),(222222,'youssef')`)
        await client2.end()

        res.send({"status":"created"});
});



router.get('/getUsers',async (req,res)=>{
	const client2 = new Client(cnt2)
        await client2.connect()
         const result = await client2.query(`
         select id,name from users`)
        await client2.end()

        res.send(result.rows)
});




router.get('/test',async (req,res)=>{
	//res.send(process.env.HOSTNAME);
	const client = new Client(cnt)
	await client.connect()
	const result = await client.query('SELECT $1::text as message', ['Hello world!'])
	console.log(result.rows[0].message) // Hello world!
	await client.end()
	res.send(result.rows[0].message);

});

module.exports = router;
