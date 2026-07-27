import Image from 'next/image';
import Television from './components/Television';
import Layout from './components/Layout';
import Filter from './components/Filter';

export default function Home() {
  return (
    <Television>
      <Layout
        header={'header'}
        footer={'footer'}
        left={'left'}
        right={'right'}
        main={
          <div className='p-3'>
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
          </div>
        }
      />
    </Television>
  );
}
