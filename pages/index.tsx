import {Layout} from '../components'
import Link from 'next/link'

export default function Home() {
  return (
      <Layout>
        <div className="default_centered_div">
          <Link href={`/itineraries/`}>To itineraries !</Link>
        </div>
      </Layout>
  );
}
