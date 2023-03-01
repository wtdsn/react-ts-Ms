const http = require('http')

http.createServer((req, res) => {
  console.log("get")
  console.log(req.rawHeaders[1])
  res.setHeader('Set-Cookie', ["mycookie=value111l;path=/;httponly;samesite=stric"]);
  res.end("hellow")
}).listen(3001, () => {
  console.log("at 3001")
})