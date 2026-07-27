export type Server = "global" | "future";

export type OperatorReleaseCategory =
  | "main_story"
  | "side_story"
  | "mini_event"
  | "roguelike"
  | "server_open"
  | "other";

export type OperatorReleaseSource =
  | "activity_table"
  | "gacha_table"
  | "git_history"
  | "manual";

export type OperatorReleaseEvent = {
  id: string;
  name: string;
  category: OperatorReleaseCategory;
  server: Server;
  source: OperatorReleaseSource;
  operatorIds: string[];
};
