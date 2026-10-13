import fs from "node:fs";
import path from "node:path";
import { loadGamedataPath } from "../operator-generator/loaders/load-gamedata-path";
import { GLOBAL_CHARACTER_TABLE_PATH, GLOBAL_SKILL_TABLE_PATH, GLOBAL_UNIEQUIP_TABLE_PATH } from "../table-path";
import type { CharacterForParser } from "../operator-generator/parsers/parse-character-table";
import type { SkillTableForParser } from "../operator-generator/parsers/parse-skill-table";
import type { UniequipTableForParser } from "../operator-generator/parsers/parse-uniequip-table";

// Explicit maintenance command: never executed as part of the test suite.
const root = loadGamedataPath();
const read = <T,>(relative: string): T => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const charId = "char_263_skadi";
const original = read<Record<string, CharacterForParser>>(GLOBAL_CHARACTER_TABLE_PATH)[charId];
if (!original) throw new Error("스카디 원본 데이터가 없습니다.");
const character = {
  name: original.name, appellation: original.appellation,
  displayNumber: original.displayNumber, profession: original.profession,
  rarity: original.rarity, isNotObtainable: original.isNotObtainable,
  phases: original.phases?.map(({ evolveCost }) => ({ evolveCost })),
  skills: original.skills?.map(({ skillId, levelUpCostCond }) => ({
    skillId, levelUpCostCond: levelUpCostCond?.map(({ levelUpCost }) => ({ levelUpCost })),
  })),
  allSkillLvlup: original.allSkillLvlup?.map(({ lvlUpCost }) => ({ lvlUpCost })),
};
const allSkills = read<SkillTableForParser>(GLOBAL_SKILL_TABLE_PATH);
const skillTable = Object.fromEntries((character.skills ?? []).map(({ skillId }) => {
  if (!skillId || !allSkills[skillId]) throw new Error(`스킬 데이터 누락: ${skillId}`);
  return [skillId, { levels: allSkills[skillId].levels?.map(({ name }) => ({ name })) }];
}));
const allModules = read<UniequipTableForParser>(GLOBAL_UNIEQUIP_TABLE_PATH);
const equipDict = Object.fromEntries(Object.entries(allModules.equipDict ?? {})
  .filter(([, module]) => module.charId === charId)
  .map(([id, module]) => [id, {
    uniEquipId: module.uniEquipId, uniEquipName: module.uniEquipName,
    type: module.type, typeName1: module.typeName1, typeName2: module.typeName2,
    charId: module.charId, charEquipOrder: module.charEquipOrder, itemCost: module.itemCost,
  }]));
const output = path.resolve("tests/fixtures/skadi-gamedata.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify({ charId, character, skillTable, uniequipTable: { equipDict } }, null, 2) + "\n");
console.log("스카디 fixture 갱신: tests/fixtures/skadi-gamedata.json");
