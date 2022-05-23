import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

//import { SocialAuthService } from "angularx-social-login";
//import { SocialUser } from "angularx-social-login";

import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //public user: SocialUser = new SocialUser;
  // loggedIn: any;

  constructor(
    //private authService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit() {
	this.loginGoogle();
  }
  
loginGoogle(){
     // @ts-ignore
	window.onGoogleLibraryLoad = () => {
	  console.log('Google\'s One-tap sign in script loaded!');

	  // @ts-ignore
	  google.accounts.id.initialize({
		// Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
		client_id: '505917046438-78qvvvbli3p36l033fl1qmc1k2948jqc.apps.googleusercontent.com',
		callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
		auto_select: true,
		cancel_on_tap_outside: false,
		//context: "use",
	  });
	  
	  const input = document.getElementById("buttonDiv");
	  const btn: HTMLElement = input!;
	  
	  // @ts-ignore
	  google.accounts.id.renderButton(
            btn,
            { theme: "outline", size: "large" }  // customization attributes
          );

	  // @ts-ignore
	  //google.accounts.id.prompt();
	  
	};
}	


handleCredentialResponse(response: CredentialResponse) {
// Decoding  JWT token...
  let decodedToken: any | null = null;
  try {
    decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
  } catch (e) {
    console.error('Error while trying to decode token', e);
  }
  console.log('decodedToken', decodedToken);
}

   signInWithGoogle(): void {
     //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
   }
  // signOut(): void {
  //   this.authService.signOut();
  // }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }
}
