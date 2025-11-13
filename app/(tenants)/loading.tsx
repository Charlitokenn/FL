'use client';

import { Spinner } from '@/components/ui/shadcn-io/spinner';

const Loader = () => <div className='flex items-center justify-center h-screen'>
  <Spinner className="text-primary" size={32} variant='ellipsis' />
</div>

export default Loader;