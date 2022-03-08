import { useState } from 'react';
import { Button } from '../common/button';

export const Ping = () => {
  const [pings, setPings] = useState([]);
  const [key, setKey] = useState('defaultkey');
  return (
    <>
      <header>Ping</header>
      <section>
        <input
          type="text"
          className="border-2 border-gray-700 p-2 rounded"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <Button>Ping Connect</Button>
        <Button>Send Ping</Button>
      </section>
    </>
  );
};
