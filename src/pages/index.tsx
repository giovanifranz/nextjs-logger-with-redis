import { redis } from '../lib/redis';

interface Props {
  logs: string[];
}

export const getServerSideProps = async () => {
  const entries = await redis.lrange('api-request-log', 0, -1);

  return {
    props: { logs: entries } as Props,
  };
};

export default function Home({ logs }: Props) {
  return (
    <>
      <h1>Upstash Logs</h1>
      <pre>{JSON.stringify(logs, null, 2)}</pre>
    </>
  );
}
