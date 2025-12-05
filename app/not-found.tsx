import Link from 'next/link';
import { Button } from '../components/shared/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl md:text-9xl font-bold mb-6 text-carent-dark tracking-tighter flex justify-center items-center">
          <span className="text-carent-yellow">4</span>
          <span className="text-carent-dark">0</span>
          <span className="text-carent-yellow">4</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-carent-text mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

