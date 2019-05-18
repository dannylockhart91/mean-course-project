import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {Store} from "@ngrx/store";

import * as fromAuth from '../../auth/store/auth.reducer'
import {SignUpRequest} from "../store/auth.actions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private store: Store<fromAuth.AuthState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
      this.store.dispatch(new SignUpRequest({email: form.value.email, password: form.value.password}));
      this.router.navigate(['../'], {relativeTo: this.route})
          .then(null);
  }
}
