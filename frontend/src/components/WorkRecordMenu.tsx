'use client';

import { DropdownMenu } from 'radix-ui';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

import { deleteWorkRecord } from '@/app/serverActions';
import { Button } from '@/components/ui/button';

interface WorkRecordMenuProps {
  recordId: string;
}

export function WorkRecordMenu({ recordId }: WorkRecordMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Меню записи'
          className='h-full w-8 items-center justify-center rounded-none border-l md:size-8 md:rounded-lg md:border-l-0'
        >
          <MoreVertical className='md:hidden' />
          <MoreHorizontal className='hidden md:block' />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          sideOffset={4}
          className='z-50 min-w-[8rem] rounded-lg border bg-background p-1 shadow-md'
        >
          <DropdownMenu.Item
            className='flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm text-destructive outline-none hover:bg-muted focus:bg-muted'
            onSelect={async () => {
              const res = await deleteWorkRecord(recordId);
              if (res?.error) toast.error(res.error);
            }}
          >
            Удалить
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
