import { Component } from '@angular/core';
import { TodoData, CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent {
  
  taskCollect : Array<TodoData> = new Array<TodoData>();
  
  task!:TodoData;

  addToggle:boolean=true;

  constructor(private data:CrudService, private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.task = new TodoData;
    this.getData();
  }

  addData(){
    if(this.task.taskName)
    {
      this.data.addTask(this.task).subscribe({
        next:(res)=>{
          console.log(res);
          this.getData();
          this.task = new TodoData;
          this.addToggle = true;
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log('SuccessFully Add Data');
        }
      })
    }
   
  }

  getData(){
     this.data.getAllTask().subscribe({
      next:(res:any)=>{
        this.taskCollect = res;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log('SuccessFully Data Get');
      }
    });
  }


  deleteData(data:any){
    this.data.deleteTask(data.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getData();
        this.task = new TodoData;
        this.addToggle = true;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log('SuccessFully Delete Data');
      }
    });
  }

  fillData(data:TodoData){
    this.task = data;
    this.addToggle = false;
  }

  editData(){
    if(this.task.taskName)
    {
      this.data.editTask(this.task).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.task = new TodoData;
          this.addToggle = true;
        },
        error:(err)=>{
          console.log(err);
        },
      });
    }
    else
    {
      this.toastr.success('Hello world!', 'Toastr fun!');
    }
    }

}     
