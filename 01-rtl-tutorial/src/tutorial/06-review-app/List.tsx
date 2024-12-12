import { Review } from "./Sandbox";

interface ListProps {
  reviews: Review[];
}

export default function List({ reviews }: ListProps) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-bold">Avis</h2>

      <ul>
        {reviews.length <= 0 ? (
          <p>Aucun avis pour l'instant</p>
        ) : (
          reviews.map((r: Review, index: number) => {
            const { email, rating, text } = r;

            return (
              <li key={index} className="mb-4 rounded border p-4">
                <div>
                  <p className="font-semibold">{email}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(Number(rating))}
                  </p>
                  <p className="mt-2">{text}</p>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
