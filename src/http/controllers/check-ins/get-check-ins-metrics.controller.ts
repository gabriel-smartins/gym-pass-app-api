import { FastifyRequest, FastifyReply } from "fastify";

import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: request.user.sub,
  });

  reply.status(200).send({
    checkInsCount,
  });
}
