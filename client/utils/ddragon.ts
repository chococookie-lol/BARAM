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

export function runeStyleIdToIcon(runeStyles: RuneStyle[], style: number): string {
  return runeStyles.find((e) => e.id === style)?.icon || 'perk-images/Styles/RunesIcon.png';
}

export function runeIdToIcon(runeStyles: RuneStyle[], style: number, id: number): string {
  return (
    runeStyles.find((e) => e.id === style)?.slots[0].runes.find((e) => e.id === id)?.icon ||
    'perk-images/Styles/RunesIcon.png'
  );
}

export function spellIdToIcon(spells: Spells, id: number): string {
  return spells[
    Object.keys(spells).find((k) => spells[k].key === id.toString()) ||
      'Summoner_UltBookPlaceholder'
  ].image.full;
}
