## maccooper.dev

Personal portfolio. Built as a mock of a service — pulling the repo and running any command shown in the terminal hero should work as displayed.

Prototyped in Next.js/React. The design landed, the stack didn't — serving a static page through a node build pipeline made no sense. Rebuilt in vanilla HTML/CSS/JS.

The terminal hero is a finite state machine in JavaScript. Five phases: `static`, `cmd`, `typing`, `pausing`, `deleting`. Static lines commit one by one, then a jq command types out, then project descriptions cycle from `projects.json`. Each phase is an isolated handler dispatched through a table — same pattern as a lexer.

I think embracing new layers of abstraction matters, but so does being willing to dive in, clean up, and own what they produce. Leaning on tooling without understanding it is how code quietly rots.

#### interests

algorithms, systems programming, game engines, graphics, security, compilers
