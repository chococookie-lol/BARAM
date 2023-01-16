import axios from 'axios';

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

export const getSummonerMatchIds = async (puuid: string): Promise<SummonerMatchIdsResponse> => {
  return await (
    await defaultAxiosInstance.get(`/matches/by-puuid/${puuid}`)
  ).data;
};

export const getMatch = async (matchId: string): Promise<MatchResponse> => {
  return await (
    await defaultAxiosInstance.get(`/matches/${matchId}`)
  ).data;
};
