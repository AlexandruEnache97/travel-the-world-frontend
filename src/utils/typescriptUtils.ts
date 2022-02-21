export interface authUser {
    accountData: CurrentUser,
    accountId: string,
    isAuthenticated: boolean
}

export interface CommentData {
    _id: string,
    userData: any,
    text: string,
    postId: string,
    createdDate: string,
    nrOfLikes?: number
}

export interface CurrentUser {
  username: string,
  email: string,
  profileImage: string,
  country: string,
  userLocation: {
    lat: number,
    lng: number
  }
}

export interface PostData {
  username: string,
  profileImage: string,
  title: string,
  text: string,
  country: string,
  location: string,
  coordinates: {
    lat: number,
    lng: number,
  },
  category: string,
  postImage: string,
  createdDate: number,
}

export interface Post {
  _id: string,
  userData: {
    username: string,
    profileImage: string
  },
  title: string,
  text: string,
  postImage: string,
  location: string,
  category: string,
  createdDate: string,
  country: string,
  shares: number,
  likes: number,
  coordinates: {
    lat: number,
    lng: number,
  }
}
  