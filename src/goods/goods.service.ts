import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { Good } from './entities/good.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
  ) {}

  findAll(): Promise<Good[]> {
    return this.goodsRepository.find();
  }

  async findOne(id: number): Promise<Good> {
    return this.goodsRepository.findOneBy({ id });
  }

  async create(good: CreateGoodDto) {
    const newGood = await this.goodsRepository.create(good);
    await this.goodsRepository.save(newGood);
    return newGood;
  }

  async update(id: number, good: UpdateGoodDto) {
    await this.goodsRepository.update(id, good);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updatedPost = await this.goodsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Good not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deleteResponse = await this.goodsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Good not found', HttpStatus.NOT_FOUND);
    }
  }
}
