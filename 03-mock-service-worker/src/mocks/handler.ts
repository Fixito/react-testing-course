import { http, HttpResponse } from "msw";
import { Post } from "../hooks/usePosts";

const URL = "http://localhost:5000/posts";

export let posts = [
  {
    id: "1",
    title: "Premier poste",
    likes: 5,
  },
  {
    id: "2",
    title: "Second poste",
    likes: 10,
  },
];

export const handlers = [
  http.get(URL, async () => {
    return HttpResponse.json(posts);
  }),
  http.post(URL, async ({ request }) => {
    const newPost = (await request.json()) as Post;
    newPost.id = Date.now().toString();
    posts.push(newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.patch(`${URL}/:id`, async ({ params, request }) => {
    const { id } = params;
    const updatedPost = (await request.json()) as Post;
    const index = posts.findIndex((p) => p.id === id);
    posts[index] = updatedPost;
    return HttpResponse.json(updatedPost, { status: 200 });
  }),
  http.delete(`${URL}/:id`, async ({ params }) => {
    const { id } = params;
    posts = posts.filter((p) => p.id !== id);
    //! Le status 204 fait boguer
    return HttpResponse.json(null, { status: 200 });
  }),
];

export const getErrorHandler = [
  http.get(URL, () => {
    return HttpResponse.json(
      { message: "Échec lors de la récupération des postes" },
      { status: 500 },
    );
  }),
];

export const createErrorHandler = [
  http.post(URL, () => {
    return HttpResponse.json(
      { message: "Échec lors de la création du poste" },
      { status: 400 },
    );
  }),
];

export const updateErrorHandler = [
  http.patch(`${URL}/:id`, () => {
    return HttpResponse.json(
      { message: "Échec lors de la mise à jour du poste" },
      { status: 400 },
    );
  }),
];

export const deleteErrorHandler = [
  http.delete(`${URL}/:id`, () => {
    return HttpResponse.json(
      { message: "Échec lors de la suppression du poste" },
      { status: 400 },
    );
  }),
];
