import {Component, provide, Injector} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, APP_BASE_HREF, Router } from "angular2/router";
import {Store} from "../services/store";
import {AuthProvider} from "../services/auth";
import {NotificationsProvider} from "../services/notification";
import {Transport} from "../services/transport";
import {SignInView} from "../components/signIn";
import {ContactsView} from "./contacts";
import {HomeView} from "./home";

@Component({
  selector: "sms-app",
  template: "<router-outlet></router-outlet>",
  directives: [ROUTER_DIRECTIVES],
  providers: [Store, AuthProvider, provide(Transport, {useValue: new Transport() /*singleton*/}), ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : "/"}), NotificationsProvider]
})
@RouteConfig([
  { path: "/", as: "Home", component: HomeView},
  { path: "/signin",  as: "SignIn",  component: SignInView },
  { path: "/contacts",  as: "Contacts",  component: ContactsView }
])
export class SmsApp {
  constructor(private authProvider: AuthProvider) {
    AuthProvider.appInstance = authProvider; // it will be used to check if user is authentificated by another components
  }
}
