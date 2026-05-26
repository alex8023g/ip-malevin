'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowDownUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SortByDateBtn() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') ?? 'desc';
  const nextSort = currentSort === 'desc' ? 'asc' : 'desc';

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', nextSort);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClick}
      className='-ml-2.5 gap-1 px-2.5'
    >
      Дата
      <ArrowDownUp size={14} />
    </Button>
  );
}
