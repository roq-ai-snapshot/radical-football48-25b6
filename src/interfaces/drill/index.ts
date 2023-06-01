import { PracticePlanInterface } from 'interfaces/practice-plan';

export interface DrillInterface {
  id?: string;
  practice_plan_id: string;
  name: string;
  description?: string;

  practice_plan?: PracticePlanInterface;
  _count?: {};
}
