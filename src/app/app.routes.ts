import { Routes } from '@angular/router';
import path from 'node:path';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AccountComponent } from './features/account/account.component';
import { HomeComponent } from './features/home/home.component';
import { AuctionListComponent } from './features/auction-list/auction-list.component';
import { AuctionComponent } from './features/auction/auction.component';
import { LotListComponent } from './features/lot-list/lot-list.component';
import { LotComponent } from './features/lot/lot.component';
import { AccountListComponent } from './features/account-list/account-list.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuctionEditComponent } from './features/auction/auction-edit/auction-edit.component';
import { LotEditComponent } from './features/lot/lot-edit/lot-edit.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'accounts',
        component: AccountListComponent,
      },
      {
        path: 'accounts/:id',
        component: AccountComponent,
      },
      {
        path: 'auctions',
        component: AuctionListComponent,
      },
      {
        path: 'auctions/:id',
        component: AuctionComponent,
      },
      {
        path: 'auctions/edit/:id',
        component: AuctionEditComponent,
      },
      {
        path: 'lots',
        component: LotListComponent,
      },
      {
        path: 'lots/:id',
        component: LotComponent,
      },
      {
        path: 'lots/edit/:id',
        component: LotEditComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
