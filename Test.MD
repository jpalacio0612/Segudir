## Intent

The intent of this challenge is to get a sense of how do you solve certain architectural and design problems, and how well do you document and test your work.

## The Challenge

Design an implement a subset of a React UI library. The library should also support themes and provide a default one, allowing the clients to write their own custom themes and to override existing ones.
Also, as part of this challenge, you should build a demo application showcasing each component’s features, sample code and usage documentation.

## Components to design and implement

- Button
- Input Text
- Input Number Allows only numbers, and formats them
- Select Input
  It should allow single and multiple selection
- Autocomplete
  It should work independently of the data source (being a REST api, or an IndexedDB for example)

Each component should have a set of unit tests covering each feature / behavior.
The demo app should have a README describing how to install its dependencies, build, and run.
Use redux as state manager for the demo app and react-router for page routing.

## Real World Examples for Inspiration

Ant Design, Material Ui (editado)

Componentes reutilizables.
styled components-- theme provider.
objeto con estructura del tema.. llave primaria etc... pasarlo al theme provider
Crear una aplicación demo.
Documentacion en el ReadMe --- Como instalar las dependencias. etc...
