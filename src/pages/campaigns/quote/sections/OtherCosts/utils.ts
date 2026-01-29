export const normalizeFileName = (fileName: string) => {
  return fileName.normalize("NFD").replace(/\p{Diacritic}/gu, "");
};
