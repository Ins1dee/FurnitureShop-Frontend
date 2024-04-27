import { Routes } from '@angular/router';
import { SignInComponent } from './features/components/sign-in/sign-in.component';
import { HomeComponent } from './features/components/home/home.component';
import { RegisterComponent } from './features/components/register/register.component';
import { ForbiddenComponent } from './features/components/forbidden/forbidden.component';
import { adminGuard } from './core/guards/admin.guard';
import { UnauthorizedComponent } from './features/components/unauthorized/unauthorized.component';
import { AdminComponent } from './features/components/admin/admin.component';
import { authGuard } from './core/guards/auth.guard';
import { DeliveriesTableComponent } from './features/components/deliveries/deliveries-table/deliveries-table.component';
import { DeliveryComponent } from './features/components/deliveries/delivery/delivery.component';
import { OrdersComponent } from './features/components/orders/orders.component';
import { sellerGuard } from './core/guards/seller.guard';
import { CreateOrderComponent } from './features/components/create-order/create-order.component';
import { StatisticComponent } from './features/components/statistic/statistic.component';

export const routes: Routes = [
    {path: 'login', component:SignInComponent},
    {path: '', component:HomeComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'forbidden', component:ForbiddenComponent},
    {path: 'unauthorized', component:UnauthorizedComponent},
    {path: 'products', component:AdminComponent, canActivate: [authGuard]}, 
    {path: 'deliveries', component:DeliveryComponent, canActivate: [authGuard]},
    {path: 'orders', component:OrdersComponent, canActivate: [authGuard]},
    {path: 'create-order', component: CreateOrderComponent, canActivate: [sellerGuard]},
    {path: 'statistic', component:StatisticComponent, canActivate: [authGuard]},
];
