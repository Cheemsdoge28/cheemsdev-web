type Service = {
  title: string; 
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  target: boolean;
  isServicesDropdown?: boolean;
  services?: Service[];
};



export type BreadcrumbLink = {
  label: string;
  href: string;
};
