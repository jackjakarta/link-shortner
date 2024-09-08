import { getLinkStats } from './actions';
import BarChartComponent from './bar-chart';

export default async function Page({ params }: { params: { userId: string } }) {
  const { clicksByDay, clicksTotal } = await getLinkStats(params.userId);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Analytics</h1>
      {clicksByDay.length > 0 && clicksTotal > 0 ? (
        <BarChartComponent clicksByDay={clicksByDay} clicksTotal={clicksTotal} />
      ) : (
        <p className="text-gray-500">No data to display at the moment.</p>
      )}
    </>
  );
}
