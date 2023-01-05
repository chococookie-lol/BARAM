interface Challenge {
  challengeId: number;
  percentile: number;
  level: string;
  value: number;
  achievedTime: number;
}

type SummonerProfileResponse = SummonerProfile;

interface SummonerProfile {
  userName: string;
  level: number;
  id: string;
  profileIconId: number;
  challenges: Challenge[];
  lastModified: number;
}

type SummonerMatchIds = string[];

interface SummonerMatchIdsResponse {
  summonerName: string;
  matchIds: SummonerMatchIds;
}
