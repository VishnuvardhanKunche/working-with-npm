const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent = ";"

const args = process.argv.slice(2);
let port = 3000; // default
args.forEach((arg) => {
  if (arg.startsWith("--port=")) {
    port = parseInt(arg.split("=")[1], 10);
  }
});

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html",(err,project)=>{
    if (err) {
        throw err;
    }
    projectContent = project;
})

fs.readFile("registration.html",(err,registration)=>{
    if (err) throw err;
    registrationContent = registration;
})

http
    .createServer((request,response)=>{
        let url = request.url
        response.writeHeader(200,{"content-type":"text/html"});
        switch(url){
            case "/project" :
                response.write(projectContent);
                response.end();
                break
            case "/registration":
                response.write(registrationContent);
                response.end();
                break
            default :
                response.write(homeContent);
                response.end();
                break
        }
    })
    .listen(port,()=>{
        console.log("The Port is running in ${port}");
    });