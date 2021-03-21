/* eslint-disable no-console */
import { storage } from '../utils/firebase';

const fileUploadHandler = async (fileUpload) => {
  const upload = storage.ref(`/images/${fileUpload.name}`).put(fileUpload);
  await upload.on(
    'state_changed',
    (snapshot) => {
      console.log(snapshot);
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref('images')
        .child(fileUpload.name)
        .getDownloadURL()
        .then((url) => url);
    },
  );
};

export default fileUploadHandler;
