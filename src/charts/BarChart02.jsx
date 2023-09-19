import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';

import { chartColors } from './ChartjsConfig';
import {
  Chart, BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend, CategoryScale
} from 'chart.js';
import 'chartjs-adapter-moment';
import { useTranslation } from "react-i18next";

// Import utilities
import { formatValue } from '../utils/Utils';

Chart.register(CategoryScale,BarController, BarElement);

function BarChart02({
  data,
  width,
  height
}) {
  const { t } = useTranslation();
  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';
  const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        layout: { padding: { top: 12, bottom: 16, left: 20, right: 20, }, },
        scales: {
          x: {
              stacked: true,
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
              stacked: true,
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
              label: (context) => 'Qty: '+ context.parsed.y,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark;
      chart.options.scales.y.ticks.color = textColor.dark;
      chart.options.scales.y.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.scales.x.ticks.color = textColor.light;
      chart.options.scales.y.ticks.color = textColor.light;
      chart.options.scales.y.grid.color = gridColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update('none');
  }, [currentTheme]);

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  );
}

export default BarChart02;