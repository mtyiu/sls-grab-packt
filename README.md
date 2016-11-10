# Grab a free eBook from Packt every day using AWS Lambda & Serverless

This microservice grabs a free eBook from Packt every day. It relies on the AWS Lambda service and Serverless 1.0 for deployment.

Steps of deploying the service:

1. Install Serverless 1.0: `npm install serverless -g`
2. Clone this repository: `git clone git@github.com:mtyiu/sls-grab-packt.git`
3. Install all dependencies: `npm install`
4. Put your Packt login credentials in `.env`
5. Deploy the service: `serverless deploy`

Then the service will be executed daily, and the free e-Book will be grabbed to your Packt account.

---

By Matt YIU, Man Tung (https://mtyiu.github.io/)
Inspired by https://github.com/draconar/grab_packt
