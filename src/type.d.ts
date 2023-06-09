interface CampsiteType {
  _id: string;
  title: string;
  location: string;
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
  reviews: [
    {
      body: string;
      rating: number;
      _id: string;
    }
  ];
  price?: number;
  description: string;
  author: {
    username: string;
    email: string;
    id: string;
  };
  images: {
    fileName: string;
    url: string;
  };
}

interface UserType {
  username: string;
  id: string;
  email: string;
};

interface ReviewType{
  _id: string;
  body: string;
  rating: number;
};

interface FormInput{
  title: string,
  location: string,
  price: number,
  description:string
}

interface RootState {
  authMaterial: {
    mode: string;
    user: UserType;
    campsites: Array<CampsiteType>;
    campsite: CampsiteType | null;
    reviews: Array<ReviewType>;
  };
  alertMaterial: {
    setShowAlert: (value: boolean) => void;
    errorMess: string;
    showAlert: boolean;
    status: string;
  };
}