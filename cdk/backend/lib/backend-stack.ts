import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'testBucket', {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
          ],
          allowedOrigins: ['http://localhost:3000'],
          allowedHeaders: ['*'],
        },
      ],
    });

    bucket.grantRead(new iam.AccountRootPrincipal());

    const gptApiKeySecret = new secretsmanager.Secret(this, 'GPTApiKeySecret', {
      secretName: 'GPT_API_KEY',
      description: 'Secret for Chat GPT API Key',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'apiKey', 
      }
    });

    const baseFunction = new NodejsFunction(this, 'base-function', {
      entry: path.join(__dirname, '../../../src/backend/app/functions/base-agent/index.ts'), // raw TS source file
      handler: 'main',
      runtime: Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      environment: {
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(cdk.Stack.of(this).availabilityZones),
        GPT_API_KEY_SECRET: gptApiKeySecret.secretName
      },
      bundling: {
        format: OutputFormat.ESM, // Correct bundling format for ESM
        target: 'es2022', // Ensure compatibility with modern JavaScript
      },
    });

    gptApiKeySecret.grantRead(baseFunction);

  }
}
