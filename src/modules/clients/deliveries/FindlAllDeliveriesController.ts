import { Request, Response } from "express";
import { FindlAllDeliveriesUseCase } from "./FindlAllDeliveriesUseCase";

export class FindlAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_client } = request;

    const findAllDeliveriesUseCase = new FindlAllDeliveriesUseCase();

    const deliveries = await findAllDeliveriesUseCase.execute(id_client);

    return response.json(deliveries);
  }
}