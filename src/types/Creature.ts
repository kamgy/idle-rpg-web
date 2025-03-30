export interface Creature {
    id: string;
    name: string;
    attributes: {
      Experience: number;
      AttackPoints: number;
      HealthPoints: number;
    };
    loot: Record<string, number>; // Item ID → drop rate
  }
  