export enum ExpeditionStatus {
  Finished = "Finished",
  ReadyToFinish = "ReadyToFinish",
  Active = "Active",
}

export interface Expedition {
  id: string;
  userId: string;
  locationId: string;
  status: ExpeditionStatus;
  hunt: Record<string, number>; // Creature ID → count
  loot: Record<string, number>; // Item ID → count
  statusAt: string;
  startAt: string;
  finishAt: string;
}
