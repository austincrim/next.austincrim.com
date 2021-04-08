import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.body;
  const hits = await prisma.post.update({
    where: {
      slug: slug
    },
    select: {
      hits: true
    },
    data: {
      hits: {
        increment: 1
      }
    }
  });

  return res.send(hits);
}
