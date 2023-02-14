export type Collections = "games" | "users";

export type SetDoc = {
  newDatas: any;
  collectionId: Collections;
  callback?: () => void;
  docId?: string;
};
