import { CowEventType } from './cow-event-type.enum';

export interface CowEvent {
  id: string;
  cowTag: string;
  type: CowEventType;
  description: string;
  date: string;
}
