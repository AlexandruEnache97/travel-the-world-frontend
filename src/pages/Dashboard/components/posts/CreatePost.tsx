/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { storage } from '../../../../utils/firebase';
import './createPost.scss';
import CountrySelect from '../../../LandingPage/components/CountrySelect';
import countryCoordinates from '../../../../utils/countryCoordinates';
import PostMapLocation from './setPostMap/PostMapLocation';
import PreviewImage from '../../../../components/PreviewImage/PreviewImage';
import { PostData } from '../../../../utils/typescriptUtils';

interface Props {
  username: string,
  profileImage: string,
  createPost: (postData: PostData) => void,
  createAlert: (message: string, timeout: number) => void,
  closeModal: () => void
}

const CreatePost: React.FC<Props> = ({
  username, profileImage, createPost, createAlert, closeModal,
}) => {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [keyFile, setKeyFile] = useState<Date>(new Date());
  // const [previewImage, setPreviewImage] = useState(null);
  const [postData, setPostData] = useState({
    username: '',
    profileImage: '',
    title: '',
    text: '',
    country: '',
    location: '',
    coordinates: {
      lat: 33.93,
      lng: 67.71,
    },
    category: '',
    postImage: '',
    createdDate: '',
  });

  const createPostUpload = () => {
    createPost({
      ...postData,
      createdDate: Date.now(),
    });
    setPostData({
      ...postData,
      title: '',
      text: '',
      country: '',
      location: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
      category: '',
      postImage: '',
      createdDate: '',
    });
    closeModal();
    createAlert('Post created!', 3);
  };

  useEffect(() => {
    setPostData({
      ...postData,
      username,
      profileImage,
    });
  }, []);

  useEffect(() => {
    if (postData.postImage !== '') {
      createPostUpload();
      setFileUpload(null);
      setKeyFile(new Date());
    }
  }, [postData.postImage]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) setFileUpload(e.target.files[0]);
    // setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCountry = (country: string) => {
    setPostData({
      ...postData,
      country,
      coordinates: {
        //@ts-ignore
        lat: countryCoordinates[country][0],
        //@ts-ignore
        lng: countryCoordinates[country][1],
      },
    });
  };

  const getPostCoordinates = (coordinates: { lat: number, lng: number}) => {
    setPostData({
      ...postData,
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    });
  };

  const uploadImage = (imageFile: File) => {
    const upload = storage.ref(`/images/${imageFile.name}`).put(imageFile);
    upload.on(
      'state_changed',
      (snapshot) => {
        //@ts-ignore
        console.log(snapshot._delegate);
      },
      (error) => {
        createAlert(error.toString(), 3);
      },
      () => {
        if(fileUpload) {
          storage
            .ref('images')
            .child(fileUpload.name)
            .getDownloadURL()
            .then((url) => setPostData({
              ...postData,
              postImage: url,
            }));
        }
      },
    );
  };

  const imageUploadOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  const uploadHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileUpload !== null) {
      if (fileUpload.size > 1024 * 1024 * 2) {
        try {
          const compressedFile = await imageCompression(fileUpload, imageUploadOptions);
          uploadImage(compressedFile);
        } catch (err) {
          if(typeof err === "string") createAlert(err, 3);
        }
      } else {
        uploadImage(fileUpload);
      }
    } else if (postData.title !== '' && postData.text !== '' && postData.category !== '' && postData.location !== '') {
      createPostUpload();
    }
  };

  const handlePreviewImage = () => {
    setPreviewModal(!previewModal);
  };

  return (
    <div className="create-container">
      <div className="create-top">
        <div className="top-user">
          {profileImage !== '' && <img src={profileImage} alt="userIcon" />}
          <p>{username}</p>
        </div>
        <button className="close-button" type="button" onClick={() => closeModal()}>x</button>
      </div>
      <form onSubmit={uploadHandler}>
        <div className="create-content">
          <div className="create-element">
            <label htmlFor="titlePost">Title</label>
            <input
              name="title"
              type="text"
              id="titlePost"
              placeholder="Your post title"
              value={postData.title}
              onChange={inputChange}
              required
            />
          </div>

          <div className="create-element">
            <label htmlFor="textPost">Description</label>
            <textarea
              name="text"
              id="textPost"
              placeholder="Your post content"
              // resize="none"
              value={postData.text}
              onChange={inputChange}
              required
            />
          </div>

          <div className="create-element">
            <label htmlFor="categoryPost">Category</label>
            <input
              name="category"
              type="text"
              id="categoryPost"
              placeholder="Your post category"
              value={postData.category}
              onChange={inputChange}
              required
            />
          </div>

          <div className="create-element">
            <label htmlFor="countryPost">Country</label>
            <CountrySelect onChangeCountry={onChangeCountry} />
          </div>

          <div className="create-element">
            <label htmlFor="locationPost">Location</label>
            <input
              name="location"
              type="text"
              id="locationPost"
              placeholder="Your post location"
              value={postData.location}
              onChange={inputChange}
              required
            />
          </div>
          <PostMapLocation
            countryCoordinates={postData.coordinates}
            getPostCoordinates={getPostCoordinates}
          />
        </div>
        <div className="create-upload">
          <label htmlFor="uploadImage">Upload image (not required)</label>
          <input
            type="file"
            className="input-upload"
            onChange={onFileChange}
            accept="image/png, image/jpeg"
            //@ts-ignore
            key={keyFile}
          />
          {fileUpload && <button className="preview-button" type="button" onClick={handlePreviewImage}>Preview image</button>}
        </div>
        <div className="create-bottom">
          <button type="submit">
            <img src="https://img.icons8.com/pastel-glyph/64/ffffff/create-new--v3.png" alt="createPost" />
            <p>Create Post</p>
          </button>
        </div>
      </form>
      {previewModal && (
        <PreviewImage
          image={URL.createObjectURL(fileUpload)}
          closeModal={handlePreviewImage}
        />
      )}
    </div>
  );
};

export default CreatePost;
