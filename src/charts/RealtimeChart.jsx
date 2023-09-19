import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';

import { chartColors } from './ChartjsConfig';
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig, formatValue } from '../utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function RealtimeChart({
  data,
  width,
  height,
}) {

  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  // const chartValue = useRef(null);
  // const chartDeviation = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';
  const { textColor, gridColor, tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  const tooltipText= (data) =>{
    let product = data?.dataset?.products[data?.dataIndex]?.product;
    return product.title +' (qty:'+data.parsed.y+')';
  }
  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: { padding: { top: 12, bottom: 16, left: 20, right: 20, }, },
        scales: {
          x: {
            stacked: false,
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 13,
            },
          },
          y: {
            stacked: false,
            ticks: {
              maxTicksLimit: 5,
              color: darkMode ? textColor.dark : textColor.light,
            },
            gridLines: {
              color: '#e6e6e6',
              drawBorder: false,
            },
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              // label: (context) => context.parsed.y,
              label: (context) => tooltipText(context),
              
            },
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 200,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
  }, [data]);

  useEffect(() => {
    if (!chart) return

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark;
      chart.options.scales.y.ticks.color = textColor.dark;
      chart.options.scales.y.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.scales.x.ticks.color = textColor.light;
      chart.options.scales.y.ticks.color = textColor.light;
      chart.options.scales.y.grid.color = gridColor.light;
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update('none')
  }, [currentTheme])


  return (
    <React.Fragment>
      <div className="px-5 py-3">
        {/* <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 tabular-nums">$<span ref={chartValue}>57.81</span></div>
          <div ref={chartDeviation} className="text-sm font-semibold text-white px-1.5 rounded-full"></div>
        </div> */}
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default RealtimeChart;