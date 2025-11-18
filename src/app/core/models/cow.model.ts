import { CowStatus } from './cow-status.enum';
import { CowEvent } from './cow-event.model';

// Interface for cow entity
export interface Cow {
  id: string;          
  earTag: string;     
  sex: 'M' | 'F';
  pen: string;
  status: CowStatus;
  weight?: number;
  dailyWeightGain?: number;
  lastEventDate?: string;
  events?: CowEvent[];
}
