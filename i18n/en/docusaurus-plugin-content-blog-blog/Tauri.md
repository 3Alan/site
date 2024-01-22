---
draft: true
summary: >-
  - Abstracted a flask service + tauri as a scaffold, so that the flask process
  is automatically killed when closed.


  - appData and appLocalData in Windows OS are two folder path constants
  representing the application data folder (Roaming) and the local application
  data folder (Local) of the current user respectively.


  - Roaming is used to store user-specific data of the application, such as
  personal settings and custom options, and is synchronized across multiple
  computers.


  - Local is used to store local data of the application, such as cache files
  and other temporary files, and is not synchronized across multiple computers.


  - In general, Roaming is used to store user data that needs to be synchronized
  across multiple computers, while Local is used to store local data.
ai_translation: true
---

Record the pits

- Abstracted into a flask service + tauri scaffold
- Kill the flask process when closed

## Difference between appData and appLocalData

FOLDERID_RoamingAppData(dataDir) and FOLDERID_LocalAppData(localDataDir) are two folder path constants in Windows OS representing the application data folder (Roaming) and the local application data folder (Local) of the current user respectively.

The specific differences are as follows:

Roaming: This folder is used to store user-specific data of the application, such as personal settings and custom options. This data is synchronized across multiple computers as the user logs in, so if a user changes the application settings on one computer, the changes will automatically take effect in the application on other computers.

Local: This folder is used to store local data of the application, such as cache files and other temporary files. This data is not synchronized across multiple computers as the user logs in, so if a user changes the application settings on one computer, the changes will not automatically take effect in the application on other computers.

In general, the Roaming folder is used to store user data that needs to be synchronized across multiple computers, while the Local folder is used to store local data, such as cache files and other temporary files.
