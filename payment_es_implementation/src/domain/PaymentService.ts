import { SecureTradingResponse } from './SecureTradingResponses';
import { Ok, Error } from "folktale/result/index";
import { Event} from './Event';

export class PaymentService {

  private eventsList: Event[] = [];

  constructor(private readonly secret: string) {

  }

  public processPaymentDetails(secureTradingResponse: SecureTradingResponse): Ok|Error {

    if (secureTradingResponse.hasCorrectSignature(this.secret) === false) {
      return Error("Secure Trading response has invalid signature.");
    }

    if(secureTradingResponse.isSettled()){
      this.events.push({"name": "Payment.Authorized"});
      return Ok();
    }

    if(secureTradingResponse.isSuspended()){
      this.events.push({"name": "Payment.Suspended"});
      return Ok();
    }

    if(secureTradingResponse.isDeclined()){
      this.events.push({"name": "Payment.Declined"});
      return Ok();
    }

    return Error("Secure Trading Response not recognized as any of known response types.");
  }

  get events(): Event[] {
    return this.eventsList;
  }

  public clearEvents(): void {
    this.eventsList = [];
  }
}
