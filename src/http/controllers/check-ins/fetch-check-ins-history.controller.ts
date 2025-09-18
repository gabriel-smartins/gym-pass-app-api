import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { makeFetchUserCheckInHistory } from "@/services/factories/make-fetch-user-check-in-history";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInHistory = makeFetchUserCheckInHistory();

  const { checkIns } = await fetchUserCheckInHistory.execute({
    userId: request.user.sub,
    page,
  });

  reply.status(200).send({
    checkIns,
  });
}
