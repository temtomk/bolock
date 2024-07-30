import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('http://localhost:3000/greet', fetcher);

  const updateGreeting = async (newGreeting: string) => {
    try {
      const response = await fetch('http://localhost:3000/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ greeting: newGreeting }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      mutate('http://localhost:3000/greet'); // 데이터 갱신
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  let newGreeting = '';

  return (
    <div>
      <h1>Current Greeting: {data.greeting}</h1>
      <input
        type="text"
        onChange={(e) => {
          newGreeting = e.target.value;
        }}
      />
      <button onClick={() => updateGreeting(newGreeting)}>Set New Greeting</button>
    </div>
  );
}
