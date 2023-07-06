import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Chip, FormControl, Button, Stack, Typography, Link } from '@mui/material';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';

import { dispatch, useSelector } from 'store';
import { getInvoiceSingleList } from 'store/reducers/invoice';

// assets
import { ShareAltOutlined } from '@ant-design/icons';
import { currencySign } from 'utils/transformCurrencyValue';

// ==============================|| INVOICE - Transaction ||============================== //

const Transaction = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigation = useNavigate();

  const { country, list } = useSelector((state) => state.invoice);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getInvoiceSingleList(Number(id))).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const today = new Date(`${list?.date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const due_dates = new Date(`${list?.due_date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const subtotal = list?.invoice_detail?.reduce((prev: any, curr: any) => {
    if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const taxRate = (Number(list?.tax) * subtotal) / 100;
  const discountRate = (Number(list?.discount) * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;
  const componentRef: React.Ref<HTMLDivElement> = useRef(null);

  if (loading) return <Loader />;

  return (
    <>
      <MainCard content={false}>
        <Stack spacing={2.5}>
          <Box sx={{ p: 2.5, pb: 0 }}>
            <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
              <Stack direction="row" justifyContent="space-between" alignItems={'center'} spacing={1}>
                <Typography fontSize={20} color={theme.palette.primary.main} fontWeight={500}>
                  {currencySign.RUB} 500
                </Typography>
                {/* <IconButton onClick={() => navigation(`/apps/invoice/edit/${id}`)}>
                <EditOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton> */}
                {/* <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
                <IconButton>
                  <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </PDFDownloadLink> */}
                {/* <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              /> */}
                <IconButton>
                  <ShareAltOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </Stack>
            </MainCard>
          </Box>
          <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
            <Grid sx={{ alignItems: 'stretch' }} container spacing={2.5}>
              <Grid item xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2}>
                      {/* <LogoSection /> */}
                      <Chip label="Зачислена" variant="light" color="success" size="small" />
                    </Stack>
                    <Typography color="secondary">{list?.invoice_id}</Typography>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography variant="subtitle1">Дата создания</Typography>
                      <Typography color="secondary">{today}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                        Дата обновления
                      </Typography>
                      <Typography color="secondary">{due_dates}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>

              <Grid item sx={{ alignItems: 'stretch' }} container spacing={2.5}>
                <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                  <MainCard sx={{ height: '100%' }}>
                    <Stack spacing={1}>
                      <Typography variant="h5">Информация о транзакции:</Typography>
                      <FormControl sx={{ width: '100%' }}>
                        <Typography color="secondary">Сумма в USDT: {currencySign.USDT} 12</Typography>
                        <Typography color="secondary">Курс USDT/RUB: 88.82</Typography>
                        <Typography color="secondary">Платёжное решение: P2P/RUB</Typography>
                        <Typography color="secondary">Валюта: RUB</Typography>
                        <Link sx={{ fontWeight: 500 }}>Ссылка на платёж</Link>
                      </FormControl>
                    </Stack>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                  <MainCard sx={{ height: '100%' }}>
                    <Stack spacing={1}>
                      <Typography variant="h5">Получатель:</Typography>
                      <FormControl sx={{ width: '100%' }}>
                        <Typography color="secondary">Sberbank</Typography>
                        <Typography color="secondary">4276 43** **** 2416</Typography>
                        <Typography color="secondary">Иван Иванович И</Typography>
                      </FormControl>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={8}></Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  <Typography color="secondary">Нет информации о спорах</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Stack direction="row" spacing={2} sx={{ p: 2.5, a: { textDecoration: 'none', color: 'inherit' } }}>
            {/* <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}> */}
            <Button variant="contained" color="primary">
              Оспорить транзакцию
            </Button>
            {/* </PDFDownloadLink> */}
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
};

export default Transaction;
