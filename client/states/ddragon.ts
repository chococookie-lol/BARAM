import { atom, selector, selectorFamily } from 'recoil';
import {
  getChampionDdragon,
  getRuneDdragon,
  getSummonerDdragon,
  getDdragonVersions,
} from '../utils/ddragon';

interface ChampionDictionary {
  [key: string]: string;
}

export const ddragonVersion = selector<string>({
  key: 'ddragonVersion',
  get: async ({ get }) => {
    return get(ddragonVersions)[0];
  },
});

export const ddragonRegion = atom<string>({
  key: 'ddragonRegion',
  default: 'ko_KR',
});

export const ddragonChampions = selectorFamily<ChampionDictionary, string>({
  key: 'ddragonChampions',
  get:
    (version) =>
    async ({}) => {
      const champions = (await getChampionDdragon(version, 'en_US')).data;
      const result: ChampionDictionary = {};

      for (const key of Object.keys(champions)) {
        result[champions[key].key] = champions[key].id;
      }

      return result;
    },
});

export const ddragonRunes = selectorFamily<RuneDdragonResponse, string>({
  key: 'ddragonRunes',
  get:
    (version: string) =>
    async ({ get }) => {
      return await getRuneDdragon(version, get(ddragonRegion));
    },
});

export const ddragonSpells = selectorFamily<Spells, string>({
  key: 'ddragonSpells',
  get:
    (version: string) =>
    async ({ get }) => {
      return (await getSummonerDdragon(version, get(ddragonRegion))).data;
    },
});

export const ddragonVersions = selector<string[]>({
  key: 'ddragonVersions',
  get: async ({ get }) => {
    return await getDdragonVersions();
  },
});
