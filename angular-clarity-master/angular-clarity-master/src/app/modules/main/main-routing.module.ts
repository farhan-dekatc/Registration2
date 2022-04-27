import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// import { AuthGuardService } from './../../services/auth-guard.service';
import {MainPageComponent} from './main-page/main-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AboutComponent} from './about/about.component';
import {LayoutComponent} from './layout/layout.component';
import {UserComponent} from './user/user.component';
import {PreferenceComponent} from './preference/preference.component';
import {CollegeComponent} from './college/college.component';
import {ProductComponent} from './product/product.component';
import {AllproductComponent} from './product/allproduct/allproduct.component';
import {AddproductComponent} from './product/addproduct/addproduct.component';
import {EditproductComponent} from './product/editproduct/editproduct.component';
import {StepperComponent} from './stepper/stepper.component';
import {Product1Component} from './product1/product1.component';
import {UniversityComponent} from './university/university.component';
import {Product2Component} from './product2/product2.component';
import {Allproduct2Component} from './product2/allproduct2/allproduct2.component';
import {Addproduct2Component} from './product2/addproduct2/addproduct2.component';
import {Editproduct2Component} from './product2/editproduct2/editproduct2.component';
import {University1Component} from './university1/university1.component';
import {Alluniversity1Component} from './university1/alluniversity1/alluniversity1.component';
import {Adduniversity1Component} from './university1/adduniversity1/adduniversity1.component';
import {Edituniversity1Component} from './university1/edituniversity1/edituniversity1.component';
import {WorkflowComponent} from './workflow/workflow.component';
import {PlayComponent} from './play/play.component';
import {AllPlayComponent} from './play/all-play/all-play.component';
import {AddPlayComponent} from './play/add-play/add-play.component';
import {EditplayComponent} from './play/editplay/editplay.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {SocialLoginComponent} from './social-login/social-login.component';
import {SignupComponent} from './signup/signup.component';
import {SelfregistrationComponent} from './selfregistration/selfregistration.component';
import {AccountSetupComponent} from './account-setup/account-setup.component';
import {AboutWorkComponent} from './about-work/about-work.component';
import {Comp4Component} from './comp4/comp4.component';
import {Comp2Component} from './comp2/comp2.component';
import {Comp3Component} from './comp3/comp3.component';
import {Page11Component} from './page11/page11.component';
import {ProjectSetupComponent} from './project-setup/project-setup.component';
import {AllprojectsetupComponent} from './project-setup/allprojectsetup/allprojectsetup.component';
import {AddprojectsetupComponent} from './project-setup/addprojectsetup/addprojectsetup.component';
import {ReadonlyprojectsetupComponent} from './project-setup/readonlyprojectsetup/readonlyprojectsetup.component';
import {EditprojectsetupComponent} from './project-setup/editprojectsetup/editprojectsetup.component';
import {ModuleSetupComponent} from './module-setup/module-setup.component';
import {AllmoduleSetupComponent} from './module-setup/allmodule-setup/allmodule-setup.component';
import {AddmoduleSetupComponent} from './module-setup/addmodule-setup/addmodule-setup.component';
import {EditmoduleSetupComponent} from './module-setup/editmodule-setup/editmodule-setup.component';
import {ActionsComponent} from './wireframe/actions/actions.component';
import {WireframeComponent} from './wireframe/wireframe.component';
import {AllwireframeComponent} from './wireframe/allwireframe/allwireframe.component';
import {AddwireframeComponent} from './wireframe/addwireframe/addwireframe.component';
import {WireframetypeComponent} from './wireframe/wireframetype/wireframetype.component';
import {EditwireframeComponent} from './wireframe/editwireframe/editwireframe.component';
import {ReportBuilderComponent} from './report-builder/report-builder.component';
import {AllreportBuilderComponent} from './report-builder/allreport-builder/allreport-builder.component';
import {AddreportBuilderComponent} from './report-builder/addreport-builder/addreport-builder.component';
import {BiWidgetsComponent} from './bi-widgets/bi-widgets.component';
import {AllWidgetsComponent} from './bi-widgets/all-widgets/all-widgets.component';
import {AddWidgetsComponent} from './bi-widgets/add-widgets/add-widgets.component';
import {PropertiesComponent} from './wireframe/properties/properties.component';
import {SelectBiComponent} from './bi-widgets/select-bi/select-bi.component';
import {ErrorPageComponent} from "../../error-page/error-page.component";
import {TestComponent} from "../../test/test.component";
import {OauthmidComponent} from "../login/oauthmid/oauthmid.component";


const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    // canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'user', pathMatch: 'full'},
      {path: 'main', component: MainPageComponent},
      {path: 'user', component: UserComponent},
      {path: 'college', component: CollegeComponent},
      {path: 'product1', component: Product1Component},
      {path: 'university', component: UniversityComponent},
      {path: 'stepper', component: StepperComponent},
      {path: 'workflow', component: WorkflowComponent},

      {
        path: 'play', component: PlayComponent,
        children: [
          {path: '', redirectTo: 'all', pathMatch: 'full'},
          {path: 'all', component: AllPlayComponent},
          {path: 'add', component: AddPlayComponent},
          {path: 'edit/:id', component: EditplayComponent},
        ]
      },
      {
        path: 'product', component: ProductComponent,
        children: [
          {path: '', redirectTo: 'all', pathMatch: 'full'},
          {path: 'all', component: AllproductComponent},
          {path: 'add', component: AddproductComponent},
          {path: 'edit/:id', component: EditproductComponent},
        ]
      },
      {
        path: 'product2', component: Product2Component,
        children: [
          {path: '', redirectTo: 'all', pathMatch: 'full'},
          {path: 'all', component: Allproduct2Component},
          {path: 'add', component: Addproduct2Component},
          {path: 'edit/:id', component: Editproduct2Component},
        ]
      },
      {
        path: 'university1', component: University1Component,
        children: [
          {path: '', redirectTo: 'all', pathMatch: 'full'},
          {path: 'all', component: Alluniversity1Component},
          {path: 'add', component: Adduniversity1Component},
          {path: 'edit/:id', component: Edituniversity1Component},
        ]
      },

      {path: 'preference', component: PreferenceComponent},
      {path: 'about', component: AboutComponent},
      //project-setup
      {
        path: 'project', component: ProjectSetupComponent,
        children: [
          {path: '', redirectTo: 'all', pathMatch: 'full'},
          {path: 'all', component: AllprojectsetupComponent},
          {path: 'add', component: AddprojectsetupComponent},
          {path: 'edit/:id', component: EditprojectsetupComponent},
          {path: 'readonly/:id', component: ReadonlyprojectsetupComponent},

          {
            path: 'modules', component: ModuleSetupComponent,
            children: [
              {path: '', redirectTo: 'all', pathMatch: 'full'},
              {path: 'all', component: AllmoduleSetupComponent},
              {path: 'add', component: AddmoduleSetupComponent},
              {path: 'edit/:id', component: EditmoduleSetupComponent},

              {path: 'actions', component: ActionsComponent},
              {path: 'bi-build', component: SelectBiComponent},
              // wireframe start
              {
                path: 'wireframe', component: WireframeComponent,
                children: [
                  {path: '', redirectTo: 'all', pathMatch: 'full'},
                  {path: 'all', component: AllwireframeComponent},
                  {path: 'add', component: AddwireframeComponent},
                  {path: 'types', component: WireframetypeComponent},

                  {path: 'edit/:id', component: EditwireframeComponent},
                  {path: 'edit/:id/properties', component: PropertiesComponent}
                ]
              },
              //report builder
              {
                path: 'report-builder', component: ReportBuilderComponent,
                children: [
                  {path: '', redirectTo: 'all', pathMatch: 'full'},
                  {path: 'all', component: AllreportBuilderComponent},
                  {path: 'add', component: AddreportBuilderComponent},

                ]
              },// wireframe end
              {
                path: 'bi-widgets', component: BiWidgetsComponent,
                children: [
                  {path: '', redirectTo: 'all', pathMatch: 'full'},
                  {path: 'all', component: AllWidgetsComponent},
                  {path: 'add-widget', component: AddWidgetsComponent}]
              }
            ]
          }

        ]
      },

      {path: '**', component: PageNotFoundComponent},

    ]
  },


  {
    path: 'create-account',
    component: UserRegistrationComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  // todo remove this
  {
    path: 'test',
    component: TestComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  // todo remove this
  {
    path: 'google1',
    component: OauthmidComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {
    path: 'varify-account',
    component: SocialLoginComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {path: 'signup', component: SignupComponent, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
  {
    path: 'selfregistration',
    component: SelfregistrationComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {
    path: 'account-setup',
    component: AccountSetupComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {
    path: 'about-work',
    component: AboutWorkComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {
    path: 'about-work/:id/:checknumberId',
    component: AboutWorkComponent,
    data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]
  },
  {path: 'comp4/:id', component: Comp4Component, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
  {path: 'comp2/:id', component: Comp2Component, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
  {path: 'comp3/:id', component: Comp3Component, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},
  {path: 'page11/:id', component: Page11Component, data: [{selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1}]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
