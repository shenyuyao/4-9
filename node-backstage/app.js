var express = require('express')
var bodyparser = require('body-parser')
var mysql = require('mysql')
var app = express()

app.use(bodyparser.urlencoded({}))
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'baobei',
	port:3307
}) 
app.post('/',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `select * from ruisen where fenlei=${req.body.fenlei}`
		connection.query(sql,function(err,data){
			if(err){
				console.log(err)
				return
			}
			res.send(data)
			connection.end()
		})
	})
})

//删除
app.post('/del',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql=`delete from ruisen where id=${req.body.id}`
		connection.query(sql,(err,data)=>{
			if(err){
				console.log(err)
				return
			}
			res.send(data)
			connection.end()
		})
	})
})

//添加
app.post('/add',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql=`insert into ruisen(name,xb,fenlei) value(?,?,?)`
		connection.query(sql,[json.name,json.xb,json.fenlei],(err,data)=>{
			if(err){
				console.log(err)
				return
			}
			res.send(data)
			connection.end()
		})
	})
})

app.listen(3000,function(){
	console.log('ok')
})
