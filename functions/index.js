const { setGlobalOptions } = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

// Limit to 10 concurrent instances (safe default)
setGlobalOptions({ maxInstances: 10 });

// Initialize Firebase Admin SDK
initializeApp();

// Callable function to set a user's role (admin-only)
exports.setUserRole = onCall(async (request) => {
  const { uid, role } = request.data;
  const requester = request.auth;

  if (!requester || requester.token.role !== "admin") {
    throw new HttpsError("Permission denied: only admins can assign roles.");
  }

  const validRoles = ["admin", "organizer", "viewer"];
  if (!validRoles.includes(role)) {
    throw new HttpsError(`Invalid role: ${role}`);
  }

  await getAuth().setCustomUserClaims(uid, { role });
  return { message: `Role '${role}' successfully set for user ${uid}.` };
});
