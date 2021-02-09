import axios from "axios";

export default async function createPost(title: string, recording: any) {
  const bodyFormData = new FormData();
  bodyFormData.append("title", title);
  bodyFormData.append("file", recording);

  return axios.post("https://localhost:5000/api/posts", bodyFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxMjUxOTUzOCwiZXhwIjoxNjQ0MDc2NDY0fQ.lNNV1CaKX9pAiGhA3FVYO-im7KLWmsFHLGZmegRq8wI`,
    },
  });
}
