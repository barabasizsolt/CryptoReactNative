export const getFormattedTime = () => {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedHours}:${formattedMinutes}`;
};
