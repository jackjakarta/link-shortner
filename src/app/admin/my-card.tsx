'use client';

import { formatDateToDayMonthYearTime } from '@/utils/date';
import React from 'react';

import { AdminContext } from './_components/admin-provider';

export default function CardComponent() {
  const user = React.useContext(AdminContext);

  return (
    <>
      <h1>
        {user?.email} {formatDateToDayMonthYearTime(user?.createdAt)}
      </h1>
      <p>This is my card.</p>
    </>
  );
}
