import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';

export const scheduleValidationSchema = yup.object().shape({
  event_name: yup.string().required(),
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  team_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
});
