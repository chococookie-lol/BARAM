export function getMatchStatistic(match: Match, puuid: string) {
  const teamId = match.info.participants.find((participant) => {
    return participant.puuid === puuid;
  })?.teamId;

  const win = match.info.teams.find((team) => team.teamId === teamId)?.win;
  const totalKill = match.info.teams.find((team) => team.teamId === teamId)?.objectives.champion
    .kills;
  const me = match.info.participants.find((participant) => participant.puuid === puuid);

  if (!teamId || !win || !totalKill || !me) throw new Error('Match 데이터 오류');

  const { kills, deaths, assists } = me;

  const camp = {
    blue: teamId === 100 ? 1 : 0,
    red: teamId === 100 ? 0 : 1,
  };

  const myContribution = me.contribution;

  const totalContribution = match.info.teams.find((team) => team.teamId === teamId)?.contribution;

  if (!totalContribution) throw new Error('Match 데이터 오류');

  return {
    win,
    totalKill,
    kills,
    deaths,
    assists,
    camp,
    myContribution,
    totalContribution,
  };
}

export type MatchStatistic = ReturnType<typeof getMatchStatistic>;

export function getTotalMatchStatistics(matchStatistic: { [index: string]: MatchStatistic }) {
  const winRate = {
    win: 0,
    lose: 0,
  };
  const kda = {
    kills: 0,
    deaths: 0,
    assists: 0,
    killContribution: 0,
  };
  const camp = {
    blue: 0,
    red: 0,
  };
  const gameContribution = {
    dealt: 0,
    dealtAmount: 0,
    heal: 0,
    healAmount: 0,
    death: 0,
    deathAmount: 0,
    damaged: 0,
    damagedAmount: 0,
    place: 0,
  };

  for (const matchId of Object.keys(matchStatistic)) {
    winRate.win += matchStatistic[matchId].win ? 1 : 0;
    winRate.lose += matchStatistic[matchId].win ? 0 : 1;

    kda.kills += matchStatistic[matchId].kills;
    kda.assists += matchStatistic[matchId].assists;
    kda.deaths += matchStatistic[matchId].deaths;
    kda.killContribution += matchStatistic[matchId].totalKill;

    camp.blue += matchStatistic[matchId].camp.blue;
    camp.red += matchStatistic[matchId].camp.red;

    gameContribution.dealt = matchStatistic[matchId].totalContribution.dealt;
    gameContribution.dealtAmount += matchStatistic[matchId].myContribution.dealt;
    gameContribution.damaged += matchStatistic[matchId].totalContribution.damaged;
    gameContribution.damagedAmount += matchStatistic[matchId].myContribution.damaged;
    gameContribution.heal += matchStatistic[matchId].totalContribution.heal;
    gameContribution.healAmount += matchStatistic[matchId].myContribution.heal;
    gameContribution.death += matchStatistic[matchId].totalContribution.death;
    gameContribution.deathAmount += matchStatistic[matchId].deaths;
  }

  kda.killContribution = kda.kills / kda.killContribution;
  gameContribution.dealt = gameContribution.dealtAmount / gameContribution.dealt;
  gameContribution.heal = gameContribution.healAmount / gameContribution.heal;
  gameContribution.damaged = gameContribution.damagedAmount / gameContribution.damaged;
  gameContribution.death = gameContribution.deathAmount / gameContribution.death;

  return {
    winRate,
    kda,
    camp,
    gameContribution,
  };
}

export type TotalStatistic = ReturnType<typeof getTotalMatchStatistics>;
