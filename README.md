# Ecommerce Asynchronous Microsevices with Node, Docker and Nginx
1. What is a Microservice
2. How do we make one?
3. How do we make them work together?

## Notes (Opinionated)
This project intended to fulfill my thesis, use this projcet wisely

People will tell you that you can do it at small scale and it is true
but you can also remove ants with a nuclear bomb.

Docker containers can be used without using Microservices, they are not the 
same thing!

This is the most common way I see people build container based projects
but my personal favourite is using a queue for all container to container
communication.

## Rule of thumb thoughts (Opinionated)
Docker containers = good for almost all project sizes
Microservices = good for big companies with a lot of code and people
Sweetspot = Monolith app and databases in containers