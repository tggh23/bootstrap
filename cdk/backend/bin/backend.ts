#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();
const devEnv = { account: '663671772642', region: 'us-east-1' };
const prodEnv = { account: '663671772642', region: 'us-east-1' };

new BackendStack(app, 'BackendStack-Dev', {
  env: devEnv,
  stackName: 'BackendStack-Dev',
});

new BackendStack(app, 'BackendStack-Prod', {
  env: prodEnv,
  stackName: 'BackendStack-Prod',
});