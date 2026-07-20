import { useRef } from 'react';

interface PolyProps {
  as?: keyof React.JSX.IntrinsicElements;
  children?: React.ReactNode;
}

function PolyComponent({ as = 'div', children }: PolyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const Tag = as as 'div';
  return <Tag ref={ref}>{children}</Tag>;
}

// Using with 'li'
const test = <PolyComponent as="li">Content</PolyComponent>;
