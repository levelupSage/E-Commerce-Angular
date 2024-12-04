import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  productForm: FormGroup;
  listOfCategories: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminServe: AdminService
  ) { }

  onFileSelected(event: any) {
    debugger
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.adminServe.getAllCategory().subscribe(res => {
      this.listOfCategories = res;
    })
  }

  addProduct(): void {
    if (this.productForm.valid) {
        const formData : FormData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('name', this.productForm.get('name').value);
        formData.append('price', this.productForm.get('price').value);
        formData.append('description', this.productForm.get('description').value);
      
        this.adminServe.addProduct(formData).subscribe((res) =>{
          if(res.id != null){
            this.snackBar.open('Product Posted Sucessfully !!', 'Close', {
              duration: 5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          }else{
            this.snackBar.open(res.message, 'ERROR', {
              duration: 5000
            });
          }
        })
      } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
