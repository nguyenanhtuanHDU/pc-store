import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  @ViewChild("input") input!: ElementRef;

  constructor(
    private mainService: MainService,
    private authService: AuthService,
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
  });
  destroy = new Subject()

  onSubmit() {
    if (this.form.valid) {
      this.mainService.auth.login(this.form.value).pipe(
        takeUntil(this.destroy),
        catchError((err) => {
          this.toastr.error(err?.error?.message ?? 'Login error');
          return of(null);
        })
      ).subscribe(
        (res) => {
          if (res) {
            this.authService.setAccessToken(res.data.accessToken)
            this.toastr.success(res.message ?? 'Login success');
            this.router.navigate(['/'])
          }
        }
      );
    } else {
      this.toastr.error('Form invalid')
    }
  }
}
