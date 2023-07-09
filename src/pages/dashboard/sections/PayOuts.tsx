import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { CardContent, Grid, Link, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { TwitterOutlined, ShoppingOutlined, CheckOutlined, UserOutlined, CreditCardOutlined } from '@ant-design/icons';
import { ReactComponent as CardIcon } from 'assets/icons/credit-card-download.svg';

// ==========================|| DATA WIDGET - LATEST MESSAGES ||========================== //

const PayOuts = () => (
  <Grid item md={6}>
    <MainCard
      title="Выводы средств"
      content={false}
      secondary={
        <Link component={RouterLink} to="/payOut" color="primary">
          Смотреть всё
        </Link>
      }
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          alignItems="center"
          sx={{
            position: 'relative',
            '&>*': {
              position: 'relative',
              zIndex: '5'
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: 153,
              width: 2,
              height: '100%',
              background: '#ebebeb',
              zIndex: '1'
            }
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: 164 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Typography align="left" variant="caption" color="secondary" sx={{ width: '100%' }}>
                      Сегодня, 22:33
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Avatar color="success">
                      <CreditCardOutlined />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography component="div" align="left" variant="subtitle1">
                      + 10 000 USDT TRC-20
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      THErAdMho27E8PxDVwQDQwmN2z1DH8nnVK
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: 164 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Typography align="left" variant="caption" color="secondary">
                      Сегодня, 22:33
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Avatar color="success">
                      <CreditCardOutlined />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography component="div" align="left" variant="subtitle1">
                      + 10 000 USDT TRC-20
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      THErAdMho27E8PxDVwQDQwmN2z1DH8nnVK
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: 164 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Typography align="left" variant="caption" color="secondary">
                      Сегодня, 22:33
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Avatar color="success">
                      <CreditCardOutlined />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography component="div" align="left" variant="subtitle1">
                      + 10 000 USDT TRC-20
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      THErAdMho27E8PxDVwQDQwmN2z1DH8nnVK
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: 164 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Typography align="left" variant="caption" color="secondary">
                      Сегодня, 22:33
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Avatar color="success">
                      <CreditCardOutlined />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography component="div" align="left" variant="subtitle1">
                      + 10 000 USDT TRC-20
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      THErAdMho27E8PxDVwQDQwmN2z1DH8nnVK
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: 164 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Typography align="left" variant="caption" color="secondary">
                      Сегодня, 22:33
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Avatar color="success">
                      <CreditCardOutlined />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography component="div" align="left" variant="subtitle1">
                      + 10 000 USDT TRC-20
                    </Typography>
                    <Typography color="secondary" align="left" variant="caption">
                      THErAdMho27E8PxDVwQDQwmN2z1DH8nnVK
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  </Grid>
);

export default PayOuts;
