import { PlayerInterface } from 'interfaces/player';
import { ScheduleInterface } from 'interfaces/schedule';

export interface AttendanceInterface {
  id?: string;
  player_id: string;
  schedule_id: string;
  status: string;

  player?: PlayerInterface;
  schedule?: ScheduleInterface;
  _count?: {};
}
