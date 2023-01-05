interface Challenge {
  challengeId: number;
  percentile: number;
  level: string;
  value: number;
  achievedTime: number;
}

interface SummonerProfile {
  userName: string;
  level: number;
  id: string;
  profileIconId: number;
  challenges: Challenge[];
  lastModified: number;
}
