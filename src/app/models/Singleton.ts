export class Singleton {

    private static Instance : Singleton;
    private _name:string;

    constructor() {
        this._name = '';
    }

    public static getInstance():Singleton {

       if (!Singleton.Instance) {
           Singleton.Instance = new Singleton();
       }

       return Singleton.Instance;
    }

    get name(){
        return this._name;
    }

    set name(name:string){
      this._name = name;
    }

}