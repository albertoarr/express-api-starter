import { UtilsService } from '@/shared/utils.service';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { hash } from 'bcrypt';

export class UserService {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly utilsService: UtilsService
    ) {}

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        return await this.utilsService.mapToDto(user, UserDTO)
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } })
    }

    async create(dto: CreateUserDTO) {
        const emailExists = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });

        if (emailExists) return null;

        const passwordHash = await hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
              ...dto,
              password: passwordHash
            }
          });

        return await this.utilsService.mapToDto(user, UserDTO);
    }
};
