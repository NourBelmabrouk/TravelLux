# TRAVLUX

TRAVLUX offers:
- a baggage collection and delivery service.
- a home check-in service that speeds up the airport process.
- a vehicle rental service

![front](https://user-images.githubusercontent.com/62619786/212910563-b6a336ea-a088-403d-858c-01b978b6424b.png)

> **Note**
> You can find the infrastructure repository [here](https://github.com/NourBelmabrouk/TravelLux_infra).

## Application
Microservices: 
- __Frontend:__ Implemented with Angular. 
- __Backend:__ 
- __Booking Service:__ 
- __Database:__ We use MySQLfor our database.

## Workflow

![workflow](https://user-images.githubusercontent.com/62619786/212779694-e3e9110a-db75-4d6a-81ea-cdd28f572b78.png)


## Docker
We dockerized the microservices and pushed to Dockerhub.

## Observability
In this part, we will focus on the three pillars of Observability (logging, metrics and traces) in one microservice: __booking-service__.

![observability](https://user-images.githubusercontent.com/62619786/212779731-d0634df5-159f-4eab-8d70-034a3e518651.PNG)

### 0. Dashboarding - Grafana
We used Grafana to centralize the analysis and visualization of our data. We created 2 dashboard:
- __Metrics:__

![metrics](https://user-images.githubusercontent.com/62619786/212911227-60f347d8-348b-45e1-ba5b-120acba60dc5.png)

- __Logs:__

![logs](https://user-images.githubusercontent.com/62619786/212911340-85af592b-d0d3-47ce-b458-e35f559461bc.png)

### 1. Metrics - Prometheus 
We used ``@willsoto/nestjs-prometheus`` module which exposes metrics to be pulled by __Prometheus__. It also captures different metrics from the code, such as: CPU usage, Memory usage and so on.

We added a custom metric which is http_request_total, that allow us to track how many request we are processing (create/update/delete of a booking order).
The metric is labeled in a way that allows you to get the success ratio (% of successful requests) and to know many requests each http route processed (post, get, ...):

![metrics get post](https://user-images.githubusercontent.com/62619786/212911694-6ea78a4a-8f95-4e96-834d-a615ce3ff0a3.png)

### 2. Logs - Loki 
We used __Loki__, which is a log aggregation system designed to store and query logs from all your applications and infrastructure.
We added the ``request_id``, the ``ip_address`` and the ``statusCode`` in every log so that it can help us while debugging.

![logs id](https://user-images.githubusercontent.com/62619786/212911657-90c8565b-2308-4687-8828-825da2f7055b.png)

### 3. Traces - Jaeger 