import { parseISO, format } from 'date-fns';

export default function formatDate(date: string) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, 'dd-MM-yyyy');

  return formattedDate;
}