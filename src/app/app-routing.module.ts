import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

// NgModule will transform a normal typescript class into an angular module
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
