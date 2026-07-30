'use client';

import Image from 'next/image';
import Television from './components/Television';
import Layout from './components/Layout';
import Filter from './components/Filter';
import Panel from './components/Panel';
import { useEffect, useState } from 'react';

export default function Home() {
  const [jagged, setJagged] = useState(false);

  return (
    <Television jagged={jagged}>
      <Layout
        header={<Panel>header</Panel>}
        footer={<Panel>footer</Panel>}
        left={<Panel className='h-full'>left</Panel>}
        right={<Panel animation='x-reserved-w'>Praise the omnissiah</Panel>}
        main={
          <Panel>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In,
            consequuntur. Rerum, error numquam iste sint aperiam placeat amet.
            Ducimus quaerat doloremque, iure minima cum obcaecati facere nobis
            officiis nulla at! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. In, consequuntur. Rerum, error numquam iste sint
            aperiam placeat amet. Ducimus quaerat doloremque, iure minima cum
            obcaecati facere nobis officiis nulla at! Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. In, consequuntur. Rerum, error
            numquam iste sint aperiam placeat amet. Ducimus quaerat doloremque,
            iure minima cum obcaecati facere nobis officiis nulla at! Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. In, consequuntur.
            Rerum, error numquam iste sint aperiam placeat amet. Ducimus quaerat
            doloremque, iure minima cum obcaecati facere nobis officiis nulla
            at! Lorem, ipsum dolor sit amet consectetur adipisicing elit. In,
            consequuntur. Rerum, error numquam iste sint aperiam placeat amet.
            Ducimus quaerat doloremque, iure minima cum obcaecati facere nobis
            officiis nulla at! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. In, consequuntur. Rerum, error numquam iste sint
            aperiam placeat amet. Ducimus quaerat doloremque, iure minima cum
            obcaecati facere nobis officiis nulla at! Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. In, consequuntur. Rerum, error
            numquam iste sint aperiam placeat amet. Ducimus quaerat doloremque,
            iure minima cum obcaecati facere nobis officiis nulla at! Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. In, consequuntur.
            Rerum, error numquam iste sint aperiam placeat amet. Ducimus quaerat
            doloremque, iure minima cum obcaecati facere nobis officiis nulla
            at! Lorem, ipsum dolor sit amet consectetur adipisicing elit. In,
            consequuntur. Rerum, error numquam iste sint aperiam placeat amet.
            Ducimus quaerat doloremque, iure minima cum obcaecati facere nobis
            officiis nulla at!
            <input
              type='checkbox'
              value={jagged}
              onChange={(e) => setJagged(e.target.checked)}
            />
          </Panel>
        }
      />
    </Television>
  );
}
