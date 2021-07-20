import React, { useCallback, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { OptionType, useTradeState } from '../../context/TradeNow';
import { toTokenAmount } from '../../utils/calculations';

const primaryColor = '#12D8FA';
const chartOptions = {
  maintainAspectRatio: false,
  title: { display: false },
  legend: { display: false },
  scales: {
    yAxes: [
      {
        display: true,
      },
    ],
    xAxes: [{ display: false }],
  },
  tooltips: {
    enabled: true,
    intersect: false,
    mode: 'nearest',
  },
  hover: { animationDuration: 0, intersect: false },
  onHover: (_: any, elements: any) => {
    if (elements && elements.length) {
      const chartElem = elements[0];
      const chart = chartElem._chart;
      const ctx = chart.ctx;

      // draw line behind dot
      ctx.globalCompositeOperation = 'destination-over';
      const x = chartElem._view.x;
      const topY = chart.scales['y-axis-0'].top;
      const bottomY = chart.scales['y-axis-0'].bottom;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#77757E80';
      ctx.stroke();
      ctx.restore();

      // now we have to revert to the dot drawing above everything
      ctx.globalCompositeOperation = 'source-over';
    }
  },
};


const Payout: React.FC<{ optionPrice: number }> = ({ optionPrice }) => {
  const { tradeState: { optionType, asset, selectedOtoken  }} = useTradeState();

  const { labels, values } = useMemo(() => {
    const labels: Array<string> = [];
    const values: Array<number> = [];
    const strikePrice = toTokenAmount(selectedOtoken.strikePrice, 8).toNumber();
    const end = strikePrice + 2000;    

    for (let i = 0; i <= end; i += 10) {
      labels.push(`${selectedOtoken.underlyingAsset.symbol}: ${i}`);
      if (optionType === OptionType.CALLS) {
        if (i - strikePrice - optionPrice < -optionPrice) values.push(-optionPrice);
        else values.push(i - strikePrice - optionPrice);
      } else {
        if (strikePrice - i - optionPrice < -optionPrice) values.push(-optionPrice);
        else values.push(strikePrice - i - optionPrice);
      }
    }

    return { labels, values };
  }, [optionPrice, optionType, asset])

  const getData = useCallback(
    (canvas: any) => {
      const ctx = canvas.getContext('2d');
      const gradientStartColor = '#4DADF3BF';
      const gradientStopColor = '#4DADF333';
      let gradient = ctx.createLinearGradient(0, 0, 0, 250);
      gradient.addColorStop(0, gradientStartColor);
      gradient.addColorStop(1, gradientStopColor);
      return {
        labels,
        datasets: [
          {
            label: 'Profit',
            data: values,
            fill: false,
            borderColor: primaryColor,
            pointHoverBorderColor: primaryColor,
            pointHoverBackgroundColor: primaryColor,
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointHoverRadius: 5,
            pointHitRadius: 30,
          },
        ],
      };
    },
    [labels, values],
  );

  return (
    <div className="mt-4">
       <Line
        data={getData}
        type="line"
        width={300}
        height={document.documentElement.clientHeight * 0.25}
        options={chartOptions}
      />
    </div>
  )
};

export default Payout;
