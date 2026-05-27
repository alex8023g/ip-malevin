'use client';

import * as React from 'react';
import { Dialog, DropdownMenu } from 'radix-ui';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

import { deleteWorkRecord } from '@/app/serverActions';
import { WorkRecord, WorkType } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { EditWorkRecordForm } from '@/components/EditWorkRecordForm';

interface WorkRecordMenuProps {
  record: WorkRecord;
  workTypes: WorkType[];
}

export function WorkRecordMenu({ record, workTypes }: WorkRecordMenuProps) {
  const [editOpen, setEditOpen] = React.useState(false);

  return (
    <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
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
            className='z-50 min-w-32 rounded-lg border bg-background p-1 shadow-md'
          >
            <DropdownMenu.Item
              className='flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-muted focus:bg-muted'
              onSelect={() => setEditOpen(true)}
            >
              Изменить
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className='flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm text-destructive outline-none hover:bg-muted focus:bg-muted'
              onSelect={async () => {
                const res = await deleteWorkRecord(record.id);
                if (res?.error) toast.error(res.error);
              }}
            >
              Удалить
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg'>
          <Dialog.Title className='mb-4 text-lg font-semibold'>Изменить запись</Dialog.Title>
          <EditWorkRecordForm
            record={record}
            workTypes={workTypes}
            onClose={() => setEditOpen(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
