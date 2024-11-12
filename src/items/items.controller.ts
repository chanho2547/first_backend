import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from 'src/item.entity';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        const item = await this.itemsService.findOne(id);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        return item;
    }

    @Post()
    create(@Body('name') name: string): Promise<Item> {
        return this.itemsService.create(name);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string): Promise<Item> {
        return this.itemsService.update(id, name);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.itemsService.remove(id);
    }
}