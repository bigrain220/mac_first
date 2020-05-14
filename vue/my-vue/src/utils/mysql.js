const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'rm-wz9jitm8f38o2xs358o.mysql.rds.aliyuncs.com',
  user: 'bluebookadmin',
  password: 'bluebook@2019',
  // 端口, mysql 端口一般是3306
  port: 3306,
  // 数据库的名称
  database: 'bluebooknettest',
})
// connection.connect();

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err)
    return
  }
  console.log('connected as id ' + connection.threadId)
})