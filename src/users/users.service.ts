import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  // ✅ Create a new user
  async create(createUserDto: CreateUserDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('this email is already taken');
    }
    user = await this.prisma.user.findUnique({
      where: {
        mobile: createUserDto.mobile,
      },
    });
    if (user) {
      throw new BadRequestException('this number is already taken');
    }
    createUserDto.password = await hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // ✅ Get all users
  async findAll() {
    return this.prisma.user.findMany();
  }

  // ✅ Get a single user by ID
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // ✅ Update user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Ensure user exists
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // ✅ Delete a user by ID
  async remove(id: number) {
    await this.findOne(id); // Ensure user exists before deleting
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
