# She Sync- backend!
## Andrea E
*1/28/26*

### Install Instructions

### Planning
In the design phase I have already designed 4 iterations of one design and one iteration of another. I am done designing but think there was a better way to streamline the User Flow so that I could use less screens. However I do think because so much of my designs I designed to be re-used as either components, or have the same style that will allow me to cut down on time when it comes to design and styling.
Here is my current design flow: ![Hifi Design Screens](HIfi.png)

#### Project Details
1. Features:
    - Task management by Projects
    - Delete Tasks
    - Create Tasks
    - Project toggle
    - Music toggle
    - Task status management
    - Updates (need to think more about what updates, like edit the task, edit the due date?)
2. CRUD On:
   - Full CRUD on Projects
   - Full CRUD on Tasks
   - Users will have login, register and logout(end session)
   
3. The requirements are to have full CRUD on at least 2 models, I think it would make more sense for me to do that on tasks and for projects, I initially thought about doing it for Users but the screens I projected to have would not make sense, and while I am planning it would make sense to reuse a lot of the same language because each route needs to be protected and utilize authorization checks. I took some time planning and making tighter more thorough schema for my user model!
Did some research on why Next always gives me errors and I believe it is because I send a response and call next function as well and thats why it always gives me the middlware is not a function error. So I will be keen on that.

### Resources:
- [Oauth](https://www.youtube.com/watch?v=sakQbeRjgwg)
- [CORS](https://perscholas.instructure.com/courses/2978/pages/module-16-unifying-user-interfaces-with-web-applications)
- [CORS](https://pscohorts.slack.com/archives/C09JJPM4760/p1769542731678199)
- [Next.js](https://nextjs.org/docs/app/guides/backend-for-frontend)
- [Authorization and headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization)
- [useAuthHeader](https://authkit.arkadip.dev/reference/react-auth-kit/hooks/useAuthHeader/)
- [Auth header example](https://www.guvi.in/blog/protecting-routes-with-jwt-middleware-in-node-js/?utm_source=chatgpt.com)
- [Route logout](https://www.youtube.com/watch?v=ywvrRC6-W-U)