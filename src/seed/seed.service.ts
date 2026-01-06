import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {



    constructor(
      
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http: AxiosAdapter

    ){}


  async executeSeed(){
    
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const pokemonToInsert: {name: string, no: number} [] = [];

    data.results.forEach(async ({name, url}) => {
      const segment = url.split('/');
      const no:number = +segment [ segment.length - 2 ];
      // const pokemon = await this.pokemonModel.create({name, no});
      // console.log ('[Pokemon obtenido mediante /seed]:', name, no);
      pokemonToInsert.push();
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed ejecutado con exito';
  }
}
