export const truncateText = (text: string, maxLength: number = 150) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength);
  } else {
    return text;
  }
};
