import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
			{ path: 'findtrip', loadChildren: '../findtrip/findtrip.module#FindtripPageModule' },
			{ path: 'mytrip', loadChildren: '../mytrip/mytrip.module#MytripPageModule' },
			{ path: 'rides', loadChildren: '../rides/rides.module#RidesPageModule' },
			{ path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
			
			{
				path: 'myrequest',
				loadChildren: () => import('../myrequest/myrequest.module').then( m => m.MyrequestPageModule)
			  },
			
		]
	}	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsRoutingModule { }
  