import type { NextApiRequest, NextApiResponse } from "next";

/* eslint-disable require-jsdoc */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const path = req.body.path;
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    // Return the error as well
    return res.status(500).json({ error: err });
  }
}
