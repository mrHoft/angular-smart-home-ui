# AngularSmartHomeUi
<div align="center">

![angular](https://badge-service.deno.dev/plain?title=angular&icon=angular&value=20.1)

</div>

Smart Home UI is an application for monitoring and controlling smart devices within a home environment. It offers a structured and interactive layout that allows users to:

- Monitor temperature, humidity, weather conditions, electricity usage, and other sensor data
- Control lights, sockets, relays, and switches
- View a unified dashboard composed of device and sensor cards grouped by rooms or functional areas

The interface adapts to various room configurations and device combinations, providing a flexible and user-friendly experience.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Commands
Command | Description
--- | ---
`npm start` | Start application on 3000 port.
`npm build` | Compile project and store the bundle in the `dist/` directory.
`npm run test` | Execute unit tests with the [Karma](https://karma-runner.github.io) test runner.
`npm run lint` | Run eslint checks.

## Project structure
```markdown
src/
  ├── main.ts            # Angular app entry point
  ├── api/               # Api folder
  └── app/
      ├── app.ts         # Angular app main file
      ├── app.routes.ts  # Router routes
      ├── components/    # Angular components
      ├── entity/
      |   ├── directives # Angular directives
      |   ├── pipes      # Angular pipes
      |   └── services   # Angular services
      └── pages/         # Router pages
```
