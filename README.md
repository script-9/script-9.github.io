## GOALS

- 1. 100% lighthouse score
- 2. PWA and serviceworker (learn what these mean!)
- 3. user should be 100% aware of every network interaction
- 4. optimize for SEO / google console crawling index

## TODO

- learn what PWA means and how to enable it
- deploy to gh-pages and see if https/2 is enabled there
- try to get 100 lighthouse

### Questions

- What happens when user creates a new cassette and tries to save, in offline mode?
- What happens to the cassette when we get online mode?
- What happens when an existing cassette goes through multiple edit+and+save operations, in offline mode?
- What happens to the cassette when we get online mode?

- In the case of a new cassette, if we try to save but we're offline, we can give it a uuid and associate all its network requests with the uuid. Then, when we get online mode back, we fire off the network requests, and deal with any responses.
