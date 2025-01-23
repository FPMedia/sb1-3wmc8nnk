import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader', () => {
  it('renders with default classes', () => {
    const { container } = render(<Loader />);
    const loader = container.firstChild;
    expect(loader).toHaveClass('flex', 'justify-center', 'items-center');
  });

  it('applies custom className', () => {
    const { container } = render(<Loader className="custom-class" />);
    const loader = container.firstChild;
    expect(loader).toHaveClass('custom-class');
  });
});