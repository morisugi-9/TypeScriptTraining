import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "MyCdkVpc", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
      maxAzs: 3, // Default is all AZs in region
      // natGateways: 1,
    });

    const cluster = new ecs.Cluster(this, "MyCdkCluster", {
      vpc: vpc,
    });

    // create a load-banced Farget service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargeteService", {
      cluster: cluster, // required
      cpu: 256, // default
      desiredCount: 1, // default
      taskImageOptions: {image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")},
      memoryLimitMiB: 512, // default
      publicLoadBalancer: true // default is false
    })

    // const myBucket = new s3.Bucket(this, "cdk-morisugi-bucket");

    // example resource
    // const queue = new sqs.Queue(this, '01MyProjectQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
