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
          this.getData();
          this.task = new TodoData;
          this.addToggle = true;
          this.toastr.success('Success..', 'Successfuly Added Data..');
        },
        error:(err)=>{
          this.toastr.error('Error!', ''+err);
        },
        complete:()=>{}
      })
    }
    else{
      this.toastr.warning('Warning!', 'Please Enter Your Task!!');
    }
   
  }

  getData(){
     this.data.getAllTask().subscribe({
      next:(res:any)=>{
        this.taskCollect = res;
      },
      error:(err)=>{
        this.toastr.error('Error!', ''+err);
      },
      complete:()=>{}
    });
  }


  deleteData(data:any){
    this.data.deleteTask(data.id).subscribe({
      next:(res:any)=>{
        this.getData();
        this.task = new TodoData;
        this.addToggle = true;
      },
      error:(err)=>{
        this.toastr.error('Error!', ''+err);
      },
      complete:()=>{}
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
          this.task = new TodoData;
          this.addToggle = true;
        },
        error:(err)=>{
          this.toastr.error('Error!', ''+err);
        },
        complete:()=>{}
      });
    }
    else
    {
      this.toastr.warning('Warning!', 'Please You can Add Anything Task Data! Otherwise You can not update emty task....');
    }
    }

    cancleData(){
      this.task = new TodoData;
      this.getData();
      this.addToggle = true;
    }
}     
