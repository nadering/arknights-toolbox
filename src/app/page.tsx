"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { userDepotAtom } from "@/store";
import { makeDepotWithJSON } from "@/tool";

export default function Home() {
  /** 사용자의 창고 */
  const [userDepot, setUserDepot] = useAtom(userDepotAtom);

  /** 임시 JSON 문자열 (MAA 툴박스 > Arkntools 내보내기) */
  const JSONString =
    '{"2001":5402,"2002":2816,"2003":394,"2004":75,"30011":568,"30012":575,"30013":379,"30014":18,"30021":365,"30022":483,"30023":163,"30024":13,"30031":372,"30032":490,"30033":175,"30041":191,"30042":555,"30043":395,"30051":240,"30052":664,"30053":279,"30054":9,"30061":272,"30062":588,"30063":422,"30064":14,"30073":328,"30074":4,"30083":463,"30084":4,"30093":343,"30094":2,"30103":346,"30104":1,"30115":11,"30125":3,"30135":10,"30145":2,"31013":416,"31014":16,"31023":353,"31024":4,"31033":184,"31043":170,"31044":1,"31053":189,"31054":13,"31063":202,"31064":34,"31073":44,"31074":10,"31083":45,"31084":17,"32001":11,"3211":20,"3212":7,"3213":1,"3221":19,"3231":19,"3232":11,"3241":11,"3242":1,"3251":10,"3252":2,"3261":8,"3262":10,"3271":17,"3272":23,"3282":1,"3301":918,"3302":1138,"3303":529,"mod_unlock_token":73,"mod_update_token_1":985,"mod_update_token_2":156}';

  useEffect(() => {
    const result = makeDepotWithJSON(JSONString);
    if (result) setUserDepot(result);

    // 데이터 확인을 위해 콘솔에 임시로 출력
    console.log(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{userDepot.Upgrade.at(0)?.material.name}</p>
    </div>
  );
}
