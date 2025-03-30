export interface User {
    id: string;
    email: string;
    nickName: string;
    experience: number;
    thisLevelExperience: number;
    nextLevelExperience: number;
    level: number;
    createdAt: string;
    blockedAt: string | null;
    archivedAt: string | null;
  }
  