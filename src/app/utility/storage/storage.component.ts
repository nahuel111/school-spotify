import { Component, OnInit } from '@angular/core';
import {  openDB, deleteDB, wrap, unwrap } from 'idb';
@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})

export class StorageComponent implements OnInit {

  dbName:string ='spotify-store';
  version:number = 1;
  dbPromise:any;

  constructor() {}

  ngOnInit() {}

  /**
   * Genera y abre una tabla disponible para almacenar registros.
   * @param tableName Representa el nombre de una tabla. 
   */
  async openConnection(tableName:string){
    this.dbPromise = openDB(this.dbName, this.version, {
      upgrade(db) {
        db.createObjectStore(tableName);
      },
    });
  }

  /**
   * Agrega un registro en una tabla determinada.
   * @param tableName Representa el nombre de una tabla.
   * @param key Representa el identificador único de la tabla.
   * @param metadata Representa el valor o valores de un registro.
   */
  async add(tableName:string, key:string, metadata:any[] ){ 
    return (await this.dbPromise).put(tableName, metadata, key);
  }

  /**
   * Elimina un registro de una tabla.
   * @param tableName Representa el nombre de una tabla.
   * @param key Representa el identificador único de la tabla.
   */
  async delete(tableName:string, key:string){
    return (await this.dbPromise).delete(tableName, key);
  }

  /**
   * Limpia una tabla.
   * @param tableName Representa el nombre de una tabla.
   */
  async clear(tableName:string) {
    return (await this.dbPromise).clear(tableName);
  }

  /**
   * Obtiene un registro por id.
   * @param key Representa el identificador único de la tabla.
   */
  async keys(key:string): Promise<any> {
    return (await this.dbPromise).getAllKeys(key);
  }

  /**
   * Obtiene un listado de registro de una tabla.
   * @param tableName Representa el identificador único de la tabla.
   */
  async getAll(tableName:string): Promise<any> {
    return (await this.dbPromise).transaction(tableName).objectStore(tableName).getAll();
  }

}

