import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { adminMailBody, thanksMailBody } from "./lib/mailBody";

admin.initializeApp();
const db = admin.firestore();

export const sendMail = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    const { name, email, content } = data;
    if (!email) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "email is required"
      );
    }

    const adminMailData = {
      to: functions.config().mail.admin_address,
      message: {
        subject: "ホームページお問い合わせ",
        text: adminMailBody({ name, email, content }),
      },
    };

    const thanksMailData = {
      to: email,
      message: {
        subject: "お問い合わせありがとうございます",
        text: thanksMailBody({ name, email, content }),
      },
    };

    await db.collection("mail").add(adminMailData);
    await db.collection("mail").add(thanksMailData);
  });
