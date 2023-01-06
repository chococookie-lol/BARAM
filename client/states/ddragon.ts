import { atom, selector } from 'recoil';
import { getChampionDdragon, getRuneDdragon, getSummonerDdragon } from '../utils/ddragon';

export const ddragonVersion = atom<string>({
  key: 'ddragonVersion',
  default: '12.23.1',
});

export const ddragonRegion = atom<string>({
  key: 'ddragonRegion',
  default: 'ko_KR',
});

export const ddragonChampions = selector<Champions>({
  key: 'ddragonChampions',
  get: async ({ get }) => {
    return (await getChampionDdragon(get(ddragonVersion), get(ddragonRegion))).data;
  },
});

export const ddragonRunes = selector<RuneStyle[]>({
  key: 'ddragonRunes',
  get: async ({ get }) => {
    return await getRuneDdragon(get(ddragonVersion), get(ddragonRegion));
  },
});

export const ddragonSpells = selector<Spells>({
  key: 'ddragonSpells',
  get: async ({ get }) => {
    return (await getSummonerDdragon(get(ddragonVersion), get(ddragonRegion))).data;
  },
});
