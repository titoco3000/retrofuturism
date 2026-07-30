import Jagged from './Jagged';
import WithHoles from './WithHoles';

export default function Filter({ children, jagged = false }) {
  console.log(jagged);

  if (jagged) return <Jagged>{children}</Jagged>;
  return <WithHoles>{children}</WithHoles>;
}
