import Link from 'next/link'
import {Clock} from './Clock';
import {AddCount} from './AddCount'

type OwnProps = {
  title: string;
  linkTo: string;
};

export const Page: React.SFC<OwnProps> = ({ title, linkTo }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Clock />
      <AddCount />
      <nav>
        <Link href={linkTo}><a>Navigate</a></Link>
      </nav>
    </div>
  )
}
