// import Link from "next/link";

import Carousel from "@/components/Carousel"

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      {/* <ul>
        <li>
          <Link href="/meals">Meals</Link>
        </li>
        <li>
          <Link href="/meals/share">Share</Link>
        </li>
        <li>
          <Link href="/community">community</Link>
        </li>
      </ul> */}

      <Carousel/>

    </main>
  );
}
