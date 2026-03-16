import Link from 'next/link';

export default function TravelPage() {
  return (
    <>
      <ul>
        <li>
          <Link href="/travel/transfer">Transfers</Link>
        </li>
        <li>
          <Link href="/travel/hotels">Hotels</Link>
        </li>
        <li>
          <Link href="/travel/cars">Car Rentals</Link>
        </li>
        <li>
          <Link href="/travel/trains">Trains</Link>
        </li>
        <li>
          <Link href="/travel/flight">Flight</Link>
        </li>
        <li>
          <Link href="/travel/tours">Tours & Activities</Link>
        </li>
        <li>
          <Link href="/travel/events">Events</Link>
        </li>
        <li>
          <Link href="/travel/buses">Bus</Link>
        </li>
        <li>
          <Link href="/travel/meet-and-greet">Meet & Greet</Link>
        </li>
      </ul>
    </>
  );
}
