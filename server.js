const express = require("express");
const { setupServer } = require("msw/node");

const msw = setupServer();
msw.listen({
  onUnhandledRequest: "bypass",
});

const app = express();
app.get("/", async (_, res) => {
  const apiResponse = await fetch("http://localhost:3001/api");
  res.send(await apiResponse.text());
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});

const api = express();
api.get("/api", (_, res) => {
  res.send("API");
});

api.listen(3001, () => {
  console.log(`API listening on port 3001`);
});

function ping() {
  console.log("pinging...");
  console.table(process.memoryUsage());
  fetch("http://localhost:3000");
  setTimeout(ping, 500);
}
ping();
