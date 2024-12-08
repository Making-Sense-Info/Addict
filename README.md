# Addict

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A DDI catalog tool.

## Resources

[DDI resources](./resources/README.md)

## Application

[Source code](./app/README.md)

## Addict DDI support

### DDI object list

- [x] Category
- [x] Category Scheme
- [X] Code
- [X] CodeList
- [X] CodeListScheme
- [ ] QuestionItem
- [ ] Questionnaire
- [x] Variable
- [x] Variable Scheme

### DDI object links

- Category Scheme:
    - [x] `Contains` Category
- Category:
    - [x] `Contained by` Category Scheme
- Variable Scheme:
    - [x] `Contains` Variable
- Variable:
    - [x] `Contained by` Variable Scheme
- Code list Scheme:
    - [x] `Contains` Code list
- Code list:
    - [x] `Contained by` Code list Scheme
- Code list:
    - [x] `Contains` Code
- Code:
    - [x] `Contained by` Code list
- TODO