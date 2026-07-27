import { OperatorReleaseCategory } from "@/data/operator/manual/operator-release-types";

// 이벤트 타입

export type ActivityBasicInfo = {
  id: string;
  type: string | number;
  displayType: string;
  name: string;

  startTime: number;
  endTime: number;
  rewardEndTime?: number;

  displayOnHome?: boolean;
  hasStage?: boolean;

  templateShopId?: string | null;
  medalGroupId?: string | null;
  ungroupedMedalIds?: string[] | null;

  isReplicate?: boolean;
  needFixedSync?: boolean;

  trapDomainId?: string | null;
  recType?: string;

  isPageEntry?: boolean;
  isMagnify?: boolean;
  usePicGroup?: boolean;
};

export type ActivityTable = {
  basicInfo: Record<string, ActivityBasicInfo>;
};

export type ActivityClassification = {
  category: OperatorReleaseCategory;
  isRerun: boolean;
  hasEventShop: boolean;
  isEventCatalogCandidate: boolean;
  isOperatorReleaseCandidate: boolean;
  reasons: string[];
};

export type ActivitySummary = {
  id: string;
  type: string;
  displayType: string;
  name: string;

  category: OperatorReleaseCategory;

  startTime: number;
  endTime: number;
  startDate: string;
  endDate: string;

  isRerun: boolean;
  hasEventShop: boolean;
  isEventCatalogCandidate: boolean;
  isOperatorReleaseCandidate: boolean;

  templateShopId: string | null;

  reasons: string[];
};
