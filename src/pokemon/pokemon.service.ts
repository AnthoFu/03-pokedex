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
    this.handleExceptions(error)
  }
}

  async findAll() {
    return await this.pokemonModel.find();
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term); 
    if (updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    await pokemon.updateOne( updatePokemonDto, { new: true } )
    
    return {...pokemon.toJSON(), ...updatePokemonDto};
    }
    catch (error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return id;

    // const result = this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
    if (deletedCount === 0){
      throw new BadRequestException(`El pokemon con el id "${id}" no fue encontrado.`)
    }

    const exitMsg = `El pokemon con el id "${id}" fue eliminado con exito.`
  return exitMsg;
  }


  // Metodo para el manejo de errores, colocado aca para evitar repetir la logica en cada metodo
  private handleExceptions(error: any){
    if (error.code === 11000){
      throw new BadRequestException(`Este pokemon ya existe en la base de datos ${JSON.stringify( error.keyValue )}`);
    }
    console.log(error);
    throw new InternalServerErrorException('Ha ocurrido un error interno, por favor comuniquese con el equipo de soporte')
  }
}
