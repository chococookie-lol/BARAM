import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

if (!BASE_URL) throw new Error('API Base url이 없습니다.');

export const defaultAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getSummonerProfile(summonerName: string): Promise<SummonerProfileResponse> {
  return (await defaultAxiosInstance.get(`/summoners/${summonerName}`)).data;
}

export async function fetchSummonerProfile(summonerName: string): Promise<SummonerProfileResponse> {
  await defaultAxiosInstance.post(`/summoners/${summonerName}`);
  return await getSummonerProfile(summonerName);
}

export async function tryToGetSummonerProfile(
  summonerName: string,
): Promise<SummonerProfileResponse> {
  try {
    return await getSummonerProfile(summonerName);
  } catch (e) {
    return await fetchSummonerProfile(summonerName);
  }
}

export async function getSummonerMatchIds(
  puuid: string,
  after?: number,
): Promise<SummonerMatchIdsResponse> {
  return (
    await defaultAxiosInstance.get(`/matches/by-puuid/${puuid}${after ? `?after=${after}` : ''}`)
  ).data;
}

export async function requestFetchSummonerMatches(puuid: string, after?: number): Promise<number> {
  return (
    await defaultAxiosInstance.post(`/matches/by-puuid/${puuid}${after ? `?after=${after}` : ''}`)
  ).status;
}

export async function getMatch(matchId: number): Promise<MatchResponse> {
  return (await defaultAxiosInstance.get(`/matches/${matchId}`)).data;
}

export async function getScoreMultipliers(): Promise<Contribution> {
  return (await defaultAxiosInstance.get(`/statistics/score/multipliers`)).data;
}
