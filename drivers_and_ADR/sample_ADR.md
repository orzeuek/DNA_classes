# Make refund process truly asynchronous 

## Context
Refund process use couple external systems to process refund (AWT, eTVD, payment gateways, NRS etc). 
In case of high traffic, refund process can take couple of minutes. 
We faced that for HEX, our system was highly loaded and AWT was processing LENNON update couple minutes. 
That caused timeout at „create refund” endpoint, response had 504 HTTP status, API client didn’t 
receive refund id so it was quite problematic to trace refund process.

Crrent implementation of refund-service is based on CQRS pattern which "by nature" is asynchronous.
However, underlying code and infrastructure is synchronous (in memory queue and event bus).
We don't really want to change process itself. Goal is to make it more resiliant for long running
steps, and guarantee that API client will receive id he can refer to and check status.

## Decision
1.    replace „internal queue” (in memory) in refund service with „external queue” (AWS SQS) to make it truly asynchronous
1a.   set up queue via terraform
2.    change current implementation of event bus to be able to operate as a separate process with external queues handling
3.    extract queue messages consumer to separate task definition to be able to scale it up and down separately to HTTP service (refund service)
3a.   *optional* introduce some scaling mechanizm which will react for queue size (if queue massages count is rising add consumer instance). This should be not refund service specific, it should be use for all queues
4.    introduce option to get noticed when refund is done.
      Add some „callback” parameter to „create refund” endpoint. It will be call as a reaction to „refund complete” event.

status: approved but not implemented.

## Consequences
We have to make sure that all API Clients understand that async concept and have it implemented correctly.
Some additional complexity will probably grow around testing that solution.

## Other solution proposals
Nothing really... 
Extending timeouts? that's bad idea.


