export default function truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str;
    }
    
    const trimmed = str.slice(0, num);
    const lastSpaceIndex = trimmed.lastIndexOf(' ');
  
    return `${trimmed.slice(0, lastSpaceIndex)}...`;
  }