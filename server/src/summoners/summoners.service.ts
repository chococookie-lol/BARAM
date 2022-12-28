import { Injectable } from '@nestjs/common';

@Injectable()
export class SummonersService {
  async findOne(userName: string) {
    return {
      userName,
      level: 123,
      id: '63aaa89b1117f13437f6ab4f',
      profileIconId: 1,
      challenges: [
        {
          challengeId: 402408,
          percentile: 0.5,
          level: 'BRONZE',
          value: 8425,
          achievedTime: 1661939191682,
        },
        {
          challengeId: 402408,
          percentile: 0.5,
          level: 'BRONZE',
          value: 8425,
          achievedTime: 1661939191682,
        },
        {
          challengeId: 402408,
          percentile: 0.5,
          level: 'BRONZE',
          value: 8425,
          achievedTime: 1661939191682,
        },
      ],
      lastModified: 1661939191682,
    };
  }

  async update(userName: string) {
    return { userName };
  }
}
