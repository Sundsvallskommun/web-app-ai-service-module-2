# Service AI assistant for Sundsvalls kommun.

Built using React + TypeScript + Vite.

This is an assistant that can be placed whereever you want it.  
Stand-alone - or embedded on your site.

Most settings are done in your env-files.  
Some settings are done in your html embedding.

The application is embedded like this

```
  <div
    id="sk-service-assistant" //Needs to be sk-service-assistant
    data-shadow="true" //If you want to use shadow dom (recommended if not standalone)
    data-assistant="" //Id of your assistant. Can be set from .env
    data-hash="" //Hash for your assistant. Can be set from .env
    data-user="" //User for your assistant. Can be set from .env
  ></div>
```

You can add additional info into the assistant like this:

```
  <div
    id="sk-service-assistant" //Needs to be sk-service-assistant
  >
    <p>This is my additional info</p>
    <ul>
        <li>With a list</li>
    </ul>
  </div>
```

- Installation

Run `yarn install`

- For development

Decide on an application name, for example MY_ASSISTANT, and create an env file named .env.MY_ASSISTANT.local base on the .env.example file.

Create an index.html based on the index.html.example template.

To start the development server, run `yarn dev --mode=MY_ASSISTANT` so that the corresponding env file is used.

- Deployment

To build for production, run `yarn build` in order to build.
This will copy the build to the sitevision webapp source.
