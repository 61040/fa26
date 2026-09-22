---
title: "Prep 3: HTTP and REST"
categories: preps
due_date: 2026-09-24 10:00:00 -0400
order: 3
---

**Due:** Thursday, September 24th, 10am

In this prep, you will use curl in your terminal to send HTTP requests and observe how headers and request bodies work. We will then use a REST playground to examine what these endpoints do on the server side.

## Part 1: HTTP

For part 1, we will use [httpbin.org](https://httpbin.org). httpbin is an open source web service with available endpoints that can be used to test HTTP requests verifying your client is sending desired payloads. There is no database, the server simply sends back the payload the CLIENT sends.

If HTTP requests and error codes are entirely new to you, you can review from [6.102](https://web.mit.edu/6.102/www/sp26/classes/18-message-passing-networking/#web_apis). If you want a more thorough reading, [see here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview).

### Task 0. Open your Terminal (Command Prompt on Windows)

### Task 1. Send a GET with headers

Run the following command to make a GET request and view the response status code and headers (`-i` includes the HTTP response headers, `-X GET` sets the method):

```sh
curl -i -X GET "https://httpbin.org/get?user=student"
```

Find the first line of the output. Notice the status code: HTTP/2 200, meaning OK.

Look at the JSON body and note how `"user" : "student"` was parsed under `"args"`.

### Task 2. Send a POST with data.

Run the following command to send a POST request with a JSON payload (`-H` sets the request header, `-d` passes the body). Note that “Content-Type” specifies to the server how to parse the input data.

```sh
curl -i -X POST "https://httpbin.org/post" \
  -H "Content-Type: application/json" \
  -d '{"task": "prep", "completed": true}'
```

Verify the status code on line 1 is 200 (OK).

Look at the returned JSON body: note the `"json"` field being returned matches what you inputted.

### Task 3. Inspect error codes

Run this command to request an endpoint configured to return an error:

```sh
curl -i "https://httpbin.org/status/404"
```

Check the first line: verify the status code is 404 NOT FOUND. When a requested resource is not available OR the endpoint itself doesn’t exist, this is the error you will see.

## Part 2: REST

Open [petstore.swagger.io](https://petstore.swagger.io) in your browser. This is an interactive REST interface organized by resources (`/pet`, `/store`, `/user`).

Pick a unique integer to use as your pet's ID throughout this section (e.g., 123).

### Task 4. GET a resource

Scroll to the pet section, expand the `GET /pet/{petId}` row, and click *Try it out*.

In the petId field, type your chosen ID number and click *Execute*.

Scroll down to the Responses panel and notice the response code: 404

### Task 5. PUT a new resource

Expand the `PUT /pet` row
Click *Try it out*
In the response body, replace the sample JSON with:

```json
{
  "id": YOUR_ID_NUMBER,
  "name": "Tim_The_Beaver",
  "status": "available"
}
```

Click *Execute* and verify the response code is 200

### Task 6. GET a resource (part 2)

Go back to `GET /pet/{petId}` and click *Try it out* again. 

Enter your same ID number and click *Execute*. 

Verify server response code is 200 AND the response body JSON contains “Tim_The_Beaver”

## Submission

In your class repository, create a markdown file named `prep-3.md`. Answer these three questions based on your terminal output from the previous tasks.

a. In Task 1, what was the exact value of the content-type response header?

b. In Task 2, under what key in the returned JSON body did your `{"task": "prep", "completed": true}` appear?

c. Run `curl -i "https://httpbin.org/status/418"` in your terminal. What ascii art is returned? (You might be interested in: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418))

d. In Task 4, why did the server return a 404, whereas in Task 6 the exact same request yielded a 200?

e. Attach a screenshot of your JSON response from Task 6

Commit and push `prep-http.md` to your repo.
