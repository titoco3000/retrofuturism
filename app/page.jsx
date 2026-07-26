import Image from 'next/image';
import Television from './components/Television';
import Layout from './components/Layout';

export default function Home() {
  return (
    <Television>
      <Layout
        header={'header'}
        footer={'footer'}
        left={'left'}
        right={'right'}
        main={'main'}
      />
    </Television>
  );
}
