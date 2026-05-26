'use client';

import * as React from 'react';
import { Dialog } from 'radix-ui';

import { WorkType } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { AddWorkRecordForm } from '@/components/AddWorkRecordForm';

interface AddWorkRecordBtnProps {
  workTypes: WorkType[];
}

export function AddWorkRecordBtn({ workTypes }: AddWorkRecordBtnProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Добавить</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg'>
          <Dialog.Title className='mb-4 text-lg font-semibold'>
            Добавить запись
          </Dialog.Title>
          <AddWorkRecordForm workTypes={workTypes} onClose={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
