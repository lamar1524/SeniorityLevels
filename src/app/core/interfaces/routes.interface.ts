export interface IRoutesConst {
  [routeName: string]: string;
}

export interface IRouteHeader {
  title: string;
  path: string;
}

export interface IRoutesHeader {
  [route: string]: IRouteHeader;
}
