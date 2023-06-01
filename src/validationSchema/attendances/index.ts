import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  status: yup.string().required(),
  player_id: yup.string().nullable().required(),
  schedule_id: yup.string().nullable().required(),
});
