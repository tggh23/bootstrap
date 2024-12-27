import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export declare class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps);
}

export declare class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps);
}
