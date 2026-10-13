---
title: "Prep 6: Cookies and Sessions"
categories: preps
due_date: 2026-10-15 10:00:00 -0400
order: 6
---

**Due:** Thursday, October 15th, 10am\
**Submission:** On [Commons](https://class.mit-sdg.dev/)

## Overview

HTTP requests are stateless: by default, a server does not remember which requests came from the same user. **Cookies** let a browser store small pieces of data and send them automatically with subsequent requests to the same site. Servers can use cookies to create **sessions** that associate requests with a user, usually by storing a session ID on the client that matches one in the server database.

Since cookies are stored on the client, we can work with them in dev tools.

In this prep, you will inspect cookies in your browser and use `curl` to make an authenticated request to Commons without sending your password.

## Part 1: Inspecting cookies

1. **Open [httpbin.org/cookies](https://httpbin.org/cookies) in your browser.** You should see a JSON object listing no cookies.

2. **Set a cookie.** Go to [httpbin.org/cookies/set?hello=world](https://httpbin.org/cookies/set?hello=world). This
   will send the cookie `hello=world` to your browser. (You can change the
   query parameters in the URL to add more cookies.)

3. **Inspect the network requests.** Open your browser's developer tools and find the **Network** tab. Reload the page if necessary (you may have to enter the URL query parameters again if you were redirected to `/cookies`). Click through the requests and inspect the Headers and Cookies tabs. You should see your cookie in the `Set-Cookie` field of the response headers of the `set` endpoint and in the `Cookie` field of the request headers of the `cookies` endpoint.

4. **Locate the cookie in browser storage.** In developer tools, open **Application → Cookies** in Chrome, or **Storage → Cookies** in Firefox. You should see the cookies you set.

5. **Change the cookie.** While still inspecting the storage at [httpbin.org/cookies](https://httpbin.org/cookies),
   double click to edit one of the stored cookies (the name or the value) and refresh
   the page to see it take effect.

## Part 2: Authentication

1. Log into [Commons](https://class.mit-sdg.dev/).

2. **Obtain your session cookie.** Open developer tools and navigate once again to cookie storage.  Find the cookie named `__Host-commons-session`. Copy its value somewhere temporary.

<span class="emphasize">**Important:** Treat this value like a password:
_do not_ commit your cookie to Git, _do not_ include it in your prep submission, and _do not_ share it with anyone.
Anyone who obtains a valid session cookie may be able to access your
account.</span>
Now we will see that in action.

3. **Make an API request.**
   Open your terminal. Run the following command.

   <details>
   <summary>Note for Windows users</summary>
   <p>This command may not work in Command Prompt or Powershell. You can use <a href="https://learn.microsoft.com/en-us/windows/wsl/install">WSL</a> to emulate bash on Windows.</p>
   </details>


```sh
curl -i https://class.mit-sdg.dev/api/auth/me \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'Origin: https://class.mit-sdg.dev' \
    -d '{}'
```

   You should get an authorization failure. That's because there is nothing in
   this request telling the server who you are! Let's fix that.

4. **Add the cookie to the request.**
   Replace `YOUR_COOKIE_VALUE_HERE` in the command below with the cookie value you copied.

```sh
curl -i https://class.mit-sdg.dev/api/auth/me \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'Origin: https://class.mit-sdg.dev' \
    --cookie '__Host-commons-session=YOUR_COOKIE_VALUE_HERE' \
    -d '{}'
```

   Inspect the response. You should see a JSON object listing your own profile
   data.

## Part 3: Submission
1. In your private repo, create a Markdown file named `prep-6.md`.
2. Run the following command, which requires cookie authorization but the
   result of which does not contain private information. Again, paste your
   cookie value.

```sh
curl https://class.mit-sdg.dev/api/roster/class \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'Origin: https://class.mit-sdg.dev' \
    --cookie '__Host-commons-session=YOUR_COOKIE_VALUE_HERE' \
    -d '{}'
```

3. Paste the resulting JSON in the Markdown file.
4. Commit and push to your repo and submit the commit URL on Commons.
5. <span class="emphasize">**Important security step:** Log out of Commons and log back in to refresh your session ID.</span>

<span class="emphasize">**Never include your session cookie or a command containing its value in your submission.** Do not include a screenshot or terminal output that exposes the cookie.</span>

<style>
span.emphasize { color: var(--accent-red-light); }
</style>
