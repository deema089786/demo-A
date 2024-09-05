import { useCallback, useState } from 'react';

export const uploadClintFileToApp = (
  accept = '.png, .jpg, .svg',
): Promise<File | null> => {
  return new Promise<File | null>((resolve) => {
    const hiddenElement = document.createElement('input');
    hiddenElement.type = 'file';
    hiddenElement.accept = accept;
    hiddenElement.addEventListener('change', async () => {
      try {
        // @ts-ignore
        const selectedFile = [...hiddenElement.files][0];
        if (!selectedFile) {
          resolve(null);
          return;
        }
        resolve(selectedFile);
      } catch (error) {
        resolve(null);
      } finally {
        hiddenElement.remove();
      }
    });
    hiddenElement.click();
  });
};

export const getSrcFromFile = (file: File): Promise<string | null> => {
  return new Promise<string | null>((resolve) => {
    if (!FileReader) {
      resolve(null);
      return;
    }
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.readAsDataURL(file);
  });
};

export const useFileSelector = (params: { accept?: string } = {}) => {
  const { accept = '.png, .jpg, .svg' } = params;
  const [file, setFile] = useState<File | null>(null);
  const [fileSrc, setFileSrc] = useState<string | null>(null);

  const select = useCallback(async () => {
    const file = await uploadClintFileToApp(accept);
    if (!file) return;
    const fileSrc = await getSrcFromFile(file);
    if (!fileSrc) return;

    setFile(file);
    setFileSrc(fileSrc);
  }, [accept]);

  const clear = useCallback(() => {
    setFile(null);
    setFileSrc(null);
  }, []);

  return { fileSrc, file, select, clear };
};
