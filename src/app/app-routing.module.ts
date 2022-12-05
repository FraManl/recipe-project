import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // integrating lazy loading : only load this child when a user access this path, otherwise, need to put this path into recipes-routing.module like before
  // code split at that point, code then parsed and downloaded on-demand, separate bundle
  {
    path: 'recipes',
    // loadChildren: './recipes/recipes.module#RecipesModule',
    // extract module from promise (new modern syntax)
    // lazy loading
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppinglistModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

// NgModule will transform a normal typescript class into an angular module
// preloading strategy to pre-load lazy loaded modules
// lazy loading is to allow a fast initial load; then when we navigate, neighbouring modules are preloaded (best of 2 worlds)
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
