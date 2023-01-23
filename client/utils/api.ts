import axios, { isAxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

if (!BASE_URL) throw new Error('API Base url이 없습니다.');

export const defaultAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getSummonerProfile = async (
  summonerName: string,
): Promise<SummonerProfileResponse> => {
  return await (
    await defaultAxiosInstance.get(`/summoners/${summonerName}`)
  ).data;
};

export const fetchSummonerProfile = async (
  summonerName: string,
): Promise<SummonerProfileResponse> => {
  await defaultAxiosInstance.post(`/summoners/${summonerName}`);
  return await getSummonerProfile(summonerName);
};

export const tryToGetSummonerProfile = async (
  summonerName: string,
): Promise<SummonerProfileResponse> => {
  try {
    return await getSummonerProfile(summonerName);
  } catch (e) {
    return await fetchSummonerProfile(summonerName);
  }
};

export const getSummonerMatchIds = async (
  puuid: string,
  after?: number,
): Promise<SummonerMatchIdsResponse> => {
  return (
    await defaultAxiosInstance.get(`/matches/by-puuid/${puuid}${after ? `?after=${after}` : ''}`)
  ).data;
};

export const requestFetchSummonerMatches = async (
  puuid: string,
  after?: number,
): Promise<number> => {
  return (
    await defaultAxiosInstance.post(`/matches/by-puuid/${puuid}${after ? `?after=${after}` : ''}`)
  ).status;
};

export const getMatch = async (matchId: number): Promise<MatchResponse> => {
  return await (
    await defaultAxiosInstance.get(`/matches/${matchId}`)
  ).data;
};

export const getScoreMultipliers = async (): Promise<Contribution> => {
  return (await defaultAxiosInstance.get(`/statistics/score/multipliers`)).data;
};
