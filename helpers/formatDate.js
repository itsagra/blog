export default function formatDate(date) {
  return new Date(date).toLocaleString("en-UK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
