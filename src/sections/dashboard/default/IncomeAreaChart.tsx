import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';

// types
import { ThemeMode } from 'types/config';
import { useGetStatsQuery } from 'store/api/stats/stats.api';
import { parseDate } from 'utils/parseDate';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { Box, Stack } from '@mui/system';
import { CircularProgress } from '@mui/material';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

interface Props {
  slot: string;
  selectedCurrency: string;
}

const IncomeAreaChart = ({ slot, selectedCurrency }: Props) => {
  const theme = useTheme();
  const { data, isLoading } = useGetStatsQuery({ period: slot, currency: selectedCurrency });

  const { mode } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    data &&
      setOptions((prevState) => ({
        ...prevState,
        colors: [theme.palette.primary.main, theme.palette.primary[700]],
        xaxis: {
          categories: data
            .map((i) => {
              if (slot === 'hour') {
                return parseDate(i.date, 'noWords');
              }
              if (slot === 'day') {
                return parseDate(i.date, 'monthDay');
              }
              if (slot === 'month') {
                return parseDate(i.date, 'monthOnly');
              }
              if (slot === 'year') {
                return parseDate(i.date, 'year');
              }
              return parseDate(i.date);
            })
            .reverse(),
          labels: {
            style: {
              colors: [
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary,
                secondary
              ]
            }
          },
          axisBorder: {
            show: true,
            color: line
          },
          // tickAmount: slot === 'month' ? 11 : 7
          tickAmount: data.length
        },
        yaxis: {
          labels: {
            style: {
              colors: [secondary]
            },
            formatter: function (val, opts) {
              return transformCurrencyValue(val, { currency: selectedCurrency as 'rub' });
            }
          }
        },
        grid: {
          borderColor: line
        },
        theme: {
          mode: mode === ThemeMode.DARK ? 'dark' : 'light'
        },
        tooltip: {
          y: {
            formatter: function (val, opts) {
              return transformCurrencyValue(val, { currency: selectedCurrency as 'rub' });
            }
          }
        }
      }));
  }, [mode, primary, secondary, line, theme, slot, data]);

  const [series, setSeries] = useState<ApexAxisChartSeries>([
    {
      name: 'Оборот',
      data: []
    }
    // {
    //   name: 'Предыдущий период',
    //   data: [0, 43, 14, 56, 24, 105, 68]
    // }
  ]);

  useEffect(() => {
    data &&
      setSeries([
        {
          data: data?.map((i) => +i.sum_amount).reverse()
        }
        // {
        //   name: 'Предыдущий период',
        //   data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
        // }
      ]);
  }, [data]);

  if (isLoading) {
    return (
      <Stack height={450} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );
  }

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

export default IncomeAreaChart;
