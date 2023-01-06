import axios from 'axios';

const version = '12.23.1';
const region = 'ko_KR';

export const ddragonAxiosInstance = axios.create({
  baseURL: `https://ddragon.leagueoflegends.com/cdn/${version}/data/${region}`,
});

export const getChampionDdragon = async (): Promise<ChampionDdragonResponse> => {
  return await (
    await ddragonAxiosInstance.get('/champion.json')
  ).data;
};

export const getRuneDdragon = async (): Promise<RuneDdragonResponse> => {
  return await (
    await ddragonAxiosInstance.get('/runesReforged.json')
  ).data;
};

export const getSummonerDdragon = async (): Promise<SummonerDdragonResponse> => {
  return await (
    await ddragonAxiosInstance.get('/summoner.json')
  ).data;
};
