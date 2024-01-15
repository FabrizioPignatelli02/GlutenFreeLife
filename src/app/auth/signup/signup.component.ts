import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  register() {
    try {
      this.authSrv.register(this.registerForm.value).subscribe();
    } catch (error: any) {
      if (error) {
        this.router.navigate(['/signup']);
      }
    }
  }
}
