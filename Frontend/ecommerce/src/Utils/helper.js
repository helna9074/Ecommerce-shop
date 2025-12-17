import { format } from "date-fns";



export function formatDate(dateString) {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, yyyy"); 
}
