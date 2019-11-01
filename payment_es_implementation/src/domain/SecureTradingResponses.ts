import * as jwtLib from 'jsonwebtoken';


export const ERROR_CODE_OK = '0';
export const ERROR_CODE_AUTH_FAILED = '60022';
export const ERROR_CODE_DECLINED = '70000';

export const SETTLE_STATUS_OK = ['0', '1', '10', '100'];
export const SETTLE_STATUS_SUSPENDED = '2';
export const SETTLE_STATUS_CANCELLED = '3';

export const THREE_DS_OK_STATUSES = ['Y', 'A', 'U', 'C'];
export const THREE_DS_NOT_AUTHENTICATED = 'N';
export const THREE_DS_REJECTED = 'R';

export const THREE_DS_ENROLLED = 'Y';

export interface SecureTradingResponseContent {
  aud: string,
  iat: number,
  payload: SecureTradingAuthResponse | SecureTradingErrorResponse;
}

interface SecureTradingAuthResponse {
  accounttypedescription: string,
  acquirerresponsecode: string,
  authcode: string,
  baseamount: string,
  cavv: string,
  currencyiso3a: string,
  customeroutput: string,
  dccenabled: string,
  eci: string,
  enrolled: string,
  errorcode: string,
  errormessage: string,
  issuer: string,
  issuercountryiso2a: string,
  jwt: string,
  livestatus: string,
  maskedpan: string,
  merchantcountryiso2a: string,
  merchantname: string,
  merchantnumber: string,
  operatorname: string,
  parenttransactionreference: string,
  paymenttypedescription: string,
  requesttypedescription: string,
  securityresponseaddress: string,
  securityresponsepostcode: string,
  securityresponsesecuritycode: string,
  settleduedate: string,
  settlestatus: string,
  splitfinalnumber: string,
  status: string,
  threedversion: string,
  tid: string,
  transactionreference: string,
  transactionstartedtimestamp: string,
}

interface SecureTradingErrorResponse {
  customeroutput: string,
  errorcode: string,
  errormessage: string,
  jwt: string,
  requesttypedescription: string,
  transactionreference: string,
  transactionstartedtimestamp: string,
}

export class SecureTradingResponse {

  constructor(private readonly response: SecureTradingResponseContent) {

  }

  public hasCorrectSignature(secret: string): boolean {
    try {
      jwtLib.verify(this.response.payload.jwt, secret);
      return true;
    } catch (e) {
      return false;
    }
  }

  public isSettled(): boolean {
    return this.responseIsAuth() &&
      SETTLE_STATUS_OK.indexOf(this.settleStatus) !== -1;
  }

  public isSuspended(): boolean {
    return this.responseIsAuth() &&
      this.settleStatus === SETTLE_STATUS_SUSPENDED;
  }

  public isDeclined(): boolean {
    return this.responseIsError() ||
      this.settleStatus === SETTLE_STATUS_CANCELLED;
  }

  private responseIsAuth(): boolean {
    // todo implement
    return true;
  }

  private responseIsError(): boolean {
    // todo implement
    return true;
  }

  get settleStatus(): string {
    return (this.response.payload as SecureTradingAuthResponse).settlestatus;
  }
}
