## TUGBoilerplate

Boilerplate for future node projects

## Folder Structure

```plaintext
├── config
│   └── config.js
├── ecosystem.config.js
├── index.js
├── package.json
├── public
│   ├── css
│   ├── img
│   └── js
├── README.md
└── src
    ├── app.js								App file - called by index.js, Express.js features
    ├── models								CORE models - one per js file
    ├── modules								CORE modules for loading core features
    ├── plugins								Plugins folder (duplicate filename override core files)
    │   ├── plugins.json					File for storing what plugins are enabled
    │   └── pluginName						Plugin root folder
    │       ├── index.js					Plugin main script (enable, load, unload, disable)
    │       ├── models						Model files - one file per sequelize model
    │       ├── routes						Routes folder
    │       └── views						Views folder
    │           ├── panel.ejs				Panel/App/Admin view
    │           ├── panels					Panels to load into the app containers
    │           └── parts					Parts to inject into other files
    │               ├── footer.ejs
    │               ├── head.ejs
    │               └── header.ejs
    ├── routes								Routes Folder
    ├── sass								CORE sass files
    ├── sockets								CORE sockets
    ├── themes
    │   ├── default
    │   │   ├── assets
    │   │   │   └── css
    │   │   │       ├── styles.css
    │   │   │       └── styles.scss
    │   │   ├── default.json
    │   │   ├── emails
    │   │   │   └── basic.ejs
    │   │   ├── panel
    │   │   │   └── views
    │   │   │       └── index.ejs
    │   │   └── site
    │   │       └── views
    │   │           ├── 20229ballEntries.ejs
    │   │           ├── entries.ejs
    │   │           ├── fundayForm.ejs
    │   │           ├── index.ejs
    │   │           ├── parts
    │   │           │   ├── footer.ejs
    │   │           │   ├── header.ejs
    │   │           │   └── xhead.ejs
    │   │           └── refundForm.ejs
    │   └── themes.json
    └── views
        ├── core-parts
        │   ├── core-foot.ejs
        │   └── core-head.ejs
        ├── emails
        │   └── basic.ejs
        └── parts
            └── front
                ├── footer.ejs
                ├── head.ejs
                └── header.ejs
```