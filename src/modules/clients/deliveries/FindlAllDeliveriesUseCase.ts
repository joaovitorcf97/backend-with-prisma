import { prisma } from "../../../database/prismaClient";

export class FindlAllDeliveriesUseCase {
  async execute(id_cliente: string) {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_cliente,
      },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });

    return deliveries;
  }
}