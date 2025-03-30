export interface Item {
    id: string;
    name: string;
    attributes: {
      AttackPoints: number;
      DefencePoints: number;
      BuyPrice: number;
      Weight: number;
      SellPrice: number;
    };
  }
  