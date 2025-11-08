export const formatValidDateTime = (date: string, locale: string = "en-US") => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
