import { materialMap } from "@/data/material";
import { Depot, makeEmptyDepot } from "@/store";

// 창고 설정 및 수정 계열

/**
 * 재료 ID, 수량과 변경하고자 하는 창고(Depot) 객체를 받아, Depot 객체에 존재하는 재료 수량을 수정함
 * @param id 재료 ID
 * @param quantity 재료 수량
 * @param depot 변경하고자 하는 Depot 객체
 * @throws SyntaxError
 */
export const setDepotMaterialById = (
  id: string,
  quantity: number,
  depot: Depot
) => {
  // 재료 ID에 해당하는 재료를 미리 매핑해둔 맵에서 가져옴
  const material = materialMap.get(id);

  if (material) {
    // 해당 재료가 속하는 타입의 리스트에서, 해당 재료를 찾아 수량을 설정함
    depot[material.type].forEach((depotCountableMaterial) => {
      if (depotCountableMaterial.material.id == id) {
        depotCountableMaterial.count = quantity;
        return;
      }
    });
  } else {
    // ID에 해당하는 재료가 없으면, 재료 ID가 잘못되었거나 아직 재료가 업데이트가 되지 않은 상태
    throw SyntaxError(
      `잘못 인식된 ID 및 수량: ${id} - ${quantity} / 잘못된 재료 ID가 입력되었거나, 현재 업데이트되지 않은 재료가 입력되었습니다.`
    );
  }
};

/**
 * JSON 형식의 문자열을 받아, 새로운 창고를 설정하고 반환함
 * @param JSONString JSON 형식의 문자열
 * @returns JSON 데이터로 설정된 창고 데이터 (오류 발생 시 null)
 */
export const makeDepotWithJSON = (JSONString: string) => {
  // 빈 창고를 하나 생성
  const result = makeEmptyDepot();

  try {
    // JSON 형식의 문자열을 JSON 형태로 파싱
    const json = JSON.parse(JSONString);

    for (const materialId in json) {
      // {"materialId": quantity, ...} 형태로 이루어진 JSON 객체를 순회하며, 사용자의 재료 정보를 하나씩 확인함
      // 재료 아이디 및 수량
      const id: string = materialId;
      const quantity: number = json[materialId];

      // ID를 기반으로 창고 수정
      setDepotMaterialById(id, quantity, result);
    }
    // 설정된 창고를 반환함
    return result;
  } catch (error) {
    // 에러 발생 시 디버그 용도로 콘솔에 출력하며, 창고 데이터 대신 null을 반환함
    console.log(error);
    return null;
  }
};
