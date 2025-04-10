<script setup lang="ts">
import { computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const successColor = theme.current.value.colors.success;
const warningColor = theme.current.value.colors.warning;
const errorColor = theme.current.value.colors.error;
// chart 1
const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 80,
      width: 80,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [successColor],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Sales :'
        }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: '200'
          }
        }
      },
      {
        breakpoint: 960,
        options: {
          chart: {
            width: '400'
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: '100'
          }
        }
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: '60'
          }
        }
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: '100'
          }
        }
      }
    ]
  };
});

const areaChart1 = {
  series: [
    {
      name: 'Sales',
      data: [200, 600, 100, 400, 300, 400, 50]
    }
  ]
};

// chart 2
const chartOptions2 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 80,
      width: 80,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [warningColor],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Sales :'
        }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: '200'
          }
        }
      },
      {
        breakpoint: 960,
        options: {
          chart: {
            width: '400'
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: '100'
          }
        }
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: '60'
          }
        }
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: '100'
          }
        }
      }
    ]
  };
});

const areaChart2 = {
  series: [
    {
      name: 'Sales',
      data: [100, 550, 300, 350, 245, 100, 300]
    }
  ]
};

// chart 3
const chartOptions3 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 80,
      width: 80,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [errorColor],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Sales :'
        }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: '200'
          }
        }
      },
      {
        breakpoint: 960,
        options: {
          chart: {
            width: '400'
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: '100'
          }
        }
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: '60'
          }
        }
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: '100'
          }
        }
      }
    ]
  };
});

const areaChart3 = {
  series: [
    {
      name: 'Sales',
      data: [100, 550, 200, 300, 100, 200, 300]
    }
  ]
};
</script>
<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card variant="outlined" class="bg-surface" rounded="lg">
        <v-card-item>
          <div class="d-flex justify-space-between ga-1">
            <div>
              <h6 class="text-subtitle-1 mb-4">Paid</h6>
              <h4 class="text-h4">$7,825</h4>
              <div class="d-flex">
                <h6 class="me-2 text-subtitle-1 mb-0">9</h6>
                <p class="text-h6 text-lightText mb-0">invoices</p>
              </div>
            </div>
            <div>
              <div class="d-flex align-center justify-end">
                <SvgSprite name="custom-chevron-up-fill-2" class="text-success" style="width: 24px; height: 24px" />
                <p class="text-h6 text-lightText mb-0 ms-2">70.5%</p>
              </div>
              <apexchart type="area" height="80" width="140" :options="chartOptions1" :series="areaChart1.series"> </apexchart>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card variant="outlined" class="bg-surface" rounded="lg">
        <v-card-item>
          <div class="d-flex justify-space-between ga-1">
            <div>
              <h6 class="text-subtitle-1 mb-4">Unpaid</h6>
              <h4 class="text-h4">$1,880</h4>
              <div class="d-flex">
                <h6 class="me-2 text-subtitle-1 mb-0">6</h6>
                <p class="text-h6 text-lightText mb-0">invoices</p>
              </div>
            </div>
            <div>
              <div class="d-flex align-center justify-end">
                <SvgSprite name="custom-chevron-down-fill-2" class="text-warning" style="width: 24px; height: 24px" />
                <p class="text-h6 text-lightText mb-0 ms-2">27.4%</p>
              </div>
              <apexchart type="area" height="80" width="140" :options="chartOptions2" :series="areaChart2.series"> </apexchart>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card variant="outlined" class="bg-surface" rounded="lg">
        <v-card-item>
          <div class="d-flex justify-space-between ga-1">
            <div>
              <h6 class="text-subtitle-1 mb-4">Overdue</h6>
              <h4 class="text-h4">$3,507</h4>
              <div class="d-flex">
                <h6 class="me-2 text-subtitle-1 mb-0">4</h6>
                <p class="text-h6 text-lightText mb-0">invoices</p>
              </div>
            </div>
            <div>
              <div class="d-flex align-center justify-end">
                <SvgSprite name="custom-chevron-down-fill-2" class="text-error" style="width: 24px; height: 24px" />
                <p class="text-h6 text-lightText mb-0 ms-2">27.4%</p>
              </div>
              <apexchart type="area" height="80" width="140" :options="chartOptions3" :series="areaChart3.series"> </apexchart>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
