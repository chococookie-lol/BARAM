export const mockSummoner = {
  _id: '63c606679355463463e669d5',
  puuid: 'xF6UfEzvrs89bWB3PhtBLKt74bthXbc2QQGY-8YlgcSvmvVw0SOjvM5zMXT6YpSMhsST65BMj0jFlw',
  __v: 0,
  challenges: [
    {
      challengeId: 2022001,
      percentile: 0.006,
      level: 'MASTER',
      value: 28,
      achievedTime: 1660908685089,
      _id: '63c78c013b96d87cb690268b',
    },
    {
      challengeId: 101101,
      percentile: 0,
      level: 'GRANDMASTER',
      value: 128,
      achievedTime: 1656421103633,
      _id: '63c78c013b96d87cb690268c',
    },
    {
      challengeId: 101106,
      percentile: 0.007,
      level: 'MASTER',
      value: 8,
      achievedTime: 1666795991304,
      _id: '63c78c013b96d87cb690268d',
    },
  ],
  isFetching: false,
  level: 123,
  name: 'dolphinlmg',
  profileIconId: 5528,
  updatedAt: '2023-01-25T07:51:18.986Z',
};

const riotApiResponse = {
  id: 'zUoaTGaaWr4n82SsfE16CYF_QP5tNXEhavmIeA37Q9x3tECLER6zfJSAfQ',
  accountId: 's9UeJEC8iGE-nqXTblJ-vgmUOD2KveEfh_oKU6cVM9UgJLh31ClyaBCV',
  puuid: 'xF6UfEzvrs89bWB3PhtBLKt74bthXbc2QQGY-8YlgcSvmvVw0SOjvM5zMXT6YpSMhsST65BMj0jFlw',
  name: 'dolphinlmg',
  profileIconId: 5528,
  revisionDate: 1673682606000,
  summonerLevel: 123,
};

const challenges = {
  totalPoints: {
    level: 'SILVER',
    current: 2440,
    max: 30780,
    percentile: 0.498,
  },
  categoryPoints: {
    EXPERTISE: {
      level: 'IRON',
      current: 165,
      max: 7115,
      percentile: 0.593,
    },
    TEAMWORK: {
      level: 'IRON',
      current: 125,
      max: 8435,
      percentile: 0.605,
    },
    COLLECTION: {
      level: 'SILVER',
      current: 550,
      max: 4200,
      percentile: 0.545,
    },
    IMAGINATION: {
      level: 'PLATINUM',
      current: 1425,
      max: 4730,
      percentile: 0.043,
    },
    VETERANCY: {
      level: 'IRON',
      current: 175,
      max: 6300,
      percentile: 0.611,
    },
  },
  challenges: [
    {
      challengeId: 2022001,
      percentile: 0.005,
      position: 48608,
      playersInLevel: 275151,
      level: 'MASTER',
      value: 28,
      achievedTime: 1660908685089,
    },
    {
      challengeId: 101101,
      percentile: 0.001,
      position: 8724,
      playersInLevel: 375430,
      level: 'GRANDMASTER',
      value: 128,
      achievedTime: 1656421103633,
    },
    {
      challengeId: 101106,
      percentile: 0.007,
      position: 64440,
      playersInLevel: 151929,
      level: 'MASTER',
      value: 8,
      achievedTime: 1666795991304,
    },
  ],
  preferences: {
    bannerAccent: '',
    title: '10110005',
    challengeIds: [2022001, 101101, 101106],
  },
};

export const riotApiService = {
  getSummonerByPuuid: () => riotApiResponse,
  getSummonerByName: () => riotApiResponse,
  getChallenges: () => challenges,
};
