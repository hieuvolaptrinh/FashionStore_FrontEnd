export interface ReviewModel {
  reviewId: number;
  content: string;
  stars: number;
  productId: number;
  userId: number;
  _links: {
    user: { href: string };
  };
}
