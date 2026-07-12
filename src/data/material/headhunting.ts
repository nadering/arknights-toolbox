import Material from "./material";

/** 순오리지늄 */
export const OriginitePrime: Material = {
  id: "4002",
  name: "순오리지늄",
  objectName: "OriginitePrime",
  imageFilename: "originite-prime",
  type: "Headhunting",
  tier: 6,
};

/** 합성옥 */
export const Orundum: Material = {
  id: "4003",
  name: "합성옥",
  objectName: "Orundum",
  imageFilename: "orundum",
  type: "Headhunting",
  tier: 5,
};

/** 헤드헌팅 재료 리스트 */
export const headhuntingMaterialList: Material[] = [OriginitePrime, Orundum];
