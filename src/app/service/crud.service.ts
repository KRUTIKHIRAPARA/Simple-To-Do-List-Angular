import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  storesUrl:string;
  constructor(private http:HttpClient) {
    this.storesUrl ='http://localhost:3000/todos';
   }


  getAllTask(){
    return this.http.get(this.storesUrl);
  }

  addTask(body:TodoData){
    return this.http.post(this.storesUrl,body);
  }

  editTask(task:TodoData){
    return this.http.put(`${this.storesUrl}/${task.id}`,task);
  }

  deleteTask(task:TodoData){
    return this.http.delete(this.storesUrl+'/'+task);
  }
}

export class TodoData{
  taskName:string;
  id: number;
}
