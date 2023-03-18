import type { NextApiRequest, NextApiResponse } from "next";

import initializeFirebaseServer from "../../lib/initFirebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, goalDate, goal, projectCounter } = JSON.parse(
    req.body
  );
  const { db } = initializeFirebaseServer();

  const docRef = db.collection(`projects`).doc(projectCounter.toString());
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
