export const currentUser = {
  username: 'Alex',
  email: 'alex@gmail.com',
  profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
  country: 'Romania',
  userLocation: {
    lat: 36,
    lng: 32,
  },
};

export const posts = {
  currentPosts: [],
  likedPosts: [],
  totalResults: 0,
  singlePost: {},
};

export const authLogged = {
  accountData: {
    username: 'Alex',
    email: 'alex@gmail.com',
    profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
    country: 'Romania',
    userLocation: {
      lat: 36,
      lng: 32,
    },
  },
  accountId: '1',
  isAuthenticated: true,
};

export const authLoggedOut = {
  accountData: {
    username: '',
    email: '',
    profileImage: '',
    country: '',
    userLocation: {
      lat: 0,
      lng: 0,
    },
  },
  accountId: '',
  isAuthenticated: false,
};

export const singlePost = {
  _id: '1',
  userData: {
    username: 'alex',
    profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
  },
  title: 'Post',
  text: 'Post text',
  postImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
  location: 'Website',
  createdDate: '01302020',
  country: 'Romania',
  category: 'Website',
  shares: 0,
  likes: 0,
  coordinates: {
    lat: 0,
    lng: 0,
  },
};

export const postsList = {
  currentPosts: [singlePost, singlePost],
  likedPosts: [],
  totalResults: 0,
  singlePost: {},
};
