export type UserData = {
  id: string;
  username: string;
  password: string;
  email: string;
  tag: string;
  location: string;
  aboutMe: string;
  profilePicture: string;
  rating: string;
  followers: number;
  following: number;
  dateCreated: string;
  skills: string[];
  bannerURL: string;
};

export type ServerErrorResponse = {
  status: "error";
  statusCode: number;
  message: string;
};
