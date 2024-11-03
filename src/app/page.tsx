"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { makeEmptyDepot, userDepotAtom } from "@/store/depot";
import { CountableMaterial, materialMap } from "@/data/material";

export default function Home() {
  /** 사용자의 창고 */
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);

  /** 임시 JSON 문자열 (MAA 툴박스 > Arkntools 내보내기) */
  const JSONString =
    '{"2001":5402,"2002":2816,"2003":394,"2004":75,"30011":568,"30012":575,"30013":379,"30014":18,"30021":365,"30022":483,"30023":163,"30024":13,"30031":372,"30032":490,"30033":175,"30041":191,"30042":555,"30043":395,"30051":240,"30052":664,"30053":279,"30054":9,"30061":272,"30062":588,"30063":422,"30064":14,"30073":328,"30074":4,"30083":463,"30084":4,"30093":343,"30094":2,"30103":346,"30104":1,"30115":11,"30125":3,"30135":10,"30145":2,"31013":416,"31014":16,"31023":353,"31024":4,"31033":184,"31043":170,"31044":1,"31053":189,"31054":13,"31063":202,"31064":34,"31073":44,"31074":10,"31083":45,"31084":17,"32001":11,"3211":20,"3212":7,"3213":1,"3221":19,"3231":19,"3232":11,"3241":11,"3242":1,"3251":10,"3252":2,"3261":8,"3262":10,"3271":17,"3272":23,"3282":1,"3301":918,"3302":1138,"3303":529,"mod_unlock_token":73,"mod_update_token_1":985,"mod_update_token_2":156}';

  /**
   * JSON 형식의 문자열을 받아, 사용자의 창고를 설정
   * @param JSONString JSON 형식의 문자열
   */
  const setUserDepotWithJSON = (JSONString: string) => {
    // 현재 사용자의 창고 상태를 초기화
    const result = makeEmptyDepot();

    try {
      // JSON 형식의 문자열을 JSON 형태로 파싱
      const json = JSON.parse(JSONString);

      for (const materialId in json) {
        // {"materialId": quantity, ...} 형태로 이루어진 JSON 객체를 순회하며, 사용자의 재료 정보를 하나씩 확인함
        // 재료 아이디 및 수량
        const id: string = materialId;
        const quantity: number = json[materialId];

        // 확인한 ID로, ID에 해당하는 재료를 가져옴
        const material = materialMap.get(id);

        if (material) {
          let materialTypeList: CountableMaterial[];

          // 해당 재료가 무슨 타입인지를 확인
          switch (material.type) {
            case "Upgrade":
              materialTypeList = result.Upgrade;
              break;
            case "BattleRecord":
              materialTypeList = result.BattleRecord;
              break;
            case "SkillSummary":
              materialTypeList = result.SkillSummary;
              break;
            case "MemoryChip":
              materialTypeList = result.MemoryChip;
              break;
            case "Module":
              materialTypeList = result.Module;
              break;
            default:
              throw SyntaxError("잘못된 JSON 형식이 입력되었습니다.");
          }

          // 해당 재료가 속하는 타입의 리스트에서, 해당 재료를 찾아 수량을 설정함
          materialTypeList?.forEach((depotCountableMaterial) => {
            if (depotCountableMaterial.material.id == id) {
              depotCountableMaterial.count = quantity;
            }
          });
        } else {
          // 입력된 ID에 해당하는 재료가 없으면, 문자열이 잘못되었거나 업데이트가 되지 않은 상태
          throw SyntaxError(
            `잘못 인식된 ID 및 수량: ${id} - ${quantity} / 잘못된 JSON 형식이 입력되었거나, 현재 업데이트되지 않은 재료가 입력되었습니다.`
          );
        }

        // 사용자의 창고를 입력된 문자열에 존재하는 모든 재료의 수량을 갖도록 설정함
        setUserDepot(result);
      }
    } catch (error) {
      // 에러 발생 시 디버그 용도로 콘솔에 출력함
      console.log(error);
    }

    console.log(result);
  };

  useEffect(() => {
    setUserDepotWithJSON(JSONString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{userDepot.Upgrade.at(0)?.material.name}</p>
    </div>
  );
}
