'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { type ApiKeyRow, type ApiKeyUsageRow } from '@/db/schema';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartConfig = {
  requestsCount: {
    label: 'Requests Count',
    color: 'hsl(var(--chart-2))',
  },
};

type ApiKeyWithUsage = ApiKeyRow & { usage?: ApiKeyUsageRow };

export default function ApiKeyUsageChart({ usageData }: { usageData: ApiKeyWithUsage[] }) {
  const formattedData = usageData
    .filter((data) => data.usage)
    .map((data) => ({
      name: data.name,
      apiKeyId: data.usage!.apiKeyId,
      requestsCount: data.usage!.requestsCount,
      lastUsedAt: data.usage!.lastUsedAt
        ? new Date(data.usage!.lastUsedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Never',
    }));

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>API Keys Usage</CardTitle>
          <CardDescription>
            Overview of API key usage, showing request counts and last usage.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={true}
                tick={{ fontSize: 12 }}
                interval={0}
                angle={0}
                // label="API Key"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="requestsCount"
                    className="flex flex-col justify-center items-start gap-2"
                    labelFormatter={(value: string) => `API Key: ${value}`}
                    // @ts-expect-error - `requestsCount` is not a valid prop
                    formatter={(value: number) => `Requests: ${value}`}
                  />
                }
              />
              <Bar dataKey="requestsCount" fill={`var(--color-requestsCount)`} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
