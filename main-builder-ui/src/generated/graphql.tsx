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
  _id: Scalars['ObjectId'];
  appEntryComponentId?: Maybe<Scalars['ObjectId']>;
  description: Scalars['String'];
  name: Scalars['String'];
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
  displayName: Scalars['String'];
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
  serverConfigId: Scalars['ObjectId'];
  version: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  _id: Scalars['ObjectId'];
  avatar?: Maybe<Scalars['String']>;
  invitees: Invitation;
  isPersonal: Scalars['Boolean'];
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
  teams: Array<Team>;
  urlSlug: Scalars['String'];
};

export type OrganizationInput = {
  name: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ObjectId'];
  appConfig: Array<AppConfig>;
  appId: Scalars['String'];
  organization: Organization;
  projectName: Scalars['String'];
  serverConfig: Array<ServerConfig>;
  teams: Array<Team>;
  users: Array<User>;
};

export type ProjectInput = {
  organizationId: Scalars['ObjectId'];
  projectDescription: Scalars['String'];
  projectName: Scalars['String'];
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
  serverConfigId: Scalars['ObjectId'];
};


export type QueryGetProjectArgs = {
  projectId: Scalars['ObjectId'];
};


export type QueryInvitationArgs = {
  invitationId: Scalars['ObjectId'];
};

export type ServerConfig = {
  __typename?: 'ServerConfig';
  _id: Scalars['ObjectId'];
  apiConfig: Api;
  authConfig: Auth;
  description: Scalars['String'];
  ec2InstanceId?: Maybe<Scalars['String']>;
  ec2PublicDns?: Maybe<Scalars['String']>;
  name: Scalars['String'];
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
  favorites: Array<Scalars['ObjectId']>;
  hidden: Array<Scalars['ObjectId']>;
  invitations: Array<Invitation>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  organizations: Array<Organization>;
  status: Scalars['String'];
  userRole: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  favorites?: InputMaybe<Array<Scalars['ObjectId']>>;
  fullName?: InputMaybe<Scalars['String']>;
  hidden?: InputMaybe<Array<Scalars['ObjectId']>>;
};

export type DeleteInvitationMutationVariables = Exact<{
  email: Scalars['String'];
  organizationId: Scalars['ObjectId'];
}>;


export type DeleteInvitationMutation = { __typename?: 'Mutation', deleteInvitation: boolean };

export type InviteMemberMutationVariables = Exact<{
  organizationId: Scalars['ObjectId'];
  email: Scalars['String'];
  sendInvite?: InputMaybe<Scalars['Boolean']>;
}>;


export type InviteMemberMutation = { __typename?: 'Mutation', inviteMember: { __typename?: 'Invitation', _id: any } };

export type CreateOrganizationMutationVariables = Exact<{
  organization: OrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', _id: any, name: string, urlSlug: string } };

export type ListOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrganizationsQuery = { __typename?: 'Query', listOrganizations: Array<{ __typename?: 'Organization', _id: any, name: string, avatar?: string | null, isPersonal: boolean }> };

export type CreateProjectMutationVariables = Exact<{
  project: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', _id: any } };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['ObjectId'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: any };

export type ListProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListProjectsQuery = { __typename?: 'Query', listProjects: Array<{ __typename?: 'Project', _id: any, projectName: string, appConfig: Array<{ __typename?: 'AppConfig', _id: any, name: string, description: string }>, serverConfig: Array<{ __typename?: 'ServerConfig', _id: any, name: string, description: string }> }> };

export type ServerVersionNumberQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerVersionNumberQuery = { __typename?: 'Query', serverVersionNumber?: string | null };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: any, email: string, userRole: string, avatar?: string | null, displayName?: string | null, favorites: Array<any>, hidden: Array<any>, organizations: Array<{ __typename?: 'Organization', _id: any, name: string }> } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutputType', sessionId: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  displayName: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', email: string } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type UpdateMeMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', _id: any, email: string, userRole: string, avatar?: string | null, displayName?: string | null, favorites: Array<any>, hidden: Array<any>, organizations: Array<{ __typename?: 'Organization', _id: any, name: string }> } };


export const DeleteInvitationDocument = gql`
    mutation DeleteInvitation($email: String!, $organizationId: ObjectId!) {
  deleteInvitation(email: $email, organizationId: $organizationId)
}
    `;
export type DeleteInvitationMutationFn = Apollo.MutationFunction<DeleteInvitationMutation, DeleteInvitationMutationVariables>;

/**
 * __useDeleteInvitationMutation__
 *
 * To run a mutation, you first call `useDeleteInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvitationMutation, { data, loading, error }] = useDeleteInvitationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useDeleteInvitationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInvitationMutation, DeleteInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, options);
      }
export type DeleteInvitationMutationHookResult = ReturnType<typeof useDeleteInvitationMutation>;
export type DeleteInvitationMutationResult = Apollo.MutationResult<DeleteInvitationMutation>;
export type DeleteInvitationMutationOptions = Apollo.BaseMutationOptions<DeleteInvitationMutation, DeleteInvitationMutationVariables>;
export const InviteMemberDocument = gql`
    mutation InviteMember($organizationId: ObjectId!, $email: String!, $sendInvite: Boolean) {
  inviteMember(
    organizationId: $organizationId
    email: $email
    sendInvite: $sendInvite
  ) {
    _id
  }
}
    `;
export type InviteMemberMutationFn = Apollo.MutationFunction<InviteMemberMutation, InviteMemberMutationVariables>;

/**
 * __useInviteMemberMutation__
 *
 * To run a mutation, you first call `useInviteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberMutation, { data, loading, error }] = useInviteMemberMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      email: // value for 'email'
 *      sendInvite: // value for 'sendInvite'
 *   },
 * });
 */
export function useInviteMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteMemberMutation, InviteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteMemberMutation, InviteMemberMutationVariables>(InviteMemberDocument, options);
      }
export type InviteMemberMutationHookResult = ReturnType<typeof useInviteMemberMutation>;
export type InviteMemberMutationResult = Apollo.MutationResult<InviteMemberMutation>;
export type InviteMemberMutationOptions = Apollo.BaseMutationOptions<InviteMemberMutation, InviteMemberMutationVariables>;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($organization: OrganizationInput!) {
  createOrganization(organization: $organization) {
    _id
    name
    urlSlug
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const ListOrganizationsDocument = gql`
    query ListOrganizations {
  listOrganizations {
    _id
    name
    avatar
    isPersonal
  }
}
    `;

/**
 * __useListOrganizationsQuery__
 *
 * To run a query within a React component, call `useListOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
      }
export function useListOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
        }
export type ListOrganizationsQueryHookResult = ReturnType<typeof useListOrganizationsQuery>;
export type ListOrganizationsLazyQueryHookResult = ReturnType<typeof useListOrganizationsLazyQuery>;
export type ListOrganizationsQueryResult = Apollo.QueryResult<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($project: ProjectInput!) {
  createProject(project: $project) {
    _id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: ObjectId!) {
  deleteProject(projectId: $projectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const ListProjectsDocument = gql`
    query ListProjects {
  listProjects {
    _id
    projectName
    appConfig {
      _id
      name
      description
    }
    serverConfig {
      _id
      name
      description
    }
  }
}
    `;

/**
 * __useListProjectsQuery__
 *
 * To run a query within a React component, call `useListProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
      }
export function useListProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
        }
export type ListProjectsQueryHookResult = ReturnType<typeof useListProjectsQuery>;
export type ListProjectsLazyQueryHookResult = ReturnType<typeof useListProjectsLazyQuery>;
export type ListProjectsQueryResult = Apollo.QueryResult<ListProjectsQuery, ListProjectsQueryVariables>;
export const ServerVersionNumberDocument = gql`
    query ServerVersionNumber {
  serverVersionNumber
}
    `;

/**
 * __useServerVersionNumberQuery__
 *
 * To run a query within a React component, call `useServerVersionNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerVersionNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerVersionNumberQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerVersionNumberQuery(baseOptions?: Apollo.QueryHookOptions<ServerVersionNumberQuery, ServerVersionNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerVersionNumberQuery, ServerVersionNumberQueryVariables>(ServerVersionNumberDocument, options);
      }
export function useServerVersionNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerVersionNumberQuery, ServerVersionNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerVersionNumberQuery, ServerVersionNumberQueryVariables>(ServerVersionNumberDocument, options);
        }
export type ServerVersionNumberQueryHookResult = ReturnType<typeof useServerVersionNumberQuery>;
export type ServerVersionNumberLazyQueryHookResult = ReturnType<typeof useServerVersionNumberLazyQuery>;
export type ServerVersionNumberQueryResult = Apollo.QueryResult<ServerVersionNumberQuery, ServerVersionNumberQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    userRole
    avatar
    displayName
    favorites
    hidden
    organizations {
      _id
      name
    }
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    sessionId
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $displayName: String!) {
  register(email: $email, password: $password, displayName: $displayName) {
    email
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($userInput: UserInput!) {
  updateMe(userInput: $userInput) {
    _id
    email
    userRole
    avatar
    displayName
    favorites
    hidden
    organizations {
      _id
      name
    }
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;