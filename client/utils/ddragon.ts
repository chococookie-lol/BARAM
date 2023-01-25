import axios from 'axios';

export const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/';
export const DEAFULT_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
export const DEAFULT_PLACEHOLDER_GRAY =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export const ddragonAxiosInstance = axios.create({
  baseURL: DDRAGON_BASE_URL,
});

export async function getChampionDdragon(
  version: string,
  region: string,
): Promise<ChampionDdragonResponse> {
  return (await ddragonAxiosInstance.get(`${version}/data/${region}/champion.json`)).data;
}

export async function getRuneDdragon(
  version: string,
  region: string,
): Promise<RuneDdragonResponse> {
  return (await ddragonAxiosInstance.get(`${version}/data/${region}/runesReforged.json`)).data;
}

export async function getSummonerDdragon(
  version: string,
  region: string,
): Promise<SummonerDdragonResponse> {
  return (await ddragonAxiosInstance.get(`${version}/data/${region}/summoner.json`)).data;
}

export async function getDdragonVersions(): Promise<string[]> {
  return (await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`)).data;
}

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

export function getMajorVersion(versions: string[], fullVersion: string): string | null {
  for (const version of versions) {
    if (getVersionDiff(version, fullVersion)) {
      return version;
    }
  }
  return null;
}

/**
 *
 * @param min 12.23.1
 * @param full 12.23.483.5208
 * @returns true
 */
export function getVersionDiff(min: string, full: string) {
  const m = min.split('.');
  const f = full.split('.');

  if (m.length > f.length) throw new Error('min must be shorter than full');

  for (let i in m) {
    if (m[i] > f[i]) return false;
  }

  return true;
}
