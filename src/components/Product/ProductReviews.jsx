import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  addReview,
  getReviews,
  hasReviewedProduct,
} from "../../services/reviewService";
import { hasPurchasedProduct } from "../../services/orderService";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadReviews();
    checkPermission();
  }, [productId]);

  async function loadReviews() {
    const data = await getReviews(productId);
    setReviews(data);
  }

  async function checkPermission() {
    const user = auth.currentUser;

    if (!user) return;

    const purchased = await hasPurchasedProduct(
      user.uid,
      productId
    );

    if (!purchased) return;

    const reviewed = await hasReviewedProduct(
      user.uid,
      productId
    );

    if (reviewed) {
      setAlreadyReviewed(true);
      return;
    }

    setCanReview(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) return;

    try {
      await addReview(productId, {
        userId: user.uid,
        userName: user.displayName || user.email,
        rating,
        comment,
        verifiedPurchase: true,
      });

      toast.success("Review added.");

      setComment("");
      setRating(5);

      setCanReview(false);
      setAlreadyReviewed(true);

      loadReviews();

    } catch (error) {
      console.error(error);
      toast.error("Failed to add review.");
    }
  }

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h2>

      {canReview && (

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 mb-10"
        >

          <ReactStars
            count={5}
            value={rating}
            onChange={setRating}
            size={30}
            activeColor="#D4AF37"
          />

          <textarea
            rows="5"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full mt-6 border rounded-xl p-4"
          />

          <button
            className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:bg-[#D4AF37]"
          >
            Submit Review
          </button>

        </form>

      )}

      {alreadyReviewed && (

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">

          You've already reviewed this product.

        </div>

      )}

      {!canReview &&
        !alreadyReviewed &&
        auth.currentUser && (

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">

            Reviews are available only after your
            order has been delivered.

          </div>

        )}

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="bg-white rounded-2xl shadow p-6"
          >

            <div className="flex justify-between">

              <h3 className="font-bold">
                {review.userName}
              </h3>

              <ReactStars
                count={5}
                value={review.rating}
                edit={false}
                size={22}
                activeColor="#D4AF37"
              />

            </div>

            <p className="mt-4 text-gray-600">
              {review.comment}
            </p>

            <span className="inline-block mt-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Verified Purchase
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}