import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-6xl font-black text-foreground mb-4">404</h1>
    <p className="text-muted-foreground mb-8">This page doesn't exist.</p>
    <Link to="/">
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to RevUp™</Button>
    </Link>
  </div>
);

export default NotFound;
