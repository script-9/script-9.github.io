## GOALS

- 1. 100% lighthouse score
- 2. PWA
- 3. user should be 100% aware of every network interaction

## TODO

- Tell user about every interaction
- Show offline cassettes in SHELF
- When clicking an offline cassette from SHELF, load it
- Test:
  - go offline, create new, save (this is #1)
  - make changes, undo changes, check isDirty
  - create a new one, save (this is #2)
  - then go online and load #1
  - now save
  - go offline, save
  - load #2, edit, save
  - go online, load #1, save
