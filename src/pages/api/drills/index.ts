import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { drillValidationSchema } from 'validationSchema/drills';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDrills();
    case 'POST':
      return createDrill();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDrills() {
    const data = await prisma.drill
      .withAuthorization({
        userId: roqUserId,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'drill'));
    return res.status(200).json(data);
  }

  async function createDrill() {
    await drillValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.drill.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
