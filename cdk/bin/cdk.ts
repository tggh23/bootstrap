#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

new FrontendStack(app, 'FrontendStack', {
  env: { account: '123456789012', region: 'us-east-1' },
});

new BackendStack(app, 'BackendStack', {
  env: { account: '123456789012', region: 'us-east-1' },
});
