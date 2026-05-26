'use client';

import * as React from 'react';
import * as z from 'zod';

import { toast } from 'sonner';

import { addWorkRecord } from '@/app/serverActions';
import { WorkType } from '@/lib/schemas';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  executorName: z.string().min(1, 'Обязательное поле'),
  date: z.string().min(1, 'Обязательное поле'),
  workTypeId: z.string().min(1, 'Обязательное поле'),
  volume: z.string().min(1, 'Обязательное поле'),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

interface AddWorkRecordFormProps {
  workTypes: WorkType[];
  onClose: () => void;
}

export function AddWorkRecordForm({ workTypes, onClose }: AddWorkRecordFormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    executorName: '',
    date: '',
    workTypeId: '',
    volume: '',
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [pending, setPending] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setPending(true);
    const res = await addWorkRecord(result.data);
    setPending(false);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='executorName' className='text-sm font-medium'>
          ФИО исполнителя
        </label>
        <input
          id='executorName'
          name='executorName'
          value={formData.executorName}
          onChange={handleChange}
          className='rounded border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/50'
        />
        {errors.executorName && (
          <span className='text-sm text-destructive'>{errors.executorName}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='date' className='text-sm font-medium'>
          Дата
        </label>
        <input
          id='date'
          name='date'
          type='date'
          value={formData.date}
          onChange={handleChange}
          className='rounded border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/50'
        />
        {errors.date && <span className='text-sm text-destructive'>{errors.date}</span>}
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='workTypeId' className='text-sm font-medium'>
          Вид работы
        </label>
        <select
          id='workTypeId'
          name='workTypeId'
          value={formData.workTypeId}
          onChange={handleChange}
          className='rounded border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/50'
        >
          <option value=''>Выберите вид работы</option>
          {workTypes.map((wt) => (
            <option key={wt.id} value={wt.id}>
              {wt.name}
            </option>
          ))}
        </select>
        {errors.workTypeId && (
          <span className='text-sm text-destructive'>{errors.workTypeId}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='volume' className='text-sm font-medium'>
          Объём
        </label>
        <input
          id='volume'
          name='volume'
          type='number'
          step='0.01'
          min='0'
          value={formData.volume}
          onChange={handleChange}
          className='rounded border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/50'
        />
        {errors.volume && <span className='text-sm text-destructive'>{errors.volume}</span>}
      </div>

      <div className='flex justify-end gap-2 pt-2'>
        <Button type='button' variant='outline' onClick={onClose} disabled={pending}>
          Отмена
        </Button>
        <Button type='submit' disabled={pending}>
          {pending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
