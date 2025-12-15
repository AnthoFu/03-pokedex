import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {


  constructor(
    
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
    

  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase(); // para poner en minusculas el nombre obtenido
    
    
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
    return pokemon;
  } catch(error){
    if (error.code === 11000){
      throw new BadRequestException(`Este pokemon ya existe en la base de datos ${JSON.stringify( error.keyValue )}`);
    }
    console.log(error);
    throw new InternalServerErrorException('Ha ocurrido un error interno, por favor comuniquese con el equipo de soporte')
  }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;

    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    // MongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    // Name
    if ( !pokemon && term ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }


    if ( !pokemon ) 
      throw new NotFoundException(`El Pokemon con el id, nombre o no "${ term }" no fue encontrado.`);
    

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
