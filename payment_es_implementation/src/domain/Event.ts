export interface Event {
  
}

export abstract class EventsRepository {
  abstract async add(event: Event): Promise<void>;
}
