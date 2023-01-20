export interface RiotChallengeResponse {
  totalPoints: TotalPoints;
  categoryPoints: CategoryPoints;
  challenges: Challenge[];
  preferences: Preferences;
}

interface Preferences {
  bannerAccent?: string;
  title?: string;
  challengeIds?: number[];
}

interface Challenge {
  challengeId: number;
  percentile: number;
  level: string;
  value: number;
  achievedTime?: number;
  position?: number;
  playersInLevel?: number;
}

interface CategoryPoints {
  TEAMWORK: TotalPoints;
  EXPERTISE: TotalPoints;
  VETERANCY: TotalPoints;
  IMAGINATION: TotalPoints;
  COLLECTION: TotalPoints;
}

interface TotalPoints {
  level: string;
  current: number;
  max: number;
  percentile: number;
}
