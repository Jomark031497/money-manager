import express from "express";

async function main() {
  const app = express();

  app.listen(8080, () => console.log("Server running"));
}

main().catch((err) => {
  console.log(err);
});
