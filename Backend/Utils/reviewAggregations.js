export const addReviewStatsPipeline = () => ([
  {
    $lookup: {
      from: "ratings",
      localField: "_id",
      foreignField: "product",
      as: "reviews"
    }
  },
  {
    $addFields: {
      avgRating: {
        $cond: [
          { $gt: [{ $size: "$reviews" }, 0] },
          { $round: [{ $avg: "$reviews.rating" }, 1] },
          0
        ]
      },
      totalReviews: { $size: "$reviews" }
    }
  },
  { $project: { reviews: 0 } }
]);
