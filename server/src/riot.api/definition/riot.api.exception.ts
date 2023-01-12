import { ServiceUnavailableException } from '@nestjs/common';

export class RiotApiException extends ServiceUnavailableException {
  riotApiHttpCode: number;
  riotApiMessage: string;

  constructor(code: number, message: string) {
    super();
    this.riotApiHttpCode = code;
    this.riotApiMessage = message;
  }
}
