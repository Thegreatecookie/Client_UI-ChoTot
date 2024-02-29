const imageToBase64 = (images, callback) => {
  if (images && images.length > 0) {
    const promises = [];

    for (const img of images) {
      console.log(images);
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = function () {
          resolve(reader.result);
        };
      });

      promises.push(promise);
    }

    Promise.all(promises).then((results) => {
      callback(results);
    });
  }
};


export { imageToBase64 };
