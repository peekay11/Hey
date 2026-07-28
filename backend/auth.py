import json
import boto3
import os

# Initialize AWS clients for the Cape Town region
cognito = boto3.client('cognito-idp', region_name='af-south-1')
dynamodb = boto3.resource('dynamodb', region_name='af-south-1')

# Environment variables (AWS SAM will pass these in)
COGNITO_CLIENT_ID = os.environ.get('COGNITO_CLIENT_ID', 'YOUR_COGNITO_APP_CLIENT_ID')
USERS_TABLE_NAME = os.environ.get('USERS_TABLE', 'Hey-Users')
users_table = dynamodb.Table(USERS_TABLE_NAME)

def handler(event, context):
    """
    This is the main entry point that API Gateway will call.
    Your task:
    1. Parse the HTTP request body from the frontend.
    2. Check if event['pathParameters']['action'] is 'login' or 'signup'.
    3. Use boto3 to call cognito.sign_up() or cognito.initiate_auth().
    4. Write the user profile to DynamoDB on signup.
    5. Return the correct HTTP status code and JSON body.
    """
    
    # Write your logic here!
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({"status": "SUCCESS", "message": "auth.py is ready for implementation!"})
    }
