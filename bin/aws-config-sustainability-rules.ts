#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsConfigSustainabilityRulesStack } from '../lib/aws-config-sustainability-rules-stack';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag'
import { Aspects } from 'aws-cdk-lib';

const app = new cdk.App();
Aspects.of(app).add(new AwsSolutionsChecks({ }))



const stack = new AwsConfigSustainabilityRulesStack(app, 'AwsConfigSustainabilityRulesStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

// Nag suppression for stack

// Nag suppression for SustainabilityConformancePackBucket
// AwsSolutions-S1: The S3 Bucket has server access logs disabled.

// Nag suppression for BucketDeployment
// AwsSolutions-IAM4 : The IAM entity contains wildcard permissions.
// AwsSolutions-IAM5 : The IAM user, role, or group uses AWS managed policies.
// AwsSolutions-L1 : The non-container Lambda function is not configured to use the latest runtime version.

NagSuppressions.addStackSuppressions(stack, [
  {
    id: 'AwsSolutions-S1',
    reason: 'Impossible to enable server logs for SustainabilityConformancePackBucket as it requires to have an Amazon S3 bucket for storing logs.'
  },
  {
    id: 'AwsSolutions-IAM4',
    reason: 'BucketDeployment creates a default Amazon IAM Role which uses AWS managed policies. BucketDeployment provides the possibility to use another IAM role for the deployment but it creates the default IAM default role anyway.'
  },
  {
    id: 'AwsSolutions-IAM5',
    reason: 'BucketDeployment creates a default Amazon IAM Role which contains wildcard permissions. BucketDeployment provides the possibility to use another IAM role for the deployment but it creates the default IAM default role anyway.'
  },
  {
    id: 'AwsSolutions-L1',
    reason: 'BucketDeployment creates an Amazon Lambda function which is not configured to use the latest runtime version. BucketDeployment does not provide the posibilty to change the Amazon Lambda runtime version.'
  }
])