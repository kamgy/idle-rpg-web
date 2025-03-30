export interface Location {
  id: string;
  name: string;
  level: number;
  creatures: Record<string, number>; // Creature ID → encounter rate
}
