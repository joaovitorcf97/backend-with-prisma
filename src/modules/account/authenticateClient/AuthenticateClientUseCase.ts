import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Receber username, password
    const client = await prisma.clients.findFirst({
      where: {
        username,
      }
    });

    if (!client) {
      throw new Error('Username or password invalid!');
    }

    // Verificar se userma cadastrado
    const passwordMatch = await compare(password, client.password);

    // Verificar se senha corresponde ao username
    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    // Gerar o token
    const token = sign(
      { username },
      'd3aa349c8d932ea71f11aa096ba29f61',
      { subject: client.id, expiresIn: '1d' },
    );

    return token;
  }
}