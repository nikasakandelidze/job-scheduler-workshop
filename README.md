# Job Scheduler
This workshop project uses node-cron npm package to implement basic periodic health-check mechanism 
for two simple services using healthCheck endpoints of them.

# setup
There are 3 services placed in project.
1) scheduler - core service for scheduling jobs using cron library
2) simple admin service with one healthcheck endpoint
3) simple user service with one healthcheck endpoint

# Use cases
Use cases: scheduler service has one endpoint which takes service tag ( just like service registry ) 
as path parameter. These values for service rags are at the moment hard coded: user and admin ( for according services ).
