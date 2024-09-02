export const uploadClintFileToApp = (accept = '.png, .jpg, .svg'):Promise<File|null> => {
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

export const getSrcFromFile = (file: File):Promise<string|null> => {
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
