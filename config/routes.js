/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "GET /": "/generic",

  "GET /admin/dashboard": "admin/dashboard",
  "GET /admin/users": "admin/users",
  "PATCH /admin/users/:id/status": "admin/status",
  "PATCH /admin/users/:id/role": "admin/role",
  "PATCH /admin/users/:id/verify": "admin/verify",

  "POST /auth/signup": "auth/signup",
  "POST /auth/signin": "auth/signin",
  "POST /auth/refresh": "auth/refresh-token",
  "POST /auth/forgot_password": "auth/forgot-password",
  "POST /auth/reset_password": "auth/reset-password",
  "POST /auth/resend": "auth/resend-link",
  "GET /auth/verify_email": "auth/verify-email",
  "GET /pricing": "auth/pricing",

  "GET /user/signout": "user/signout",
  "GET /user/profile": "user/profile",
  "PATCH /user/update": "user/update",

  "POST /qualifications": "qualification/create",
  "GET /qualifications": "qualification/fetch",
  "GET /qualifications/:id": "qualification/read",
  "PATCH /qualifications/:id": "qualification/update",
  "DELETE /qualifications/:id": "qualification/delete",

  "POST /logbooks": "logbook/create",
  "GET /logbooks": "logbook/fetch",
  "GET /logbooks/:id": "logbook/read",
  "PATCH /logbooks/:id": "logbook/update",
  "DELETE /logbooks/:id": "logbook/delete",

  "POST /courses": "course/create",
  "GET /courses": "course/fetch",
  "GET /courses/:id": "course/read",
  "PATCH /courses/:id": "course/update",
  "DELETE /courses/:id": "course/delete",

  "POST /qualities": "quality/create",
  "GET /qualities": "quality/fetch",
  "GET /qualities/:id": "quality/read",
  "PATCH /qualities/:id": "quality/update",
  "DELETE /qualities/:id": "quality/delete",

  "POST /leaderships": "leadership/create",
  "PATCH /leaderships/:id": "leadership/update",
  "GET /leaderships": "leadership/fetch",
  "DELETE /leaderships/:id": "leadership/delete",
  "GET /leaderships/:id": "leadership/read",

  "POST /teaching": "teaching/create",
  "PATCH /teaching/:id": "teaching/update",
  "GET /teaching": "teaching/fetch",
  "DELETE /teaching/:id": "teaching/delete",
  "GET /teaching/:id": "teaching/read",

  "POST /research": "research/create",
  "PATCH /research/:id": "research/update",
  "GET /research": "research/fetch",
  "DELETE /research/:id": "research/delete",
  "GET /research/:id": "research/read",

  "POST /feedbacks/:id": "feedback/create",
  "GET /feedbacks/:id": "feedback/fetch",
  "POST /feedbacks/submit/:id": "feedback/submit",

  "POST /messages/send": "message/send",
  "GET /messages/": "message/fetch",
  "GET /messages/:id": "message/read",
  "DELETE /messages/:id": "message/delete",

  "POST /plans": "plans/create",
  "GET /plans": "plans/fetch",
  "GET /plans/:id": "plans/read",
  "PATCH /plans/:id": "plans/update",
  "DELETE /plans/:id": "plans/delete",

  "POST /api/paystack": "payment/paystack",
  "GET /api/paystack/callback": "payment/paystack-callback",
};
