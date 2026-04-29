import { setUser, readConfig } from "./config.js";

async function main() {
  setUser("Nick");
  const config = readConfig();
  console.log(config);
}

main();