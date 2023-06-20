import Wix from "@/components/Wix";

export default function Home() {
  const data = {
    'United States': 'Washington, D.C.',
    'United Kingdom': 'London',
    France: 'Paris',
    Germany: 'Berlin',
    // China: 'Beijing',
    // Japan: 'Tokyo',
    // Australia: 'Canberra',
    // Brazil: 'Brasília',
    // India: 'New Delhi',
    // Canada: 'Ottawa',
  };

  return (
    <>
      <main>
        <Wix data={data}/>
      </main>
    </>
  );
}
