const http = require("http");
const fs = require("fs");
const { getPokeDex } = require("./pokemones.js");

const port = process.env.PORT || 3000;
const server = http.createServer(async (request, response) => {
  if (request.url === "/pokemones") {
    const pokes = await getPokeDex();
    console.log(pokes);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(pokes));
    response.end();
  } else if (request.url === "/") {
    fs.readFile("index.html", "utf8", (err, data) => {
      if (err) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ code: 404, err }));
        return response.end();
      }
      response.writeHead(200, { "Content-Type": "text/html" });
      return response.end(data);
    });
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write(
      `<h1 class='text-warning '>Consulta invalida</h1><br> <h2>vuelva a intentarlo</h2><br/>`,
      "UTF-8"
    );
    response.end();
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
