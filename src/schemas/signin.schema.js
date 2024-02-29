import * as yup from "yup";
export const SignInSchema = yup.object({
  email: yup
    .string()
    .required("Nhập email")
    .email("Không đúng định dạng email"),
  password: yup.string().required("Nhập mật khẩu"),
});
