import * as yup from "yup";
import { CCIDRegExr, phoneRegExr } from "../constants";
export const RegisterSchema = yup.object({
  firstName: yup.string().required("Nhập tên"),
  lastName: yup.string().required("Nhập họ"),
  email: yup
    .string()
    .required("Nhập email")
    .email("Không đúng định dạng email"),
  password: yup.string().required("Nhập mật khẩu"),

  phone: yup
    .string()
    .required("Nhập số điện thoại")
    .matches(phoneRegExr, "Số điện thoại không hợp lệ")
    .length(10, "Số điện thoại phải đúng 10 số"),
  dateOfBirth: yup.string().required("Chọn ngày sinh"),
  CCID: yup
    .string()
    .required("Nhập số căn cước công dân")
    .matches(CCIDRegExr, "Số không hợp lệ")
    .length(12, "Số căn cước phải đúng 10 số"),
});
