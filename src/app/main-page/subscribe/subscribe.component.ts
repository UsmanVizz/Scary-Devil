import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { first } from 'rxjs';
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  email: FormControl
  bsModalRef?: BsModalRef;
  message: any

  constructor(private fb: FormBuilder, private apiService: ApiService, private modalService: BsModalService) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]);

  }

  ngOnInit(): void {
  }


  openModalWithComponent(msg: any, image: any): void {
    const config = {
      class: 'modal-dialog-centered', // Center the modal vertically
      initialState: {

        title: msg,
        image: image
      }
    };
    this.bsModalRef = this.modalService.show(SucessDialogboxComponent, config);
    this.bsModalRef.content.closeBtnName = 'Close';

  }

  signUp() {
    if (!this.email.valid) {
      console.log("Please enter a valid email")
      return;
    }
    else {
      const slug = new URL(`${environment.baseUrl}subscribed`);
      this.apiService.post(slug.href, { email: this.email.value }).pipe(first()).subscribe((res: any) => {
        console.log(res);
        this.openModalWithComponent(" Your Email Has Been Registered", "../../assets/images/tickN.png")
        setTimeout(() => {
          this.email.reset();
        })
      }, (err: any) => {
        let errormsg = err['error']['error'] ? err['error']['error'] : "Something went wrong"
        this.openModalWithComponent(errormsg, "/assets/images/cross.png")
      });

    }
  }
}


@Component({
  selector: 'app-dialogbox',
  templateUrl: 'sucessdialogbox.component.html',
})

export class SucessDialogboxComponent implements OnInit {

  title?: string;
  image?: string;
  closeBtnName?: string;
  list: string[] = [];
  constructor(public bsModalRef: BsModalRef) {
    this.title = this.title ? this.title : "sucess"
  }

  ngOnInit() {
    setTimeout(() => {
      this.bsModalRef.hide();
    }, 3000);
  }
}