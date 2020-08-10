import { Category } from './crude/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CategoryService } from './crude/category.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit  {

  id: number;
  category: Category = new Category();
  submitted = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  flag: number = 0;


  categoryNameError: any = 0;
  categoryNameMsg: any = '';
  categoryDescriptionError: any = 0;
  categoryDescriptionMsg: any = '';


  constructor(private route: ActivatedRoute,private categoryService: CategoryService,
    private router: Router) { }

   
   

  ngOnInit() {
    this.category = new Category();
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getCategory(this.id)
      .subscribe(data => {
        console.log(data)
        this.category = data;
      }, error => console.log(error));

  }

  newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }

  setFlags(){
    this.categoryNameError = 0;
    this.categoryDescriptionError = 0;
  }

  save() {
    this.categoryService.createCategory(this.category)
      .subscribe(data => console.log(data), error => console.log(error));
    this.category = new Category();
    this.gotoList();
  }

  onSubmit() {
    if(!this.category.categoryName){
      this.categoryNameError = 1;
      this.categoryNameMsg = "Category Name cannot be empty";
      console.log("inside if");
    }
    else if(!this.category.description){
      this.categoryDescriptionError = 1;
      this.categoryDescriptionMsg = "Category Description cannot be empty";
      console.log("inside if");
    }else{
    console.log("Form submitted successfully");
    this.submitted = true;
    this.save(); 
    }   
  }

  gotoList() {
    this.router.navigate(['/category']);
  }

fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
    this.category.image = this.croppedImage;
}
imageLoaded() {
    this.flag = 1;
}
cropperReady() {
    /* cropper ready */
}
loadImageFailed() {
    /* show message */
}
 
}
