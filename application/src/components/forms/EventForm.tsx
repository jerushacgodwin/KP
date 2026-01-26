'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { apiFetch } from '@src/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long!' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long!' }),
  event_time: z.string().min(1, { message: 'Date and time is required!' }),
  class_id: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [classes, setClasses] = useState<any[]>([]);
  const [targetAudience, setTargetAudience] = useState<'all' | 'class'>('all');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res: any = await apiFetch(`${apiUrl}/class`, 'GET');
        setClasses(res.result || []);
      } catch (err) {
        console.error("Failed to fetch classes", err);
      }
    };
    fetchClasses();
  }, []);

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const router = useRouter();
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = handleSubmit(async (data) => {
      setLoading(true);
      setError('');
    try {
        const payload = {
            ...data,
            class_id: targetAudience === 'class' ? parseInt(data.class_id || '0') : null
        };
        
        await apiFetch(`${apiUrl}/events/create`, 'POST', payload);
        if(onSuccess) onSuccess();
        else {
             alert("Event Created!");
             window.location.reload(); 
        }

    } catch (err: any) {
        setError(err.message || "Failed to create event");
    } finally {
        setLoading(false);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create New Event</h1>
      
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Event Title"
          name="title"
          register={register}
          error={errors.title}
        />
        <InputField
          label="Event Date & Time"
          name="event_time"
          type="datetime-local" // Ensure step is set for time if needed
          register={register}
          error={errors.event_time}
        />
        
        {/* Target Audience Selection */}
         <div className="flex flex-col gap-2 w-full md:w-full">
            <label className="text-xs text-gray-500">Target Audience</label>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="target" 
                        checked={targetAudience === 'all'} 
                        onChange={() => setTargetAudience('all')}
                    />
                    <span className="text-sm">Whole School (Global)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="target" 
                        checked={targetAudience === 'class'} 
                        onChange={() => setTargetAudience('class')}
                    />
                    <span className="text-sm">Specific Class</span>
                </label>
            </div>
        </div>

        {/* Class Dropdown - Only show if 'class' is selected */}
        {targetAudience === 'class' && (
             <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-xs text-gray-500">Select Class</label>
                <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...register("class_id")}
                >
                <option value="">-- Select Class --</option>
                {classes.map((cls: any) => (
                    <option key={cls.id} value={cls.id}>
                        {cls.name}
                    </option>
                ))}
                </select>
                {errors.class_id?.message && (
                    <p className="text-xs text-red-400">{errors.class_id.message.toString()}</p>
                )}
            </div>
        )}

         <div className="flex flex-col gap-2 w-full md:w-full">
            <label className="text-xs text-gray-500">Description</label>
            <textarea
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("description")}
            rows={4}
            ></textarea>
            {errors.description?.message && (
                <p className="text-xs text-red-400">{errors.description.message.toString()}</p>
            )}
        </div>
      </div>
      
      {error && <span className="text-red-500 text-sm">{error}</span>}
      
      <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition disabled:opacity-50" disabled={loading}>
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
