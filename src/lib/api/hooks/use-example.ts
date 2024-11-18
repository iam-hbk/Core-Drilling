import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

interface ExampleData {
  id: number;
  title: string;
}

export function useExample(id: number) {
  return useQuery({
    queryKey: ['example', id],
    queryFn: async () => {
      const { data } = await api.get<ExampleData>(`/examples/${id}`);
      return data;
    },
  });
} 