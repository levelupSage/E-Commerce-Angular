import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFAQComponent {

  productId: number = this.activatedRoute.snapshot.params["productId"];
  FAQForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminservice: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    })
  }

  postFAQ(){
    this.adminservice.postFAQ(this.productId, this.FAQForm.value).subscribe(res => {
      if(res.id != null){
        this.snackBar.open("FAQ Posted Successfully!", "Close", {
          duration: 5000
        });
        this.router.navigateByUrl('/admin/dashboard');
      }else{
        this.snackBar.open("Something went wrong", "Close", {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }
}
