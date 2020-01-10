export class Playlist {

     public:boolean = false;
     _description:string = '';
     _type:string = '';
     private _tracks:string[] = [];

    constructor (private _id: string, private _name: string) {
 
        if(!name) {
            // lanzar un error
            // agregar validador de campos en una clase aparte
        }

        if(!_id) {
            // lanzar un error
            // agregar validador de campos en una clase aparte
        }

       this._id = _id;
       this._name = _name;
    }
    
    // public _id() : string{
    //     console.log("id.");
    //     return this.id = id;;
    // }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get description() {
        return this._description;
    }

    get tracks(){
        return this._tracks;
    }

    get type(){
        return this._type;
    }

    public addTracks(track:string){
     
        if(!track){
        // lanzar un error
        console.log("error this.tracks");
        return;
        }

         if(this.tracks && this.tracks.find(x => x == track)){
         // lanzar un error
         console.log("error this.tracks");
         return;
         }

         this.tracks.push(track);

    }

}