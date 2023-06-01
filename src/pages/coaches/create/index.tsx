import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createCoach } from 'apiSdk/coaches';
import { Error } from 'components/error';
import { coachValidationSchema } from 'validationSchema/coaches';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';
import { getUsers } from 'apiSdk/users';
import { getTeams } from 'apiSdk/teams';
import { CoachInterface } from 'interfaces/coach';

function CoachCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CoachInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCoach(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CoachInterface>({
    initialValues: {
      first_name: '',
      last_name: '',
      user_id: (router.query.user_id as string) ?? null,
      team_id: (router.query.team_id as string) ?? null,
      practice_plan: [],
    },
    validationSchema: coachValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Coach
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="first_name" mb="4" isInvalid={!!formik.errors?.first_name}>
            <FormLabel>first_name</FormLabel>
            <Input type="text" name="first_name" value={formik.values?.first_name} onChange={formik.handleChange} />
            {formik.errors.first_name && <FormErrorMessage>{formik.errors?.first_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="last_name" mb="4" isInvalid={!!formik.errors?.last_name}>
            <FormLabel>last_name</FormLabel>
            <Input type="text" name="last_name" value={formik.values?.last_name} onChange={formik.handleChange} />
            {formik.errors.last_name && <FormErrorMessage>{formik.errors?.last_name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'user_id'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team_id'}
            label={'team_id'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'coach',
  operation: AccessOperationEnum.CREATE,
})(CoachCreatePage);
