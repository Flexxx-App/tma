export const generateTOTP = (secret: string, timeStep: number = 30): number => {
  const epoch = Math.floor(Date.now() / 1000);
  const counter = Math.floor(epoch / timeStep);
  let hash = 0;
  const input = secret + counter.toString();
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
};
