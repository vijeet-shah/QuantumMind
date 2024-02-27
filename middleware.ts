import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/explore-courses",
    "/api/webhook",
    "/api/uploadthing",
    "/terms-conditions",
    "/privacy-policy",
    "/refund-cancellation",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
