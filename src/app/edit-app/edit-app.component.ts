import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppItemModule } from '../app-item/app-item.module';
import { MyappsercviceService } from '../services/myappsercvice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent {
//@ts-ignore
appform: FormGroup;
id:any
app!: AppItemModule;
constructor (
   private service : MyappsercviceService,
   private  formBuilder : FormBuilder,
   private router : Router ,
   
   ){
}
ngOnInit(): void {
   
    this.createappForm();
    this.loaddetails();

}
createappForm(){

  this.appform = this.formBuilder.group({
    'name':['',Validators.compose([Validators.required, Validators.minLength(3) , Validators.maxLength(50)])],
    'description':['',Validators.compose([Validators.required,Validators.minLength(3) , Validators.maxLength(500)])],
    'image':['',Validators.compose([Validators.required,Validators.minLength(1) , Validators.maxLength(1000)])]
  });
}
backtohome(){
  this.router.navigate([''])
}
loaddetails(){
  this.app=this.service.obj
  this.appform.controls['name'].setValue(this.app.app_name);
  this.appform.controls['description'].setValue(this.app.app_desc);
  this.appform.controls['image'].setValue(this.app.app_image);
 
}
update(values : any){
  let updatedata = new FormData();
  updatedata.append('id',this.service.obj.idapplication)
  updatedata.append('name',values.name)
  updatedata.append('desc',values.description)
  updatedata.append('image',values.image)
  console.log(updatedata)
  this.service.update(updatedata).subscribe( res =>{
    
  })
  this.router.navigate([''])
}
}


