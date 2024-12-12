import { useState } from "react";
import Form from "./Form";
import List from "./List";

export interface Review {
  email: string;
  rating: string;
  text: string;
}

export default function Sandbox() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleAddReview = (review: Review) => {
    setReviews([...reviews, review]);
  };

  return (
    <section className="mx-auto max-w-xl p-8">
      <h1 className="mb-8 text-2xl font-bold">Application d'avis</h1>
      <Form onSubmit={handleAddReview} />
      <List reviews={reviews} />
    </section>
  );
}
