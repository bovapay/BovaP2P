import { useEffect, useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, Modal, Stack, Typography, CardContent, Divider, TextField, CircularProgress } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import { useCreateDealDisputeMutation, useGetDealQuery } from 'store/api/deals/deals.api';

export default function CreateDispute({ isOpen, handleClose, id }: { isOpen: boolean; handleClose(): void; id: string | number }) {
  const [createDispute, { data, isLoading, error, isSuccess }] = useCreateDealDisputeMutation();
  const { refetch } = useGetDealQuery({ id: id as string }, { skip: !id });

  const [submitError, setSubmitError] = useState('');
  function onSubmit(values: any) {
    if (values.files.length > 2) {
      return setSubmitError('Должно быть не более двух файлов');
    }
    createDispute({ amount: values.amount, id: id, files: values.files });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
      <Formik
        initialValues={{ files: null, amount: null }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          files: yup.mixed().required('Загрузите чек.'),
          amount: yup
            .number()
            .typeError('Сумма должна быть числом')
            .min(100, 'Сумма должна быть равна или больше 100')
            .required('Введите сумму перевода .')
        })}
      >
        {({ values, handleSubmit, setFieldValue, touched, errors, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <MainCard content={false} modal title="Оспорить транзакцию">
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} spacing={3}>
                      <Stack spacing={1.5} alignItems="center">
                        <Typography variant="h6" alignSelf={'flex-start'}>
                          Сумма перевода по чеку
                        </Typography>
                        <TextField
                          name="amount"
                          value={values.amount}
                          onChange={handleChange}
                          fullWidth
                          placeholder={`Сумма перевода`}
                          id="outlined-start-adornment"
                        />
                        {errors.amount && touched.amount ? (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.amount}
                          </FormHelperText>
                        ) : null}
                        <Typography variant="h6" alignSelf={'flex-start'}>
                          Чек транзакции
                        </Typography>
                        <UploadMultiFile
                          showList={true}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          error={(touched.files && !!errors.files) || !!submitError}
                          isUploadVisible={false}
                          maxSize={2}
                        />
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files}
                          </FormHelperText>
                        )}
                        {submitError && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {submitError}
                          </FormHelperText>
                        )}
                        {error && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {
                              //@ts-ignore
                              JSON.stringify(error.data)
                            }
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ px: 2.5, py: 2 }}>
                  <Button color="error" size="small" onClick={handleClose}>
                    Отмена
                  </Button>
                  {isLoading ? (
                    <Button>
                      <CircularProgress size={24} />
                    </Button>
                  ) : (
                    <Button size="small" type="submit" onClick={() => null}>
                      Отправить
                    </Button>
                  )}
                </Stack>
              </MainCard>
            </Grid>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
