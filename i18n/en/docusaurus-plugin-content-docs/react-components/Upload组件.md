---
slug: upload
title: React Upload Component
date: 2022-01-10T22:31:58.000Z
tags:
  - React
  - Component Library
  - Upload
categories:
  - Front-end
  - React
keywords:
  - react component library
  - Upload component
  - react upload component
  - react drag and drop upload
description: >-
  React Upload component, including normal upload, drag and drop upload, and
  upload progress.
sidebar_label: Upload Component
sidebar_position: 2
summary: >-
  1. The Upload component is used to upload files, can display the file upload
  status, and supports controlled/uncontrolled components and drag and drop
  upload.

  2. The component processes files through the `beforeUpload` lifecycle
  function, and can interrupt the upload based on the file size.

  3. File upload is monitored by `XMLHttpRequest.upload.progress` or `axios`'s
  `onUploadProgress` for upload progress.

  4. The file list display uses the properties of `internalFileList`, such as
  `percent`, `status`, etc.

  5. The component notifies the parent component of the file upload status and
  file list through the `onChange` callback.
ai_translation: true
---

The following code has removed most of the code that is irrelevant to the main line.

## Preview the Effect

- [Preview Effect](https://alan-ui.alanwang.site/?path=/docs/components-upload--text-list)
- [Upload Source Code](https://github.com/3Alan/alan-ui)

## Demand Analysis

- Upload files
- Display file upload status (success/failure/uploading)
- Controlled/uncontrolled components
- Drag and drop upload

## Exposed API

```ts
export interface UploadProps {
  // The server address corresponding to the file to be uploaded
  action?: string;
  fileList?: UploadFile[];
  onChange?: (e: OnChangeEvent) => void;
  /** Returning false will interrupt the upload */
  beforeUpload?: (fileList: File[]) => File[] | Promise<File[]> | boolean;
}
```

## Basic Code

Use the original `input` directly to achieve

```js
const onChange = e => {
  // This is the File object to be uploaded
  console.log(e.target.files[0]);
};

<input type="file" onChange={onChange} />;
```

And add the File object to FormData and finally send it to the server.

```js
const formData = new FormData();

// file is the file object obtained through input above
formData.append('file name', file);
```

Finally send it to the server

```js
axios.post(url, formData);
```

In fact, the above code is basically the core code, except that we need to穿插some other status management in the middle, such as customizing the style of input, adding upload progress, etc...

## Customizing the Element that Triggers input

First hide the original input through `display: none`, then get input through ref, and trigger the click event of input on the element that needs to be bound.

```tsx
const inputRef = useRef<HTMLInputElement>(null);
const onOpenResource = (e: MouseEvent) => {
  e.stopPropagation();
  if (inputRef.current) {
    inputRef.current.click();
  }
};

<div onClick={onOpenResource}>
  <input
    ref={inputRef}
    type="file"
    accept={accept}
    onChange={onInternalChange}
    multiple={multiple}
    disabled={disabled}
  />
  {children}
</div>;
```

## Drag and Drop Upload

It is almost the same as the normal click upload, except that the `File` object is obtained through `e.dataTransfer.files`.

## Status Management

We maintain an `fileList` internally in the component, and add a series of states to it

```ts
const [internalFileList, setInternalFileList] = useState([]);
```

Properties included in `internalFileList`

```ts
export interface UploadFile {
  // File name
  name?: string;
  // Unique file id
  uid?: string;
  // Current file status (uploading,done,error,removed,canceled)
  status?: string;
  // The image address returned by the server after the upload is successful
  url?: string;
  // Upload progress
  percent?: number;
  // Original file object, which is the object to be uploaded finally
  rawFile?: File;
}
```

## updateStatus Method

Later, this method will be used many times. In fact, it is an operation that finds the corresponding item through uid, modifies its properties and calls `onChange`

```ts
const updateStatus = (
  currentTask: UploadFile,
  info: { status?: string; url?: string | ArrayBuffer; percent?: number }
) => {
  let newFileList: UploadFile[] = [];
  let currentFile = {};

  setInternalFileList(prev => {
    newFileList = prev.map(task => {
      if (task.uid !== currentTask.uid) return task;

      currentFile = {
        ...task,
        name: currentTask.rawFile?.name,
        uid: currentTask.uid,
        ...info
      };
      return currentFile;
    });
    return newFileList;
  });

  onChange?.({
    file: { ...currentFile, rawFile: currentTask.rawFile },
    fileList: newFileList
  });
};
```

## Component Lifecycle beforeUpload

Let's look at the code first

```ts
// Called in onChange, passing the files obtained in input as parameters
const handleUploadTasks = async (files: File[]) => {
  let handledFiles = files;
  if (beforeUpload) {
    const shouldUpload = await beforeUpload(files);
    if (shouldUpload) {
      handledFiles = shouldUpload as File[];
    } else {
      // This variable is used to determine whether to interrupt when the request is actually sent
      shouldUploadRef.current = false;
    }
  }

  // Add status to the List after beforeUpload is processed
  const newTasks: UploadFile[] = handledFiles.map(file => ({
    uid: getUid(),
    status: UploadStatus.UPLOADING,
    name: file.name,
    rawFile: file
  }));

  setInternalFileList(prev => [...prev, ...newTasks]);

  // Upload operation, which will be introduced below
  await upload(newTasks);
};
```

```ts
/** Returning false will interrupt the upload */
beforeUpload?: (fileList: File[]) => File[] | Promise<File[]> | boolean;
```

This lifecycle will pass the files currently selected by the user as parameters, and the user can return a new file list or return false. This is very useful in scenarios where the upload operation needs to be interrupted based on the file size.

## File Upload

```ts
const upload = async (tasks: UploadFile[]) => {
  // Interrupt processing when beforeUpload lifecycle returns false
  if (!shouldUploadRef.current) {
    tasks.map(async currentTask => {
      // Update the internal status to canceled and interrupt the upload
      updateStatus(currentTask, { status: UploadStatus.CANCELED, url: '' });
    });
    return;
  }

  await Promise.all(
    tasks.map(async currentTask => {
      try {
        // Make a post request
        const result = await post(currentTask);
        // Update the internal status to done
        updateStatus(currentTask, {
          status: UploadStatus.DONE,
          url: result.url
        });
        alert(`${currentTask.rawFile?.name} success!`);
      } catch (e) {
        // Update the internal status to error
        updateStatus(currentTask, { status: UploadStatus.ERROR, url: '' });
        alert(`${currentTask.rawFile?.name} failed!`);
        throw e;
      }
    })
  ).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};
```

The post function is very simple, which is the formData operation mentioned above

```ts
const post = async (currentTask: UploadFile): Promise<ResponseData> => {
  const formData = new FormData();
  const { rawFile } = currentTask;

  formData.append(rawFile.name, rawFile);

  const res = await axios.post(action, formData);
  return res.data;
};
```

## File Deletion

Find the corresponding item through uid and delete it

```ts
const onRemove = (file: UploadFile) => {
  const removedFileList = internalFileList.filter(item => item.uid !== file.uid);

  setInternalFileList(removedFileList);
};
```

## Upload Progress

Knowledge points involved:
`XMLHttpRequest.upload.progress` is used, `axios` wraps it into `options.onUploadProgress`, we just need to modify
