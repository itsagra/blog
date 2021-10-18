export default function readingTime(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  if (time > 1) {
    return time + " mins read";
  } else return time + " min read";
}
