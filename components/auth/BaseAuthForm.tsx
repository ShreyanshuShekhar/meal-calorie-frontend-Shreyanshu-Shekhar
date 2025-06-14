import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

interface BaseAuthFormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  children: React.ReactNode;
  defaultValues?: Partial<z.infer<T>>;
}

export function BaseAuthForm<T extends z.ZodType>({
  schema,
  onSubmit,
  children,
  defaultValues,
}: BaseAuthFormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<T>>({
    // @ts-expect-error - Known type mismatch between zod and @hookform/resolvers/zod
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<T>,
  });

  const handleSubmit = async (values: z.infer<T>) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as Error).message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {children}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
} 