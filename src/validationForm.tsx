import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
});

export default schema;
