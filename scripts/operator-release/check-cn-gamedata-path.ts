import fs from "node:fs";
import path from "node:path";
import { loadCnGamedataPath } from "../operator-generator/loaders/load-gamedata-path";

const main = () => {
  const gamedataPath = loadCnGamedataPath();

  const characterTablePath = path.join(
    gamedataPath,
    "zh_CN",
    "gamedata",
    "excel",
    "character_table.json",
  );

  const activityTablePath = path.join(
    gamedataPath,
    "zh_CN",
    "gamedata",
    "excel",
    "activity_table.json",
  );

  console.log("gamedataPath:", gamedataPath);
  console.log("character_table exists:", fs.existsSync(characterTablePath));
  console.log("activity_table exists:", fs.existsSync(activityTablePath));
};

main();
