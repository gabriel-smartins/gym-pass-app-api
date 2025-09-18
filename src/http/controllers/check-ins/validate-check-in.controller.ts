import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({
    checkInId,
  });

  reply.status(204).send();
}
