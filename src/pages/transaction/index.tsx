import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  IconButton,
  Chip,
  FormControl,
  Button,
  Stack,
  Typography,
  Link,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table
} from '@mui/material';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';

// assets
import { ShareAltOutlined } from '@ant-design/icons';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { useGetDealDisputesQuery, useGetDealQuery } from 'store/api/deals/deals.api';
import { parseDate } from 'utils/parseDate';
import CreateDispute from 'pages/create-dispute/create-dispute';
import TransactionStatusSwitcher from 'components/switchers/TransactionStatusSwitcher';
import CardNumberFormat from 'components/shared/CardNumberFormat';
import DisputesStatusSwitcher from 'components/switchers/DisputesStatusSwitcher';

// ==============================|| INVOICE - Transaction ||============================== //

const Transaction = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { data, isLoading } = useGetDealQuery({ id: id as string }, { skip: !id });
  const { data: disputesData, isLoading: isDisputesLoading } = useGetDealDisputesQuery({ id: id as string }, { skip: !id });
  const [isCreateDisputeVisible, setIsCreateDisputeVisible] = useState(false);

  const componentRef: React.Ref<HTMLDivElement> = useRef(null);

  if (isLoading || isDisputesLoading) return <Loader />;

  return (
    <>
      <CreateDispute isOpen={isCreateDisputeVisible} handleClose={() => setIsCreateDisputeVisible(false)} id={id as string} />
      <MainCard content={false}>
        <Stack spacing={2.5}>
          <Box sx={{ p: 2.5, pb: 0 }}>
            <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
              <Stack direction="row" justifyContent="space-between" alignItems={'center'} spacing={1}>
                <Typography fontSize={20} color={theme.palette.primary.main} fontWeight={600}>
                  {transformCurrencyValue(data?.amount ? +data?.amount : 0, { currency: data?.currency as 'rub' })}
                </Typography>

                {/* <IconButton>
                   <ShareAltOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton> */}
              </Stack>
            </MainCard>
          </Box>
          <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
            <Grid sx={{ alignItems: 'stretch' }} container spacing={2.5}>
              <Grid item xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2} mb={0.5}>
                      <TransactionStatusSwitcher status={data?.state || ''} />
                    </Stack>
                    <Typography color="secondary">{data?.id}</Typography>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography variant="subtitle1">Дата создания</Typography>
                      <Typography color="secondary">{data?.created_at && parseDate(data?.created_at)}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                        Дата обновления
                      </Typography>
                      <Typography color="secondary">{data?.updated_at && parseDate(data?.updated_at)}</Typography>
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
                        <Typography sx={{ lineHeight: 1.8 }} color="secondary">
                          Платёжное решение: P2P/{data?.currency.toUpperCase()}
                        </Typography>
                        <Typography sx={{ lineHeight: 1.8 }} color="secondary">
                          Валюта: {data?.currency?.toUpperCase()}
                        </Typography>
                      </FormControl>
                    </Stack>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                  <MainCard sx={{ height: '100%' }}>
                    <Stack spacing={1}>
                      <Typography variant="h5">Получатель:</Typography>
                      <FormControl sx={{ width: '100%' }}>
                        <Typography sx={{ lineHeight: 1.8, textTransform: 'capitalize' }} color="secondary">
                          {data?.resipient_card.bank_name}
                        </Typography>
                        <Typography sx={{ lineHeight: 1.8 }} color="secondary">
                          <CardNumberFormat value={data?.resipient_card.number} />
                        </Typography>
                        {data?.customer_name && (
                          <Typography sx={{ lineHeight: 1.8 }} color="secondary">
                            {data?.customer_name}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {disputesData?.length === 0 && (
                  <Stack direction="row" spacing={1}>
                    <Typography color="secondary">Нет информации о спорах</Typography>
                  </Stack>
                )}
              </Grid>
              {disputesData && disputesData?.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h5" mb={2}>
                    История споров:
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Чек</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell>Обновлён</TableCell>
                        <TableCell>Создан</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {disputesData.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>{transformCurrencyValue(row.amount, { currency: data?.currency as 'rub' })}</TableCell>
                          <TableCell>
                            <Link href={row.proof_image} target="_blank">
                              {row.proof_image.slice(0, 30)}
                              {row.proof_image.length > 31 && '...'}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <DisputesStatusSwitcher repeated={row.repeated} status={row.state} />
                          </TableCell>
                          <TableCell>{parseDate(row.updated_at)}</TableCell>
                          <TableCell>{parseDate(row.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              )}
            </Grid>
          </Box>
          {(data?.state === 'failed' || data?.state === 'closed_failed') && (
            <Stack direction="row" spacing={2} sx={{ p: 2.5, a: { textDecoration: 'none', color: 'inherit' } }}>
              <Button variant="contained" color="primary" onClick={() => setIsCreateDisputeVisible(true)}>
                Оспорить транзакцию
              </Button>
            </Stack>
          )}
        </Stack>
      </MainCard>
    </>
  );
};

export default Transaction;
