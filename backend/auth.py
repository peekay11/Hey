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

def sign_up(username, password, email):
    """
    Step 1: Create the user in Amazon Cognito.
    """
    try:
        response = cognito.sign_up(
            ClientId=COGNITO_CLIENT_ID,
            Username=username,
            Password=password,
            UserAttributes=[
                {'Name': 'email', 'Value': email}
            ]
        )
        
        # Step 2: Also create an empty profile for them in DynamoDB
        users_table.put_item(
            Item={
                'user_id': username,
                'name': username,
                'bio': "I'm new to Hey!",
                'avatar': f"https://ui-avatars.com/api/?name={username}&background=random",
                'followers': 0,
                'following': 0
            }
        )
        
        return {"status": "SUCCESS", "message": "User created in Cognito and DynamoDB!"}
        
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

def login(username, password):
    """
    Step 3: Authenticate against Amazon Cognito and get a JWT token.
    """
    try:
        response = cognito.initiate_auth(
            ClientId=COGNITO_CLIENT_ID,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password
            }
        )
        
        # This token is what the React app will save and send with future requests
        access_token = response['AuthenticationResult']['AccessToken']
        
        return {"status": "SUCCESS", "token": access_token}
        
    except cognito.exceptions.NotAuthorizedException:
        return {"status": "ERROR", "message": "Incorrect username or password"}
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

def handler(event, context):
    """
    This is the main entry point that API Gateway will call.
    """
    # Parse the HTTP request body from the frontend
    body = json.loads(event.get('body', '{}'))
    action = event.get('pathParameters', {}).get('action') # e.g., /auth/login or /auth/signup
    
    if action == 'signup':
        result = sign_up(body['username'], body['password'], body['email'])
    elif action == 'login':
        result = login(body['username'], body['password'])
    else:
        result = {"status": "ERROR", "message": "Unknown action"}
        
    return {
        'statusCode': 200 if result['status'] == 'SUCCESS' else 400,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result)
    }
