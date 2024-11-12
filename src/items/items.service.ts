import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
    ) { }

    findAll(): Promise<Item[]> {
        return this.itemsRepository.find();
    }

    findOne(id: number): Promise<Item> {
        return this.itemsRepository.findOneBy({ id });
    }

    create(name: string): Promise<Item> {
        const newItem = this.itemsRepository.create({ name });
        return this.itemsRepository.save(newItem);
    }

    async update(id: number, name: string): Promise<Item> {
        const item = await this.findOne(id);
        item.name = name;
        return this.itemsRepository.save(item);
    }

    async remove(id: number): Promise<void> {
        await this.itemsRepository.delete(id);
    }


}
