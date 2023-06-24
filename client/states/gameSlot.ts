import { selector, selectorFamily } from 'recoil';
import { getMatch, getScoreMultipliers } from '../utils/api';
import { getMajorVersion } from '../utils/ddragon';
import { ddragonVersions } from './ddragon';

interface MatchesSelector {
  match: Match;
  version: string;
  gameContribution: GameContribution;
  blueTeamWin: boolean;
}

export const matchStateFamily = selectorFamily<MatchesSelector, number>({
  key: 'matches',
  get:
    (id: number) =>
    async ({ get }) => {
      const match = await getMatch(id);
      const { info } = match;
      const version = getMajorVersion(get(ddragonVersions), info.gameVersion);
      const blueTeam = info.teams[0];
      const redTeam = info.teams[1];
      const gameContribution = {
        totalMax: {
          dealt: Math.max(blueTeam.contribution.total.dealt, redTeam.contribution.total.dealt),
          damaged: Math.max(
            blueTeam.contribution.total.damaged,
            redTeam.contribution.total.damaged,
          ),
          heal: Math.max(blueTeam.contribution.total.heal, redTeam.contribution.total.heal),
          death: Math.max(blueTeam.contribution.total.death, redTeam.contribution.total.death),
          gold: 0,
          cs: 0,
          kill: 0,
        },
        percentageMax: {
          dealt:
            Math.max(
              blueTeam.contribution.max.dealt / blueTeam.contribution.total.dealt,
              redTeam.contribution.max.dealt / redTeam.contribution.total.dealt,
            ) * 100,
          damaged:
            Math.max(
              blueTeam.contribution.max.damaged / blueTeam.contribution.total.damaged,
              redTeam.contribution.max.damaged / redTeam.contribution.total.damaged,
            ) * 100,
          heal:
            Math.max(
              blueTeam.contribution.max.heal / blueTeam.contribution.total.heal,
              redTeam.contribution.max.heal / redTeam.contribution.total.heal,
            ) * 100,
          death:
            Math.max(
              blueTeam.contribution.max.death / blueTeam.contribution.total.death,
              redTeam.contribution.max.death / redTeam.contribution.total.death,
            ) * 100,
          gold: 0,
          cs: 0,
          kill: 0,
        },
        blueScale: {
          dealt: 1,
          damaged: 1,
          heal: 0,
          death: 0,
          gold: 0,
          cs: 0,
          kill: 0,
        },
        redScale: {
          dealt: 1,
          damaged: 1,
          heal: 0,
          death: 0,
          gold: 0,
          cs: 0,
          kill: 0,
        },
      };

      return {
        match,
        version,
        gameContribution,
        blueTeamWin: blueTeam.win,
      };
    },
});
