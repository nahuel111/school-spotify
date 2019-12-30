import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rename'
})
export class RenamePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    
    let name;
    
    switch(value) { 
      case "artist": { 
        name = "Artista";
         break; 
      } 
      case "track": { 
        name = "Cancion";
         break; 
      } 
      default: { 
        name = "--";
         break; 
      } 
   } 
    return name;
  }

}
