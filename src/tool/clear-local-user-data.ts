/** localStorage 초기화 */
export const clearLocalUserData = () => {
  localStorage.removeItem("userDepot");
  localStorage.removeItem("selectedOperators");
  localStorage.removeItem("selectedOperatorsMaterial");
  localStorage.removeItem("operatorCollapsed");

  localStorage.removeItem("userNeed");
  localStorage.removeItem("exp");
  localStorage.removeItem("localUpdatedAt");
};
