import { AttendanceInterface } from 'interfaces/attendance';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  team_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  attendance?: AttendanceInterface[];
  user?: UserInterface;
  team?: TeamInterface;
  _count?: {
    attendance?: number;
  };
}
