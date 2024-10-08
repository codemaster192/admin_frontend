import { lazy } from 'react';
import Loadable from 'app/components/Loadable';

const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
// const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const Account = Loadable(lazy(() => import('./accountTable/AppTable')));
const Customers = Loadable(lazy(() => import('./customerTable/AppTable')));
const Plans = Loadable(lazy(() => import('./plansTable/AppTable')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));
//Newly added tabs
const KYCComponent = Loadable(lazy(() => import('./kyc/KycComponent')));
const OrdersComponent = Loadable(lazy(() => import('./order/orderTab')));
const SettingComponent = Loadable(lazy(() => import('./system-setting/Setting')));


const materialRoutes = [
    { path: '/material/accountTable', element: <Account /> },
    { path: '/material/customerTable', element: <Customers /> },
    { path: '/material/plansTable', element: <Plans /> },
    //newly added route 
    { path: '/material/kycTable', element: <KYCComponent /> },  
    { path: '/material/orderTable', element: <OrdersComponent /> },  
    { path: '/material/settings', element: <SettingComponent /> },  
    // { path: '/material/table', element: <AppTable /> },
    { path: '/material/form', element: <AppForm /> },
    { path: '/material/buttons', element: <AppButton /> },
    { path: '/material/icons', element: <AppIcon /> },
    { path: '/material/progress', element: <AppProgress /> },
    { path: '/material/menu', element: <AppMenu /> },
    { path: '/material/checkbox', element: <AppCheckbox /> },
    { path: '/material/switch', element: <AppSwitch /> },
    { path: '/material/radio', element: <AppRadio /> },
    { path: '/material/slider', element: <AppSlider /> },
    { path: '/material/autocomplete', element: <AppAutoComplete /> },
    { path: '/material/expansion-panel', element: <AppExpansionPanel /> },
    { path: '/material/dialog', element: <AppDialog /> },
    { path: '/material/snackbar', element: <AppSnackbar /> }
];

export default materialRoutes;
