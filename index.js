const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", function (err, home) {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", function (err, project) {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html", function (err, registration) {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

http.createServer(function (request, response) {
  let url = request.url;
  response.writeHeader(200, { "Content-Type": "text/html" });
  switch (url) {
    case "/project":
      response.write(projectContent);
      response.end();
      break;
    case "/registration":
      response.write(registrationContent);
      response.end();
      break;
    default:
      response.write(homeContent);
      response.end();
      break;
  }
});

lineDetail.question(`Please provide the full file path -`, (path) => {
  const server = http.createServer(function (req, res) {
    const stream = fs.createReadStream(`${path}`);
    stream.pipe(res);
  });
  lineDetail.close();
  server.listen(3000);
});
