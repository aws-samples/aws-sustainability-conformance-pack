import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

// Sustainability conformance pack template folder
const conformancePackTemplateFolderPath = './lib/conformance-pack-template';

// Sustainability conformance pack template name
const conformancePackTemplateName = 'template.yaml';

export class AwsConfigSustainabilityRulesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates an Amazon S3 bucket to upload the sustainability conformance pack template, which is required for the creation of the conformance pack.
    const sustainabilityConformanceBucket = new cdk.aws_s3.Bucket(this, 'SustainabilityConformancePackBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true
    });

    // Upload the sustainability conformance pack template to the S3 bucket.
    const sustainabilityConformityPackDeployment = new cdk.aws_s3_deployment.BucketDeployment(this, "SustainabilityConformityPackDeployment", {
      sources: [cdk.aws_s3_deployment.Source.asset(conformancePackTemplateFolderPath)],
      destinationBucket: sustainabilityConformanceBucket
    });

    // Creates a sustainability conformance pack using the template previously uploaded to the S3 bucket.
    const sustainabilityConformacePack = new cdk.aws_config.CfnConformancePack(this, 'SustainabilityConformacePack', {
      conformancePackName: 'SustainabilityConformacePack',
      deliveryS3Bucket: sustainabilityConformanceBucket.bucketName,
      deliveryS3KeyPrefix: 'sustainability-conformance-pack',
      templateS3Uri: `s3://${sustainabilityConformanceBucket.bucketName}/${conformancePackTemplateName}`
    });

    // Adds a dependency on the sustainability conformance pack template upload to the conformance pack creation (to wait until template.yaml is uploaded).
    sustainabilityConformacePack.node.addDependency(sustainabilityConformityPackDeployment);
    
  }
}