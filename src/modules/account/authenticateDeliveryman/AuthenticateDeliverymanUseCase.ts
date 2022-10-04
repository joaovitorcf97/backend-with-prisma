import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Receber username, password
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      }
    });

    if (!deliveryman) {
      throw new Error('Username or password invalid!');
    }

    // Verificar se userma cadastrado
    const passwordMatch = await compare(password, deliveryman.password);

    // Verificar se senha corresponde ao username
    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    // Gerar o token
    const token = sign(
      { username },
      'd3aa349c8d932ea71f11aa096ba29f62',
      { subject: deliveryman.id, expiresIn: '1d' },
    );

    return token;
  }
}