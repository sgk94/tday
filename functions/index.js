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

  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in.");
  }

  const validRoles = ["admin", "organizer", "competitor"];

  if (!validRoles.includes(role)) {
    throw new HttpsError("invalid-argument", `Invalid role: ${role}`);
  }

  const targetUid = uid || request.auth.uid; // fall back to caller
  const selfEdit = targetUid === request.auth.uid;
  const isAdmin = request.auth.token.role === "admin";

  if (selfEdit) {
    if (role === "admin") {
      throw new HttpsError(
        "permission-denied",
        "You can’t grant yourself admin."
      );
    }
    // Organizer / competitor are fine → continue
  } else {
    // Editing someone else
    if (!isAdmin) {
      throw new HttpsError(
        "permission-denied",
        "Only admins can edit other users."
      );
    }
  }

  await getAuth().setCustomUserClaims(targetUid, { role });
  return { message: `Role '${role}' successfully set for user ${targetUid}.` };
});
