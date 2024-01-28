---
draft: true
summary: >-
  - Wrap Flask service and Tauri into a boilerplate so that the Flask process is
  killed automatically when closed.

  - The appData and appLocalData in Windows operating system are two folder path
  constants, representing the application data folder (Roaming) and the local
  application data folder (Local) respectively.

  - Roaming is used to store user-specific data, such as personal settings and
  custom options, and synchronize them between multiple computers.

  - Local is used to store local data, such as cache files and other temporary
  files, which are not synchronized between multiple computers.

  - In general, Roaming is used to store user data that needs to be synchronized
  between multiple computers, while Local is used to store local data.
ai_translation: true
---

Record information about pitfalls encountered

- Abstract into a Flask service + Tauri boilerplate
- Kill the Flask process on closing

## Difference between appData and appLocalData

FOLDERID_RoamingAppData (dataDir) and FOLDERID_LocalAppData (localDataDir) are two folder path constants in Windows operating system, representing the current user's application data folder (Roaming) and the local application data folder (Local) respectively.

The specific differences are as follows:

Roaming: This folder is used to store user-specific data of the application, such as personal settings and custom options. These data will be automatically synchronized between multiple computers when the user logs in. Therefore, if the user changes the application settings on one computer, these changes will take effect automatically in the application on other computers.

Local: This folder is used to store local data of the application, such as cache files and other temporary files. These data are not synchronized between multiple computers when the user logs in. Therefore, if the user changes the application settings on one computer, these changes will not automatically take effect in the application on other computers.

In general, the Roaming folder is used to store user data that needs to be synchronized between multiple computers, while the Local folder is used to store local data, such as cache files and other temporary files.
