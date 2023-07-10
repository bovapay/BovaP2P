import { useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, Modal, Stack, Typography, CardContent, Divider, TextField } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import IconButton from 'components/@extended/IconButton';

// assets
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

export default function CreateDispute({ isOpen, handleClose }: { isOpen: boolean; handleClose(): void }) {
  const [list, setList] = useState(false);

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
      <Formik
        initialValues={{ files: null }}
        onSubmit={(values: any) => {
          // submit form
        }}
        validationSchema={yup.object().shape({
          files: yup.mixed().required('Загрузите чек.')
        })}
      >
        {({ values, handleSubmit, setFieldValue, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <MainCard
                content={false}
                modal
                title="Оспорить транзакцию"
                secondary={
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <IconButton color={list ? 'secondary' : 'primary'} size="small" onClick={() => setList(false)}>
                      <UnorderedListOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color={list ? 'primary' : 'secondary'} size="small" onClick={() => setList(true)}>
                      <AppstoreOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                  </Stack>
                }
              >
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} spacing={3}>
                      <Stack spacing={1.5} alignItems="center">
                        <Typography variant="h6" alignSelf={'flex-start'}>
                          Сумма перевода по чеку
                        </Typography>
                        <TextField fullWidth placeholder={`Сумма перевода`} id="outlined-start-adornment" />
                        <Typography variant="h6" alignSelf={'flex-start'}>
                          Чек транзакции
                        </Typography>
                        <UploadMultiFile
                          showList={list}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          error={touched.files && !!errors.files}
                          isUploadVisible={false}
                        />
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files}
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
                  <Button size="small" type="submit" onClick={() => null}>
                    Отправить
                  </Button>
                </Stack>
              </MainCard>
            </Grid>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
