interface Score {
  index: number;
  score: number;
}

export function calculateContributionRanks(match: Match, scoreMultipliers: Contribution) {
  const scores: Score[] = [];
  const keys = Object.keys(scoreMultipliers) as Array<keyof Contribution>;
  match.info.participants.forEach((p, i) => {
    let score = keys.reduce((total, key) => {
      return total + p.contributionPercentageTotal[key] * scoreMultipliers[key];
    }, 0);
    scores.push({ index: i, score: score });
  });

  scores.sort((a, b) => b.score - a.score);

  scores.forEach((score, i) => {
    match.info.participants[score.index].contributionRank = i;
  });
}

export function getMatchStatistic(match: Match, puuid: string) {
  const teamId = match.info.participants.find((participant) => {
    return participant.puuid === puuid;
  })?.teamId;

  const win = match.info.teams.find((team) => team.teamId === teamId)?.win;
  const totalKill = match.info.teams.find((team) => team.teamId === teamId)?.objectives.champion
    .kills;
  const me = match.info.participants.find((participant) => participant.puuid === puuid);

  if (!teamId || win === undefined || !totalKill || !me) throw new Error('Match 데이터 오류');

  const { kills, deaths, assists } = me;

  const camp = {
    blue: teamId === 100 ? 1 : 0,
    red: teamId === 100 ? 0 : 1,
  };

  const myContribution = me.contribution;
  const myPercentage = me.contributionPercentage;
  const contributionRank = me.contributionRank;

  if (!myContribution || !myPercentage) throw new Error('Match 데이터 오류');

  return {
    win,
    totalKill,
    kills,
    deaths,
    assists,
    camp,
    myContribution,
    contributionRank,
    myPercentage,
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
    rank: 0,
  };

  for (const matchId of Object.keys(matchStatistic)) {
    winRate.win += matchStatistic[matchId].win ? 1 : 0;
    winRate.lose += matchStatistic[matchId].win ? 0 : 1;

    kda.kills += matchStatistic[matchId].kills;
    kda.assists += matchStatistic[matchId].assists;
    kda.deaths += matchStatistic[matchId].deaths;

    camp.blue += matchStatistic[matchId].camp.blue;
    camp.red += matchStatistic[matchId].camp.red;

    gameContribution.rank += matchStatistic[matchId].contributionRank;

    gameContribution.dealtAmount += matchStatistic[matchId].myContribution.dealt;
    gameContribution.damagedAmount += matchStatistic[matchId].myContribution.damaged;
    gameContribution.healAmount += matchStatistic[matchId].myContribution.heal;
    gameContribution.deathAmount += matchStatistic[matchId].myContribution.death;

    gameContribution.dealt += matchStatistic[matchId].myPercentage.dealt;
    gameContribution.damaged += matchStatistic[matchId].myPercentage.damaged;
    gameContribution.heal += matchStatistic[matchId].myPercentage.heal;
    gameContribution.death += matchStatistic[matchId].myPercentage.death;
    kda.killContribution += matchStatistic[matchId].myPercentage.kill;
  }

  const count = Object.keys(matchStatistic).length;

  if (count) {
    kda.killContribution /= count;
    gameContribution.dealt /= count;
    gameContribution.heal /= count;
    gameContribution.damaged /= count;
    gameContribution.death /= count;
    gameContribution.rank /= count;
  }

  return {
    winRate,
    kda,
    camp,
    gameContribution,
  };
}

export type TotalStatistic = ReturnType<typeof getTotalMatchStatistics>;
