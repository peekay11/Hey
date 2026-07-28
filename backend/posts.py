import boto3

 dynamodb = boto3.resource('dynamodb', region_name='af-south-1')
    s3 = boto3.client('s3', region_name='af-south-1')


# create a table in dynamo db for the 