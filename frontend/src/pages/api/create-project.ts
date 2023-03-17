import type { NextApiRequest, NextApiResponse } from "next";

import randomstring from "randomstring";
import initializeFirebaseServer from "../../lib/initFirebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, goalDate, goal } = JSON.parse(req.body);
  const { db } = initializeFirebaseServer();

  const rand = randomstring.generate({
    length: 16,
    charset: "alphanumeric",
    capitalization: "lowercase",
  });

  const docRef = db.collection(`projects`).doc(rand);
  await docRef.set({
    description,
    name,
    goal,
    goalDate: new Date(goalDate),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(200).json({});
}
