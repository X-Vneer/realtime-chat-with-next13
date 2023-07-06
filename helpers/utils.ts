export const generateChateId = (firstId: string, secondId: string) => {
  const sortedIds = [firstId, secondId].sort();

  return `${sortedIds[0]}--${sortedIds[1]}`;
};

export const generatePusherKey = (key: string) => {
  return key.replace(/:/g, "__");
};
