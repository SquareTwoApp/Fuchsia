import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectId: any;
};

export type Api = {
  __typename?: 'Api';
  liveEndpoint?: Maybe<Scalars['String']>;
  models: Array<EntityModel>;
  mutations: Array<Scalars['String']>;
  queries: Array<Scalars['String']>;
  sandboxEndpoint?: Maybe<Scalars['String']>;
  subscriptions: Array<Scalars['String']>;
};

export type AppConfig = {
  __typename?: 'AppConfig';
  appEntryComponentId?: Maybe<Scalars['ObjectId']>;
  variables: Array<AppVariable>;
};

export type AppVariable = {
  __typename?: 'AppVariable';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  _id: Scalars['ObjectId'];
  allowUnauthenticatedUsers: Scalars['Boolean'];
  clientRefreshTokenValidity: Scalars['Float'];
  defaultPasswordPolicy: Scalars['Boolean'];
  emailVerificationMessage: Scalars['String'];
  emailVerificationSubject: Scalars['String'];
  mfaConfiguration: Scalars['String'];
  mfaEnabled: Scalars['Boolean'];
  mfaTypes: Scalars['String'];
  passwordFieldId: Scalars['String'];
  passwordPolicyMinLength: Scalars['Float'];
  passwordRequiresNumbers: Scalars['Boolean'];
  passwordRequiresSymbols: Scalars['Boolean'];
  passwordRequiresUppercase: Scalars['Boolean'];
  requiredAttributes: Array<Scalars['String']>;
  requiresAuth: Scalars['Boolean'];
  smsAuthenticationMessage: Scalars['String'];
  smsVerificationMessage: Scalars['String'];
  tableId: Scalars['String'];
  usernameCaseSensitive: Scalars['Boolean'];
  usernameFieldId: Scalars['String'];
};

export type DataAuth = {
  __typename?: 'DataAuth';
  allow: Scalars['String'];
  groupClaim: Scalars['String'];
  groups: Array<Scalars['String']>;
  groupsField: Scalars['String'];
  identityClaim: Scalars['String'];
  operations: Array<Scalars['String']>;
  ownerField: Scalars['String'];
  provider: Scalars['String'];
};

export type DataField = {
  __typename?: 'DataField';
  _id: Scalars['ObjectId'];
  connection?: Maybe<Scalars['Boolean']>;
  dataType: Scalars['String'];
  fieldName: Scalars['String'];
  isHashed: Scalars['Boolean'];
  isList?: Maybe<Scalars['Boolean']>;
  isUnique: Scalars['Boolean'];
  keys: Array<Key>;
  nullable: Scalars['Boolean'];
  rules: Array<DataAuth>;
};

export type EntityModel = {
  __typename?: 'EntityModel';
  _id: Scalars['ObjectId'];
  auth: Array<DataAuth>;
  fields: Array<DataField>;
  isLocal: Scalars['Boolean'];
  keys: Array<Key>;
  name: Scalars['String'];
};

export type Invitation = {
  __typename?: 'Invitation';
  _id: Scalars['ObjectId'];
  acceptedDate?: Maybe<Scalars['DateTime']>;
  organizationId: Scalars['ObjectId'];
  userEmail: Scalars['String'];
};

export type Key = {
  __typename?: 'Key';
  fieldNames: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type LoginOutputType = {
  __typename?: 'LoginOutputType';
  sessionId: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitaion: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  createOrganization: Organization;
  createProject: Project;
  createUser: User;
  deleteInvitation: Scalars['Boolean'];
  deleteOrganization: Scalars['ObjectId'];
  deleteProject: Scalars['ObjectId'];
  forgotPassword: Scalars['Boolean'];
  inviteMember: Invitation;
  login: LoginOutputType;
  logout: Scalars['Boolean'];
  register: User;
  resetPassword: Scalars['Boolean'];
  updateMe: User;
  updateProject: Project;
  updateServerVersion: Scalars['Boolean'];
};


export type MutationAcceptInvitaionArgs = {
  invitationId: Scalars['ObjectId'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  organization: OrganizationInput;
};


export type MutationCreateProjectArgs = {
  project: ProjectInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteInvitationArgs = {
  email: Scalars['String'];
  organizationId: Scalars['ObjectId'];
};


export type MutationDeleteOrganizationArgs = {
  organizationId: Scalars['ObjectId'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['ObjectId'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInviteMemberArgs = {
  email: Scalars['String'];
  organizationId: Scalars['ObjectId'];
  sendInvite?: InputMaybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateMeArgs = {
  userInput: UserInput;
};


export type MutationUpdateProjectArgs = {
  project: UpdateProjectInput;
  projectId: Scalars['ObjectId'];
};


export type MutationUpdateServerVersionArgs = {
  projectId: Scalars['ObjectId'];
  sandbox: Scalars['Boolean'];
  version: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  _id: Scalars['ObjectId'];
  avatar?: Maybe<Scalars['String']>;
  invitees: Invitation;
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
  projects: Array<Project>;
  teams: Array<Team>;
};

export type OrganizationInput = {
  name: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ObjectId'];
  appConfig: AppConfig;
  appId: Scalars['String'];
  projectName: Scalars['String'];
  serverConfig: ServerConfig;
  teams: Team;
};

export type ProjectInput = {
  organizationId: Scalars['ObjectId'];
  projectDescription: Scalars['String'];
  projectName: Scalars['String'];
  proprietorId: Scalars['ObjectId'];
  proprietorType: Scalars['ObjectId'];
};

export type Query = {
  __typename?: 'Query';
  getDockerhubVersions: Array<Scalars['String']>;
  getProject: Project;
  invitation: Invitation;
  listOrganizations: Array<Organization>;
  listProjects: Array<Project>;
  me?: Maybe<User>;
  serverVersionNumber?: Maybe<Scalars['String']>;
};


export type QueryGetDockerhubVersionsArgs = {
  projectId: Scalars['ObjectId'];
};


export type QueryGetProjectArgs = {
  projectId: Scalars['ObjectId'];
};


export type QueryInvitationArgs = {
  invitationId: Scalars['ObjectId'];
};

export type ServerConfig = {
  __typename?: 'ServerConfig';
  apiConfig: Api;
  authConfig: Auth;
  ec2InstanceId?: Maybe<Scalars['String']>;
  ec2PublicDns?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['ObjectId'];
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
};

export type UpdateProjectInput = {
  projectName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  avatar?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  invitations: Array<Invitation>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  organizations: Array<Organization>;
  projects: Array<Project>;
  status: Scalars['String'];
  userRole: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  fullName?: InputMaybe<Scalars['String']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string } | null };


export const MeDocument = gql`
    query Me {
  me {
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;