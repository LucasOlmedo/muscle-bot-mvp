import exercises from '@/constants/ExercisesData';

export const generateMockList = () => {
  return Array.from({ length: 50 }, (_, index) => ({
    ...exercises[index % exercises.length],
    id: `${exercises[index % exercises.length].id}-
      ${Math.floor(index / exercises.length)}-${Math.random()}`,
    name: `${exercises[index % exercises.length].name}`
  }));
};

export const getPaginatedData = (data: any[], page: number, limit: number) => {
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
};
