import { Option } from 'ts-option';
import { DateTimeFormatter, LocalDateTime } from 'js-joda';

type PaymentStatus = 'Pending' | 'Declined' | 'Authorised';
type Link = string;
type Amount = number;
type Address = {
  id: Option<number>,
  title: string,
  firstNames: string,
  surname: string,
  address1: string,
  address2: string,
  address3: Option<string>,
  town: string,
  county: string,
  country: string,
  postCode: Option<string>,
  telephoneNumber: string
}


export class Payment {

  public static PERSISTABLE_DATE_FORMAT = DateTimeFormatter.ofPattern('yyy-MM-dd HH:mm:ss');

  constructor(private readonly status: PaymentStatus,
              private readonly amount: number,
              private readonly billingAddress: Address,
              private readonly order: Link,
              private readonly underReview: boolean,
              private readonly fraudChecked: boolean,
              private readonly threeDSecureEnabled: boolean,
              private readonly pan: Option<string>,
              private readonly cardType: Option<string>,
              private readonly expiryDate: string,
              private readonly created: LocalDateTime,
              private readonly updated: Option<LocalDateTime>,
              private readonly lastReference: Option<string>,
              private readonly authReference: Option<string>,
              private readonly currency: string,
              private readonly localAmount: Amount) {
  }

  get snapshot(): PaymentSnapshot {
    return new PaymentSnapshot(
      this.status,
      this.amount,
      this.billingAddress.id.getOrElse(() => {
        throw new Error("Billing address has no id!")
      }),
      this.order,
      this.pan,
      this.cardType,
      this.expiryDate,
      this.created,
      this.updated,
      this.lastReference,
      this.authReference,
      this.currency,
      this.localAmount,
    );
  }

}

export class PersistedPayment {
  constructor(private readonly id: number,
              private readonly payment: PaymentSnapshot
  ) {
  }
}

export class PaymentSnapshot {
  constructor(public readonly status: PaymentStatus,
              public readonly amount: number,
              public readonly addressId: number,
              public readonly order: Link,
              public readonly pan: Option<string>,
              public readonly cardType: Option<string>,
              public readonly expiryDate: string,
              public readonly created: LocalDateTime,
              public readonly updated: Option<LocalDateTime>,
              public readonly lastReference: Option<string>,
              public readonly authReference: Option<string>,
              public readonly currency: string,
              public readonly localAmount: Amount
  ) {
  }
}
