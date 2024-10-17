# AWS Serverless Image Recognition

This project is a simple example to how to use AWS Rekognition and Translate services, using AWS Lambda.

## Requirements

To run this project you need to setup the following tools:

- [AWS CLI](https://aws.amazon.com/pt/cli/)
- [Node.js](https://nodejs.org/pt)

## Installation 

Follow these instructions to run this project:

```
corepack enable
```

install dependencies

```
yarn install
```

run locally

```
yarn dev
```

to test you can send a image url into a query string param in this format:

```
http://localhost:3000/recognize-image?imageUrl=url
```

replace the value of a imageUrl param with a image url.

### Observation

This project uses the AWS Rekognition and Translate services, make sure to you have free access to test this services, to do not have to pay.