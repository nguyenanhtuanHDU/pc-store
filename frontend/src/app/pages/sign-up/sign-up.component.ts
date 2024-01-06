import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild("input") input!: ElementRef;

  constructor(
    private mainService: MainService,
    private toastr: ToastrService,
    private router: Router
  ) {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 300);
  }
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  destroy = new Subject()

  ngOnInit(): void {
    this.mainService.users.getAll().subscribe(res => {

    })
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.createUser()
    }
  }

  createUser() {
    const { confirmPassword, ...data } = this.form.value
    console.log("🚀 ~ data:", data)
    this.mainService.users.create(data).pipe(
      takeUntil(this.destroy),
      catchError((err) => {
        this.toastr.error(err?.error?.message ?? 'Create error');
        return of(null);
      })
    ).subscribe(
      (res) => {
        if (res) {
          this.toastr.success(res.message ?? 'Create success');
          this.router.navigate(['/sign-in'])
        }
      }
    )
  }

  isFormValid() {
    const password = this.form.value.password
    const confirmPassword = this.form.value.confirmPassword
    if (this.form.valid && password === confirmPassword) {
      return true
    } else if (password !== confirmPassword) {
      this.toastr.error("Password not the same")
      return false
    } else {
      this.toastr.error('Form invalid')
      return false
    }
  }
}
