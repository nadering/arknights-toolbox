import fs from "node:fs";
import path from "node:path";
import { loadGamedataPath } from "../operator-generator/loaders/load-gamedata-path";

const main = () => {
  const gamedataPath = loadGamedataPath();

  const characterTablePath = path.join(
    gamedataPath,
    "kr",
    "gamedata",
    "excel",
    "character_table.json",
  );

  const activityTablePath = path.join(
    gamedataPath,
    "kr",
    "gamedata",
    "excel",
    "activity_table.json",
  );

  console.log("gamedataPath:", gamedataPath);
  console.log("character_table exists:", fs.existsSync(characterTablePath));
  console.log("activity_table exists:", fs.existsSync(activityTablePath));
};

main();
