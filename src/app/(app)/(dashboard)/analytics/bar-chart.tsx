'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { type ClicksPerDay } from '@/db/functions/link';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'An interactive bar chart';

const chartConfig = {
  totalClicks: {
    label: 'Total Clicks',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function BarChartComponent({
  clicksByDay,
  clicksTotal,
}: {
  clicksByDay: ClicksPerDay[];
  clicksTotal: number;
}) {
  const filteredData = clicksByDay.filter((click) => click.date !== null);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Link Count</CardTitle>
          <CardDescription>Showing total clicks for all links</CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={true}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">{chartConfig.totalClicks.label}</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">{clicksTotal}</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey="totalClicks" fill={`var(--color-totalClicks)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
