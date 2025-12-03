export { }

declare global {
  interface CustomJwtSessionClaims {
    azp: string;
    exp: number;
    firstName: string;
    fva: number[];
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    o: {
      id: string;
      rol: string;
      slg: string;
    };
    orgLogo: string;
    orgName: string;
    sid: string;
    sts: string;
    sub: string;
    v: number;
    publicMetadata?: {
      role?: string;
    };
  }

  interface TabItem {
    value: string
    label: string
    icon: LucideIcon
    content: ReactNode
  }

  interface HorizontalTabsProps {
    tabs: TabItem[]
    defaultValue?: string
    className?: string
  }

  interface VerticalTabsProps {
    tabs: TabItem[]
    defaultValue?: string
    className?: string
    contentClassName?: string
  }  

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
  };

  type Option = {
    value: string;
    label: string;
  };

  type SelectFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    options: readonly Option[];
    control: Control;
    error?: FieldError;
    required?: boolean;
  };

  type ContactFormData = {
    full_name: string;
    mobile: string;
    alt_mobile: string;
    email: string;
    gender: string
  }

  type Project = {
    id: string;
    projectName: string
    projectDetails: string | null;
    acquisitionDate: string
    sqmBought: number
    acquisitionValue: number
    region: string | null;
    district: string | null;
    ward: string;
    projectOwner: string | null;
    committmentAmount: number | null; // numeric as number
    lgaFee: number | null; // numeric as number
    street: string | null;
    tpNumber: string | null;
    tpStatus: string | null;
    surveyStatus: string | null;
    surveyNumber: string | null;
    originalContractPdf: string | null;
    supplierName: string; // UUID
    mwenyekitiName: string | null;
    mwenyekitiMobile: string | null;
    mtendajiName: string | null;
    mtendajiMobile: string | null;
    numberOfPlots: number | null; // numeric as number
    tpUrl: string | null;
    surveyUrl: string | null;
    addedBy: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

}