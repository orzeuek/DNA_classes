# example of quality metric

"up time" - how to define and measure it?
up time = user is able to walk through basic happy paths wihout errors.
happy paths are:
- buy single ticket with card and e-ticket delivery
- buy return ticket with PayPal and ToD delivery
- buy single ticket with HRP
- buy single ticket with HRP + card
- buy return ticket with HRP + PayPal

Set up automated test which will walk every path and report result as a prometheus metric.
Metric should be visualized as a graph, each for every path and one general one.

# example of debt metric

Max (or p95 - to agree)  response time of each endpoint used in happy paths must be below 5 sec.

# example of combined metric

Driver: time between payment suceeded and "ticket fulfilment notification" must be <30 sec.
We can decrease time (or keep it below that value) but cost of infrastructure will rise.
We will need some additional "watch" mechanizms (which are not free) to keep an eye on queue size
and more container instances to speed up consumption.
