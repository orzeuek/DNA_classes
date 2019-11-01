import { SecureTradingResponse, SecureTradingResponseContent } from '../domain/SecureTradingResponses';
import { PaymentService } from '../domain/PaymentService';
import { Event, EventsRepository } from '../domain/Event';
import { Ok, Error } from "folktale/result/index";

export class ProcessPaymentService {

  constructor(
    private readonly paymentDomainService: PaymentService,
    private readonly eventsRepository: EventsRepository
  ) {
  }


  public async processPayment(requestBody: SecureTradingResponseContent) {
    const stResponse = new SecureTradingResponse(requestBody);
    const result = this.paymentDomainService.processPaymentDetails(stResponse);
    if (result instanceof Error) {
      // do some error handling ...
    }
    try {
      await Promise.all(
        this.paymentDomainService.events.map(async (event: Event) => {
          await this.eventsRepository.add(event);
        })
      );
      this.paymentDomainService.clearEvents();
    } catch (e) {
      // do some error handling ...
    }
  }

}
