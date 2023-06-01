import { AttendanceInterface } from 'interfaces/attendance';
import { TeamInterface } from 'interfaces/team';

export interface ScheduleInterface {
  id?: string;
  team_id: string;
  event_name: string;
  start_time: Date;
  end_time: Date;
  attendance?: AttendanceInterface[];
  team?: TeamInterface;
  _count?: {
    attendance?: number;
  };
}
