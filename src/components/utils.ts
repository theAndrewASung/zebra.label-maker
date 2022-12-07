
export const loadImageDetailsFromFile = (file: File): Promise<{ url: string, width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    let promiseFulfilled = false;
    const resolveOnce = (result: any) => {
      if (promiseFulfilled) return;
      promiseFulfilled = true;
      return resolve(result);
    };
    const rejectOnce = (error?: any) => {
      if (promiseFulfilled) return;
      promiseFulfilled = true;
      return reject(error);
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (promiseFulfilled) return;

      const url = reader.result?.toString();
      if (!url) return rejectOnce();
  
      const image = new Image()
      image.addEventListener('load', () => resolveOnce({ url, width: image.naturalWidth, height: image.naturalHeight }), false);
      image.addEventListener('error', err => rejectOnce(err), false);
      image.src = url;
    }, false);
    reader.addEventListener('error', err => rejectOnce(err), false);
    reader.readAsDataURL(file);
  })
}