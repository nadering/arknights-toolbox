export type CharacterInfo = {
  name: string;
  profession?: string;
  rarity?: string;
  isNotObtainable?: boolean;
};

export type CharacterTable = Record<string, CharacterInfo>;

export type OperatorFirstAppearance = {
  charId: string;
  name: string;
  profession: string;
  firstSeenCommitHash: string;
  firstSeenCommitDate: string;
};

export type AddedOperatorInfo = {
  charId: string;
  name: string;
  profession: string;
};
