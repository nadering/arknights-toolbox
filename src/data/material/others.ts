import Material from "./material";

/** 순금 */
export const PureGold: Material = {
  id: "3003",
  name: "순금",
  objectName: "PureGold",
  imageFilename: "pure-gold",
  type: "Others",
  tier: 4,
};

/** 구매증명서 */
export const ShopVoucher: Material = {
  id: "4006",
  name: "구매증명서",
  objectName: "ShopVoucher",
  imageFilename: "shop-voucher",
  type: "Others",
  tier: 3,
};

/** 기타 재료 리스트 */
export const othersMaterialList: Material[] = [PureGold, ShopVoucher];
