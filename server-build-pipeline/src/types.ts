

export interface Import {
  [packageName: string]: {
    [componentName: string]: {
      type: 'default' | 'single'
      rename?: string
    }
  }
}

export interface GitBlob {
  path?: string | undefined
  mode?: '100644' | '100755' | '040000' | '160000' | '120000' | undefined
  type?: 'blob' | 'tree' | 'commit' | undefined
  sha?: string | null | undefined
  content?: string | undefined
}

export interface Key {
  fieldName: string
  dataType: string
  nullable: boolean
}

export interface EntityModel {
  _id: string
  name: string
  isLocal: boolean
  keys: Key[]
  fields: DataField[]
}

export interface DataField {
  _id: string
  fieldName: string
  isUnique: boolean
  isHashed: boolean
  isList: boolean
  connection: boolean
  nullable: boolean
  dataType: string
  keys: Key[]
}

export interface ServerApi {
  sandboxEndpoint: string
  liveEndpoint: string
  models: EntityModel[]
  queries: string[]
  mutations: string[]
  subscriptions: string[]
}

export interface ServerConfiguration {
  liveJwtSecret?: string;
  sandboxJwtSecret?: string;
  githubUrl?: string;
  ec2InstanceId?: string;
  ec2PublicDns?: string;
  version?: string;
  apiConfig: ServerApi;
  authConfig: ServerAuth;
}

export interface ServerAuth {
  _id: string
  requiresAuth: Boolean;
  allowUnauthenticatedUsers: Boolean;
  mfaEnabled: Boolean;
  mfaConfiguration: 'OFF' | 'ON' | 'OPTIONAL';
  mfaTypes: 'SMS' | 'TOTP' | 'EMAIL';
  smsAuthenticationMessage: string;
  smsVerificationMessage: string;
  emailVerificationSubject: string;
  emailVerificationMessage: string;
  defaultPasswordPolicy: boolean;
  passwordPolicyMinLength: number;
  passwordRequiresUppercase: boolean;
  passwordRequiresNumbers: boolean;
  passwordRequiresSymbols: boolean;
  requiredAttributes: string[];
  clientRefreshTokenValidity: number;
  usernameCaseSensitive: boolean;
  tableId: string;
  usernameFieldId: string;
  passwordFieldId: string;
}