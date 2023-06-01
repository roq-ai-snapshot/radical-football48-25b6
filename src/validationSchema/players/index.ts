import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';

export const playerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  date_of_birth: yup.date().required(),
  user_id: yup.string().nullable().required(),
  team_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
});
