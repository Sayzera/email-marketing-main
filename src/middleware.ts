
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/images(.*)',
  '/', '/auth(.*)',
   '/portal(.*)',
  '/chatbot'
  ]);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
]);


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  if (!isPublicRoute(req)) {
    auth().protect();
  }
});


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],

};