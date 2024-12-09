# Addict

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A DDI catalog tool.

## Motivations

Addict is a React TS proof of concept to visualize DDI resources.

It's entirely client side, based on Github files, configurable through environment variables (see [here](./app/.env)).

Addict will display folders and files stored in `resources` folder.

### Interested in the project?

You can provide pull request [here](https://github.com/Making-Sense-Info/Addict/pulls) to add your resources, or connect your own Github repository to the app (_To greatly increase Github API rate limit, it is advisable to define a GITHUB_TOKEN._).

If you encounter any problems, if you have great ideas, you can write an issue [here](https://github.com/Making-Sense-Info/Addict/issues).

## Repository resources

[DDI resources](./resources)

## Addict application

[Source code](./app)

### DDI support

The current version of Addict supports the following objects and links:

```mermaid
classDiagram

class DDIInstance {
URN
label
}
class QuestionScheme {
URN
label
}
class QuestionItem {
URN
label
}
class CodeListScheme {
URN
label
}
class CodeList {
URN
label
}
class Code {
URN
value
}
class VariableScheme {
URN
label
}
class Variable {
URN
label
}
class CategoryScheme {
URN
label
}
class Category {
URN
label
}

DDIInstance --> "*"  QuestionScheme : contains
QuestionScheme --> "*" DDIInstance  : containedIn

DDIInstance --> "*" CodeListScheme : contains
CodeListScheme --> "*" DDIInstance  : containedIn

DDIInstance --> "*" VariableScheme : contains
VariableScheme --> "*" DDIInstance  : containedIn

DDIInstance --> "*" CategoryScheme : contains
CategoryScheme --> "*" DDIInstance  : containedIn

QuestionScheme --> "*"  QuestionItem : contains
QuestionItem --> "*"  QuestionScheme : containedIn

CodeListScheme --> "*" CodeList : contains
CodeList --> "*" CodeListScheme : containedIn

CodeList --> "*" Code : contains
Code --> "*" CodeList : containedIn

VariableScheme --> "*" Variable : contains
Variable --> "*" VariableScheme : containedIn

CategoryScheme --> "*" Category : contains
Category --> "*" CategoryScheme : containedIn

CodeList "*" <-- QuestionItem : uses
QuestionItem "*" <-- CodeList : usedIn

Category "*" <-- Code : uses
Code "*" <-- Category : usedIn
```