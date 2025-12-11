import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Volvemos esta clase un esquema
@Schema()
export class Pokemon extends Document{ // Aqui extendemos documento de mongoose para utilizar sus funciones


    // Tambien tenemos un id pero eso nos los da mongo

    // Le agregamos las propiedades al atributo name
    @Prop({
        unique: true,
        index:true
    })
    name:string;

    // Igual al number
    @Prop({
        unique: true,
        index:true
    })
    no:number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
