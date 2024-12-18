import { getLinkStats } from './actions';
import BarChartComponent from './bar-chart';

export default async function Page() {
  const { clicksByDay, clicksTotal } = await getLinkStats();

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
