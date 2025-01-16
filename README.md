# Assess, Audit, and Evaluate AWS Resources Against Sustainability Best Practices

At AWS, we are committed to running our business in the most environmentally friendly way possible. We also work to enable our customers to use the benefits of the cloud to better monitor and optimize their IT infrastructure. As reported in The [Carbon Reduction Opportunity of Moving to Amazon Web Services](https://d39w7f4ix9f5s9.cloudfront.net/e3/79/42bf75c94c279c67d777f002051f/carbon-reduction-opportunity-of-moving-to-aws.pdf), our infrastructure is 3.6 times more energy efficient than the median US enterprise data center, and moving to AWS can lower your workload’s carbon footprint by 88% for the same task.

Sustainability is a shared responsibility between AWS and our customers. AWS is responsible for optimizing the sustainability of the cloud – delivering efficient, shared infrastructure, water stewardship, and sourcing renewable power. While customers are responsible for sustainability in the cloud – optimizing workloads and resource utilization, and minimizing the total resources required to be deployed for your workloads. 

To help customers achieve their sustainability goals, AWS offers a variety of tools including the [AWS Customer Carbon Footprint Tool](https://aws.amazon.com/aws-cost-management/aws-customer-carbon-footprint-tool/) to track, measure, and forecast the carbon emissions generated from your AWS usage. AWS created the [Well-Architected Framework Sustainability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html), which provides design principles, operational guidance, and best-practices that can be used to achieve sustainability targets for your workloads. AWS also continues to launch services that enable sustainability improvements in architectures, such as [AWS Graviton Instances](https://aws.amazon.com/ec2/graviton/), which are designed to deliver the best performance per watt of energy use in Amazon EC2. [Amazon EC2 Spot Instances](https://aws.amazon.com/ec2/spot/) allow you to benefit from significant cost savings while helping AWS improve data center utilization.

In this repo, we demonstrate how customers can use [AWS Config](https://aws.amazon.com/config/) to assess, audit, and evaluate AWS resources at scale against the [Sustainability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html) best practices from the AWS Well-Architected Framework.


## Implementing Sustainability Rules at Scale

Customers can use conformance packs to deploy AWS Config rules, such as the examples above, across their organization to work towards sustainability goals. To help accelerate using Config rules, we have created an example conformance pack, which includes the Config Rules below. This pack includes the following nine Config rules which support a number of Sustainability Pillar best practices.

| | Service  | Description of Config Rule | Sustainability Pillar Best Practice |
|---|---|---|---|
| 1 | API Gateway | Rule checks compression is enabled for a Rest API | [SUS04-BP07](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a8.html) |
| 2 | CloudFront | Rule checks that compression is enabled (Note this rule must be deployed in us-east-1) | [SUS04-BP07](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a8.html) |
| 3 | EBS | Rule checks that EBS delete on instance termination is enabled | [SUS02-BP03](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a4.html) |
| 4 | EC2 | Rule checks that EC2 security groups do not have port 22 open for ssh, so Session Manager is used instead | [SUS05-BP03](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_hardware_a4.html) |
| 5 | EFS | Rule checks that EFS Lifecycle Management is enabled | [SUS04-BP03](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html) |
| 6 | Lambda | Rule checks that Lambda functions are using AWS Graviton based processors | [SUS05-BP01](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_hardware_a2.html) |
| 7 | RDS | Rule checks that RDS instances are using AWS Graviton based processors | [SUS05-BP02](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_hardware_a3.html) |
| 8 | RDS | Rule check that performance insight is enabled | [SUS03-BP03](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_software_a4.html) |
| 9 | S3 | Rule checks that lifecycle policies is configured for Amazon S3 bucket | [SUS04-BP03](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html) |

Customers can expand on this set of example rules to the evaluate their workloads against the additional [sustainability best practices](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/best-practices-for-sustainability-in-the-cloud.html) aligned with their improvement goals. Customers have the ability to adapt these rules and [create custom Config rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html) for the resources within their environment. The conformance pack can then be use to apply the new rules across the organization.

# Steps to Set Up

## Prerequisites

1. Access to an AWS account using both AWS Console and AWS CLI V2. Instructions to configure AWS CLI V2 are available [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
2. AWS CDK is setup. The instructions are available [here](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install).
3. NodeJS is installed. Download latest version from [here](https://nodejs.org/en/download/).
4. Git is installed (to pull code from repository). The instructions are available [here](https://git-scm.com/).
5. VS Code or any other IDE for TypeScript development.
6. If using windows, use git-bash as terminal. It’s installed as part of installing Git.

## Install and Deploy

From project root directory, run following commands:
1. `npm install`
2. `cdk deploy`

# Others  

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Useful documentation

* [AWS Config Rules Samples](https://github.com/aws-samples/aws-config-custom-policy-rule-samples)
* [Resource type schema for AWS Config](https://github.com/awslabs/aws-config-resource-schema/tree/master/config/properties/resource-types)
* [Sus scanner](https://github.com/awslabs/sustainability-scanner)
* [Deploying Conformance Packs](https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-deploy.html) 
