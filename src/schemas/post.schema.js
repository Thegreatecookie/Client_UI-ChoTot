import * as yup from "yup";
export const PostSchema = yup.object().shape({
//   "detailsPost.condition": yup.string().required(),
//   "detailsPost.traveled": yup
//     .number()
//     .when("detailsPost.condition", (detailsPostCondition) => {
//       return detailsPostCondition === "Đã qua sử dụng"
//         ? yup.number.required()
//         : yup.optional();
//     }),
//   price: yup.number().required(),
});
