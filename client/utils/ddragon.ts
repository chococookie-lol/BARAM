import axios from 'axios';

export const ddragonAxiosInstance = axios.create({
  baseURL: 'https://ddragon.leagueoflegends.com/cdn/',
});

export const getChampionDdragon = async (
  version: string,
  region: string,
): Promise<ChampionDdragonResponse> => {
  return await (
    await ddragonAxiosInstance.get(`${version}/data/${region}/champion.json`)
  ).data;
};

export const getRuneDdragon = async (
  version: string,
  region: string,
): Promise<RuneDdragonResponse> => {
  return await (
    await ddragonAxiosInstance.get(`${version}/data/${region}/runesReforged.json`)
  ).data;
};

export const getSummonerDdragon = async (
  version: string,
  region: string,
): Promise<SummonerDdragonResponse> => {
  return await (
    await ddragonAxiosInstance.get(`${version}/data/${region}/summoner.json`)
  ).data;
};
