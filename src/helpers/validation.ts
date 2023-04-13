import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().min(3).required("Lütfen adınızı girin"),
  lastName: yup.string().min(3).required("Lütfen soyadınızı girin"),
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .required("Lütfen e-posta adresinizi girin"),
  password: yup
    .string()
    .required("Lütfen şifrenizi girin")
    .min(6, "Şifreniz en az 6 karakter uzunluğunda olmalıdır"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .required("Lütfen e-posta adresinizi girin"),
  password: yup
    .string()
    .required("Lütfen şifrenizi girin")
    .min(6, "Şifreniz en az 6 karakter uzunluğunda olmalıdır"),
});
