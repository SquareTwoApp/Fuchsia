import { ServerAuth, ServerConfiguration } from "../src/types"

export const testData = {
  "_id": "6272d46446c9a45db8e719d4",
  "appId": "f9defc75-6ca0-49f9-9ed7-54392b818cc6",
  "projectName": "ToDo",
  "organization": "620b132662e5560e44d55a42",
  "appConfig": {
    "_id": "6272d46446c9a45db8e719d5",
    "variables": [],
    "appEntryComponentId": "628ce002338032d747aab7ca"
  },
  "serverConfig": {
    "liveJwtSecret": "d3adb3a3be1bdf0f39e5b2ad5ec236d526896650",
    "sandboxJwtSecret": "5e758088e6704a0a3027942df98c35e44187bc9b",
    "version": "0.0.3",
    "apiConfig": {
      "queries": [],
      "mutations": [],
      "subscriptions": [],
      "models": [
        {
          "name": "User",
          "isLocal": false,
          "_id": "6272d48346c9a45db8e71a02",
          "keys": [],
          "auth": [],
          "fields": [
            {
              "fieldName": "email",
              "isUnique": true,
              "isHashed": false,
              "isList": false,
              "nullable": false,
              "dataType": "String",
              "_id": "6272d48d46c9a45db8e71a18",
              "rules": [],
              "keys": []
            },
            {
              "fieldName": "password",
              "isUnique": false,
              "isHashed": true,
              "isList": false,
              "nullable": false,
              "dataType": "String",
              "_id": "6272d49346c9a45db8e71a31",
              "rules": [],
              "keys": []
            },
            {
              "fieldName": "user_type",
              "isUnique": false,
              "isHashed": false,
              "isList": false,
              "nullable": true,
              "dataType": "String",
              "_id": "627acaa84f2bcffc91f3f894",
              "rules": [],
              "keys": []
            },
            {
              "fieldName": "asdf",
              "isUnique": false,
              "isHashed": false,
              "isList": false,
              "nullable": true,
              "dataType": "String",
              "_id": "627accd14f2bcffc91f3fa62",
              "rules": [],
              "keys": []
            }
          ]
        },
        {
          "name": "ToDo",
          "isLocal": false,
          "_id": "6272d6c746c9a45db8e71b77",
          "keys": [],
          "auth": [],
          "fields": [
            {
              "fieldName": "Description",
              "isUnique": false,
              "isHashed": false,
              "isList": false,
              "nullable": true,
              "dataType": "String",
              "_id": "6272d6d246c9a45db8e71b96",
              "rules": [],
              "keys": []
            }
          ]
        }
      ]
    },
    "authConfig": {
      "requiresAuth": true,
      "allowUnauthenticatedUsers": false,
      "mfaEnabled": false,
      "mfaConfiguration": "OFF",
      "mfaTypes": "SMS",
      "smsAuthenticationMessage": "Your authentication code is {####}",
      "smsVerificationMessage": "Your verification code is {####}",
      "emailVerificationSubject": "Your verification code",
      "emailVerificationMessage": "Your verification code is {####}",
      "defaultPasswordPolicy": false,
      "passwordPolicyMinLength": 8,
      "passwordRequiresUppercase": false,
      "passwordRequiresNumbers": false,
      "passwordRequiresSymbols": false,
      "requiredAttributes": [],
      "clientRefreshTokenValidity": 10,
      "usernameCaseSensitive": false,
      "tableId": "6272d48346c9a45db8e71a02",
      "usernameFieldId": "6272d48d46c9a45db8e71a18",
      "passwordFieldId": "6272d49346c9a45db8e71a31",
      "_id": "6272d46446c9a45db8e719d6"
    },
    "_id": "6272d46446c9a45db8e719d7",
    "ec2InstanceId": "i-01fd52d063ec09d7f",
    "ec2PublicDns": "ec2-35-183-122-99.ca-central-1.compute.amazonaws.com"
  },
  "__v": 9,
  "assetLibrary": {
    "assets": [
      "62866494fa7c65f6bbddc19d",
      "62a1fbb9037026a1ac8b1276"
    ],
    "_id": "62866494fa7c65f6bbddc19e"
  },
  "labelLibrary": {
    "_id": "62bb214bcab64fe7b6842648",
    "labelTags": [],
    "languages": [
      {
        "name": "New",
        "code": "new",
        "_id": "62bb214bcab64fe7b6842649"
      },
      {
        "name": "New",
        "code": "new",
        "_id": "62bb2158cab64fe7b684268a"
      }
    ],
    "translations": []
  }
}